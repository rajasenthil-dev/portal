/* ********* Modification Log ************************************************************
Version CHG#:       INCIDENT#:     DATE:       DEVELOPER:
1.0     CHG0248940  INC3709873     Feb-18-26  Raja Senthil N
DESCRIPTION: OKTA Group Creation Fix 
*******************************************************************************************/
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/f/library",
    "sap/ui/core/Core" // Required for BusyIndicator
], function (Controller, MessageToast, MessageBox, fioriLibrary, Core) {
    "use strict";
    return Controller.extend("accessmanager1.controller.Detail", {
        onInit: function () {
            var oOwnerComponent = this.getOwnerComponent();

            this.oRouter = oOwnerComponent.getRouter();
            this.oModel = oOwnerComponent.getModel();
            // ✅ Create an edit model with a default non-editable state
            const oViewModel = new sap.ui.model.json.JSONModel({
                isEdit: false,
                showFooter: false
            });
            this.getView().setModel(oViewModel, "viewState");

            const oGroupModel = new sap.ui.model.json.JSONModel({
                groupList: []
            });
            this.getView().setModel(oGroupModel, "editGroups");

            this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);
            this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
        },
        _loadOktaGroups: function () {
            const oView = this.getView();
            const oGroupModel = oView.getModel("editGroups");
            const oOktaModel = this.getOwnerComponent().getModel("oktaService");

            if (!oGroupModel || !oOktaModel) {
                MessageBox.error("Missing models to load Okta groups.");
                return;
            }

            const oAction = oOktaModel.bindContext("/getOktaGroups(...)");
            oAction.setParameter("query", "MFG");

            oAction.execute().then(() => {
                const oRaw = oAction.getBoundContext().getObject();
                const aGroups = oRaw?.value || [];

                // Save group list to model
                oGroupModel.setProperty("/groupList", aGroups);

                console.log("✅ Groups loaded:", aGroups.length);

                // Optional: set default if no group selected
                const oCtx = oView.getBindingContext("edit");
                if (oCtx && !oCtx.getProperty("groupIds") && aGroups.length > 0) {
                    const sFirstGroupId = aGroups[0].id;
                    const sFirstGroupName = aGroups[0].profile?.name || aGroups[0].name;

                    oCtx.setProperty("groupIds", sFirstGroupId);
                    oCtx.setProperty("groupNames", sFirstGroupName);
                }
            }).catch((err) => {
                console.error("❌ Failed to load groups:", err);
                MessageBox.error("Could not load Okta groups.");
            });
        },
        onGroupChange: function (oEvent) {
            const sNewGroupId = oEvent.getParameter("selectedItem").getKey();
            const sNewGroupName = oEvent.getParameter("selectedItem").getText();

            const oCtx = this.getView().getBindingContext("edit");
            if (oCtx) {
                oCtx.setProperty("groupIds", sNewGroupId);
                oCtx.setProperty("groupNames", sNewGroupName);
            }

            console.log("Updated user with new group:", sNewGroupId, sNewGroupName);
        },
        _onProductMatched: function (oEvent) {
            this._product= oEvent.getParameter("arguments").product || this._product || "0";
            var sObjectPath = "/" + this._product;
            this.getView().bindElement({
                path: sObjectPath,
                model: "edit"
            });

        },

        onEditToggleButtonPress: function() {
            var oObjectPage = this.getView().byId("ObjectPageLayout"),
                bCurrentShowFooterState = oObjectPage.getShowFooter();

            oObjectPage.setShowFooter(!bCurrentShowFooterState);
            const oViewModel = this.getView().getModel("viewState");
            const bEditable = !oViewModel.getProperty("/isEdit");
            oViewModel.setProperty("/isEdit", bEditable);
            if (bEditable) {
                this._loadOktaGroups();
            }
            sap.m.MessageToast.show(bEditable ? "Edit mode enabled" : "Edit mode disabled");
        },

        onCancel: function () {
            const oView = this.getView();
            const oObjectPage = oView.byId("ObjectPageLayout");
            const oViewModel = oView.getModel("viewState");

            // ✅ Always disable edit mode
            oViewModel.setProperty("/isEdit", false);

            // ✅ Always hide the footer
            oObjectPage.setShowFooter(false);

            // ✅ Optional: show a toast
            sap.m.MessageToast.show("Edit cancelled");

            this.oRouter.navTo("master", {
                layout: fioriLibrary.LayoutType.OneColumn
            });
        },
        onSave: function () {
            const oView = this.getView();
            const oODataModel = this.getOwnerComponent().getModel();

            const oCtx = oView.getBindingContext("edit");
            if (!oCtx) {
                return sap.m.MessageBox.error("Cannot save: No binding context.");
            }

            const oData = oCtx.getObject();
            const sPath = "/OKTAUsers('" + oData.id + "')";

            oView.setBusy(true);

            oODataModel.update(sPath, oData, {
                success: () => {
                    oView.setBusy(false);
                    sap.m.MessageToast.show("✅ User updated successfully");

                    // 🧩 1️⃣ Exit edit mode
                    this._exitEditMode?.();

                    // 🧩 2️⃣ Refresh master list once update succeeds
                    const oList = this._getMasterList?.(); // helper to access master list
                    if (oList) {
                        oList.getBinding("items").refresh(); // ensures list data updates
                    }

                    // 🧩 3️⃣ Animate collapse back to master view
                    this.oRouter.navTo("master", {
                        layout: fioriLibrary.LayoutType.OneColumn
                    });
                },
                error: (oError) => {
                    oView.setBusy(false);
                    console.error("❌ Save Error", oError);
                    sap.m.MessageBox.error("Update failed — check input or permissions.");
                },
                merge: true
            });
        },
        onActivateUser: async function () {
            const oView = this.getView();
            const oModel = this.getOwnerComponent().getModel(); // default model
            const oCtx = oView.getBindingContext("edit");

            if (!oCtx) {
                return MessageBox.warning("Please select a user first.");
            }

            const userId = oCtx.getProperty("id");
            const sPath = oCtx.getPath();

            try {
                await this._callOktaAction("activateUser", { userId });

                // ✅ Re-fetch latest user data to update UI
                oModel.read(sPath, {
                    success: (oData) => {
                        oModel.setProperty(sPath, oData); // optional: force update 
                        MessageToast.show(`✅ User ${userId} activated`);
                    },
                    error: () => {
                        MessageToast.show("Activated but failed to refresh user data");
                    }
                });
            } catch (err) {
                console.error("Activation failed:", err);
                MessageBox.error(`❌ Failed to activate user ${userId}`);
            }
        },

        onDeactivateUser: async function () {
            const oView = this.getView();
            const oModel = this.getOwnerComponent().getModel();
            const oCtx = oView.getBindingContext("edit");

            if (!oCtx) {
                return MessageBox.warning("Please select a user first.");
            }

            const userId = oCtx.getProperty("id");
            const sPath = oCtx.getPath();

            try {
                await this._callOktaAction("deactivateUser", { userId });

                oModel.read(sPath, {
                    success: (oData) => {
                        oModel.setProperty(sPath, oData);
                        MessageToast.show(`✅ User ${userId} deactivated`);
                    },
                    error: () => {
                        MessageToast.show("Deactivated but failed to refresh user data");
                    }
                });
            } catch (err) {
                console.error("Deactivation failed:", err);
                MessageBox.error(`❌ Failed to deactivate user ${userId}`);
            }
        },
        onSendActivationEmail: async function () {
            const oView = this.getView();
            const oCtx = oView.getBindingContext("edit");

            if (!oCtx) {
                return MessageBox.warning("Please select a user first.");
            }

            const userId = oCtx.getProperty("id");
            /* Begin of INC3709873 - Fix to handle error log*/
            const oODataModel = this.getOwnerComponent().getModel();
            var name = oCtx.getProperty('lastName') +' '+ oCtx.getProperty('firstName');
            /* End of INC3709873 - handle error log*/
            try {
                await this._callOktaAction("sendActivationEmail", { userId });
                // MessageToast.show(`✅ Activation email sent to ${userId}`); INC3709873 - Fix
                MessageToast.show(`✅ Activation email sent to ${name}`); //INC3709873 - Fix

                // 🔄 Refresh the binding context to update status
                await new Promise((resolve, reject) => {
                    /* Begin of INC3709873 - Fix to handle error log                   
                    oCtx.getModel().read(oCtx.getPath(), { */
                    oODataModel.read("/OKTAUsers", {
                        /* End of INC3709873 - handle error log*/
                        success: (oData) => {
                            // oCtx.getModel().setProperty(oCtx.getPath(), oData); INC3709873 - Fix                             
                            resolve();
                        },
                        error: reject
                    });
                });
            } catch (err) {
                console.error("❌ Email activation failed:", err);
                MessageBox.error(`Failed to send activation email for ${userId}`);
            }
        },
        onDeleteUser: async function () {
            const oView = this.getView();
            const oCtx = oView.getBindingContext("edit");

            if (!oCtx) {
                return MessageBox.warning("Please select a user first.");
            }

            const userId = oCtx.getProperty("id");

            const confirm = await new Promise((resolve) => {
                MessageBox.confirm(`Are you sure you want to delete user ${userId}?`, {
                    title: "Confirm Deletion",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.NO,
                    onClose: resolve
                });
            });

            if (confirm !== MessageBox.Action.YES) return;

            try {
                await this._callOktaAction("deleteUser", { userId });
                MessageToast.show(`🗑️ User ${userId} deleted`);

                // Refresh list or navigate back depending on your UI
                this.getOwnerComponent().getModel().refresh(true);
            } catch (err) {
                console.error("❌ Deletion failed:", err);
                MessageBox.error(`Failed to delete user: ${err.message || err}`);
            }
        },
        _callOktaAction: async function (actionName, payload) {
            const oModel = this.getView().getModel();

            return new Promise((resolve, reject) => {
                oModel.callFunction(`/${actionName}`, {
                    method: "POST",
                    urlParameters: payload,
                    success: resolve,
                    error: reject
                });
                oModel.refresh(true);
            });

        },

        onExit: function () {
            if (sap && sap.navigation && sap.navigation.toExternal) {
                sap.navigation.toExternal({
                    target: {
                        shellHash: "#Shell-home" // or "Shell-home"
                    }
                });
            } else {
                window.top.location.href = "https://discovery-sunrise.launchpad.cfapps.us20.hana.ondemand.com/site?siteId=0cf6c23e-def9-4ed5-a7fb-0b378ac9e3ed#Shell-home";
            }

        }
    });
});