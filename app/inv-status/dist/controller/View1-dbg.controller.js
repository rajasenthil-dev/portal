sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel",
], (Controller, MessageBox, Filter) => {
    "use strict";

    return Controller.extend("invstatus.controller.View1", {
        
        onInit() {
            this._attachRouterPatternMatched();
            this._initSmartFilterBar();
            this._initModelErrorHandling();
            this._attachTableEvents();
        },

        _attachRouterPatternMatched() {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteView1").attachPatternMatched(this._onPatternMatched, this);
        },

        _initSmartFilterBar() {
            const oView = this.getView();
            const oSmartFilterBar = oView.byId("bar0");

            oView.setBusy(true);

            oSmartFilterBar.attachInitialized(() => {
                oView.setBusy(false);
            });
        },

        _initModelErrorHandling() {
            const oModel = this.getOwnerComponent().getModel();
            const oTable = this.getView().byId("table0").getTable();
            this.bAuthorizationErrorShown = false;

            oModel.attachRequestFailed((oEvent) => {
                const { statusCode } = oEvent.getParameters().response;

                if (statusCode === "403") {
                    oTable.setNoData("No data available due to authorization restrictions");
                    oTable.setBusy(false);

                    if (!this.bAuthorizationErrorShown) {
                        this.bAuthorizationErrorShown = true;
                        MessageBox.error("You do not have the required permissions to access this report.", {
                            title: "Unauthorized Access",
                            id: "messageBoxId1",
                            details: "Permission is required to access this report. Please contact your administrator if you believe this is an error or require access.",
                            contentWidth: "100px"
                        });
                    }
                }
            });
        },

        _attachTableEvents() {
            const oTable = this.getView().byId("table0").getTable();
            oTable.attachEvent("rowsUpdated", this.calculateTotals.bind(this));
        },

        async _refreshUserModel() {
            const oUserModel = this.getOwnerComponent().getModel("userModel");
            let sAppPath = sap.ui.require.toUrl("invstatus").split("/resources")[0];
            sAppPath = (sAppPath === ".") ? "" : sAppPath;

            const url = `${sAppPath}/user-api/attributes`;

            try {
                const oResponse = await fetch(url);
                const oUserData = await oResponse.json();

                oUserModel.setData(oUserData);
                console.log("✅ User model refreshed:", oUserData);
            } catch (err) {
                console.error("❌ Failed to fetch user info", err);
            }
        },

        _fetchAndSetLogo() {
            const oView = this.getView();
            const oUserModel = this.getOwnerComponent().getModel("userModel");
            const userData = oUserModel?.getData() || {};
            const mfgNumber = userData.ManufacturerNumber;
            const oLogoImage = oView.byId("logoImage");

            let sAppPath = sap.ui.require.toUrl("invstatus").split("/resources")[0];
            sAppPath = (sAppPath === ".") ? "" : sAppPath;

            const sFallbackImage = `${sAppPath}/images/MCKCAN1.jpg`;

            if (!mfgNumber) {
                console.warn("No ManufacturerNumber in user model. Showing fallback logo.");
                oLogoImage.setSrc(sFallbackImage);
                return;
            }

            const oLogoModel = this.getOwnerComponent().getModel("logo");
            const oFilter = new Filter("manufacturerNumber", "EQ", mfgNumber);
            const oListBinding = oLogoModel.bindList("/MediaFile", undefined, undefined, [oFilter]);

            oListBinding.requestContexts()
                .then((aContexts) => {
                    if (aContexts?.length > 0) {
                        const oData = aContexts[0].getObject();
                        const sCleanUrl = oData.url.replace(/^.*(?=\/odata\/v4\/media)/, "");
                        const sSrcUrl = `${sAppPath}${sCleanUrl}`;
                        oLogoImage.setSrc(sSrcUrl);
                    } else {
                        console.warn("No matching logo found. Fallback image used.");
                        oLogoImage.setSrc(sFallbackImage);
                    }
                })
                .catch((err) => {
                    console.error("Binding error:", err);
                    oLogoImage.setSrc(sFallbackImage);
                });
        },

        async _onPatternMatched() {
            await this._refreshUserModel();
            console.log("RouteView1 pattern matched – fetching logo...");
            this._fetchAndSetLogo();
        },

        calculateTotals: function() {
            const oTable = this.getView().byId("table0").getTable();
            const oBinding = oTable.getBinding("rows");
            const aContexts = oBinding.getContexts(0, oBinding.getLength());
            aContexts.forEach(ctx => {
                console.log("Marketing:", ctx.getProperty("MARKETING_SAMPLE_QTY"));
                console.log("Lab:", ctx.getProperty("LAB_SAMPLE_QTY"));
            });
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
        
            const STATUS_COLORS = {
                OPEN_STOCK: "#4CAF50",
                QUARANTINE: "#FF5722",
                RETAINS: "#9E9E9E",
                QUALITY_HOLD: "#FF5722",
                RETURNS_CAL: "#9E9E9E",
                RECALLS: "#F44336",
                INVENTORY_HOLD: "#FF5722",
                RELABEL_QTY: "#9E9E9E",
                DAMAGE_DESTRUCTION: "#F44336",
                MARKETING_SAMPLE_QTY: "#FF9800",
                LAB_SAMPLE_QTY: "#2196F3",
                IN_PROCESS: "#4CAF50",
                TOTAL_QTY: "#4CAF50"
            };

            const fields = [
                { prop: "OPEN_STOCK", icon: "sap-icon://inventory", color: STATUS_COLORS.OPEN_STOCK },
                { prop: "QUARANTINE", icon: "sap-icon://alert", color: STATUS_COLORS.QUARANTINE },
                { prop: "RETAINS", icon: "sap-icon://save", color: STATUS_COLORS.RETAINS },
                { prop: "QUALITY_HOLD", icon: "sap-icon://synchronize", color: STATUS_COLORS.QUALITY_HOLD },
                { prop: "RETURNS_CAL", icon: "sap-icon://undo", color: STATUS_COLORS.RETURNS_CAL },
                { prop: "RECALLS", icon: "sap-icon://reset", color: STATUS_COLORS.RECALLS },
                { prop: "INVENTORY_HOLD", icon: "sap-icon://shelf", color: STATUS_COLORS.INVENTORY_HOLD },
                { prop: "RELABEL_QTY", icon: "sap-icon://tag", color: STATUS_COLORS.RELABEL_QTY },
                { prop: "DAMAGE_DESTRUCTION", icon: "sap-icon://delete", color: STATUS_COLORS.DAMAGE_DESTRUCTION },
                { prop: "MARKETING_SAMPLE_QTY", icon: "sap-icon://pharmacy", color: STATUS_COLORS.MARKETING_SAMPLE_QTY },
                { prop: "LAB_SAMPLE_QTY", icon: "sap-icon://lab", color: STATUS_COLORS.LAB_SAMPLE_QTY },
                { prop: "IN_PROCESS", icon: "sap-icon://process", color: STATUS_COLORS.IN_PROCESS },
                { prop: "TOTAL_QTY", icon: "sap-icon://sum", color: STATUS_COLORS.TOTAL_QTY }
            ];
        
            const totalsData = fields.map(field => {
                const sum = aContexts.reduce((acc, ctx) => {
                    return acc + (parseFloat(ctx.getProperty(field.prop)) || 0);
                }, 0);
        
                return {
                    key: field.prop,
                    label: oResourceBundle.getText(field.prop), // expects you to have i18n keys like OPEN_STOCK=Open Stock
                    value: this._formatNumber(sum),
                    icon: field.icon,
                    color: field.color
                };
            });
        
            const oTotalsModel = new sap.ui.model.json.JSONModel(totalsData);
            this.getView().setModel(oTotalsModel, "totals");
        },
        _formatNumber(value) {
            return new Intl.NumberFormat("en-US", {
                maximumFractionDigits: 0
            }).format(value);
        }

    });
});
