sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/FileSizeFormat",
    "sap/m/MessageBox"
], (Controller, MessageToast, JSONModel, FileSizeFormat, MessageBox) => {
    "use strict";

    return Controller.extend("mfglogoupld.controller.Main", {
        onInit: function () {
            this.oUploadSet = this.byId("fileUploader");
            this._oModel = this.getOwnerComponent().getModel();
            this.getView().setModel(new JSONModel({
                fileData: null,
                csrfToken: null,
                manufacturerNumber: "",
                mfgName: "",
                existingManufacturers: [],  // Existing Manufacturer Numbers
                existingMfgNames: []       // Existing Manufacturer Names 
            }), "ui");
            this._binding = null;
            this.getView().getModel("ui").setProperty("/isEditMode", true);
            this._fetchExistingManufacturers();

        },

        onBeforeRendering: function () {
            this._fetchCSRFToken();
        },

        _fetchExistingManufacturers: function () {
            var sAppPath = sap.ui.require.toUrl("mfglogoupld").split("/resources")[0];
            if (sAppPath === "." || sAppPath === "..") {
                sAppPath = "";
            }
            return fetch(sAppPath + "/odata/v4/media/MediaFile")
            // return fetch("/odata/v4/media/MediaFile")
                .then(response => response.json())
                .then(data => {
                    var existingManufacturers = data.value.map(item => item.manufacturerNumber);
                    var existingMfgNames = data.value.map(item => item.MFGName);
                    this.getView().getModel("ui").setProperty("/existingManufacturers", existingManufacturers);
                    this.getView().getModel("ui").setProperty("/existingMfgNames", existingMfgNames);
                })
                .catch(error => console.error("Error fetching manufacturers:", error));
        },


        onChange: function (oEvent) {
            var oFile = oEvent.getParameter("files")?.[0];
            var oUiModel = this.getView().getModel("ui");

            if (oFile) {
                oUiModel.setProperty("/fileData", {
                    file: oFile,
                    fileName: oFile.name,
                    fileSize: FileSizeFormat.getInstance({
                        binaryFilesize: false,
                        maxFractionDigits: 1,
                        maxIntegerDigits: 3
                    }).format(oFile.size),
                    fileType: oFile.type
                });
            } else {
                oUiModel.setProperty("/fileData", null);
            }
        },
        // Open the dialog
        onOpenDialog: function () {
            const oUiModel = this.getView().getModel("ui");
            oUiModel.setProperty("/isEditMode", false);
            this.getView().byId("addManufacturerDialog").open();
        },
        onEditPress: function () {
            const oTable = this.byId("idMediaFilesTable");
            const aSelectedItems = oTable.getSelectedItems();

            if (aSelectedItems.length !== 1) {
                MessageBox.warning("Please select exactly one file to edit.");
                return;
            }

            const oContext = aSelectedItems[0].getBindingContext();
            const oData = oContext.getObject();
            const oUiModel = this.getView().getModel("ui");
            oUiModel.setProperty("/isEditMode", true);

            // Populate UI model with selected data
            oUiModel.setProperty("/manufacturerNumber", oData.manufacturerNumber);
            oUiModel.setProperty("/mfgName", oData.MFGName);
            oUiModel.setProperty("/fileData", {
                fileName: oData.fileName,
                fileType: oData.mediaType,
                fileUrl: oData.url
            });

            // Store the binding context for reuse (for PATCH later)
            this._editBindingContext = oContext;

            // Open the dialog in edit mode
            this.getView().byId("addManufacturerDialog").open();
        },
        // Close the dialog
        onCloseDialog: function () {
            this.getView().byId("addManufacturerDialog").close();
        },
        onUploadPress: async function () {
            const isEditMode = !!this._editBindingContext;
            const oUiModel = this.getView().getModel("ui");
            const oFile = oUiModel.getProperty("/fileData/file");
            const sManufacturerNumber = oUiModel.getProperty("/manufacturerNumber");
            const sMFGName = oUiModel.getProperty("/mfgName");
            const sToken = oUiModel.getProperty("/csrfToken");

            // Normalize values
            const existingManufacturers = oUiModel.getProperty("/existingManufacturers").map(num => num.toLowerCase());
            const existingMfgNames = oUiModel.getProperty("/existingMfgNames").map(name => name.toLowerCase());
            const currentManufacturerNumber = isEditMode ? this._editBindingContext.getProperty("manufacturerNumber").toLowerCase() : null;
            const currentMFGName = isEditMode ? this._editBindingContext.getProperty("MFGName").toLowerCase() : null;

            // Check for duplicate number
            if (
                existingManufacturers.includes(sManufacturerNumber.toLowerCase()) &&
                (!isEditMode || sManufacturerNumber.toLowerCase() !== currentManufacturerNumber)
            ) {
                MessageBox.error("This Manufacturer Number already exists.");
                return;
            }

            // Check for duplicate name
            if (
                existingMfgNames.includes(sMFGName.toLowerCase()) &&
                (!isEditMode || sMFGName.toLowerCase() !== currentMFGName)
            ) {
                MessageBox.error("This Manufacturer Name already exists.");
                return;
            }

            // Validate inputs (oFile is optional in edit mode)
            if (!this._validateUploadInputs(sManufacturerNumber, sMFGName, oFile, isEditMode)) return;

            try {
                // Prepare context
                if (!this._binding) {
                    if (isEditMode) {
                        /* Begin of correction */
                        await this._editDraft(this._editBindingContext.getPath(), sToken);
                        // await this._readMediaDraft(this._editBindingContext.getPath(), sToken);
                        var oEditFile_fileName = null, oEditFile_fileType = null;
                        if (oFile) {
                            oEditFile_fileName = oFile.name;
                            oEditFile_fileType = oFile.type;
                        } else {
                            oEditFile_fileName = oUiModel.getProperty("/fileData").fileName;
                            oEditFile_fileType = oUiModel.getProperty("/fileData").fileType;
                        }
                        let editsPath = this._editBindingContext.getPath().replace("IsActiveEntity=true", "IsActiveEntity=false");
                        const editresponse = await this._updateDraft(editsPath, sManufacturerNumber, sMFGName, oEditFile_fileName, oEditFile_fileType, sToken);
                        if (editresponse?.context) {
                            this._binding = this.getView().getModel().bindContext(editsPath, null, {
                                $$updateGroupId: "UploadGroup"
                            });
                        }
                        /* End of correction */
                        // Read Media Draft
                        // await this._readMediaDraft(this._editBindingContext.getPath(), sToken);
                        // }
                    } else {
                        const response = await this._createDraft(sManufacturerNumber, sMFGName, oFile.name, oFile.type, sToken);
                        if (response?.context) {
                            this._binding = this.getView().getModel().bindContext(response.context.getPath(), null, {
                                $$updateGroupId: "UploadGroup"
                            });
                        }
                    }
                }

                // If a file is selected, upload it
                if (oFile) {
                    await this._updateDraftWithContent(this._binding.getPath(), oFile, oFile.type, oFile.name, sToken);
                }

                await this._activateDraft(this._binding.getPath(), sToken);
                if (isEditMode) {
                    MessageBox.success("Logo details updated successfully.");
                } else {
                    MessageBox.success("Logo details uploaded successfully.");
                }
                this._editBindingContext = null;
                this._resetForm();
                this.onCloseDialog();
            } catch (error) {
                MessageBox.error("Error during upload process: " + error.message);
            }
        },

        _fetchCSRFToken: function () {
            var sAppPath = sap.ui.require.toUrl("mfglogoupld").split("/resources")[0];
            if (sAppPath === "." || sAppPath === "..") {
                sAppPath = "";
            }
            return fetch(sAppPath + "/odata/v4/media/", {
            // return fetch("/odata/v4/media/", {
                method: "GET",
                headers: { "X-CSRF-Token": "Fetch" },
                credentials: "include"
            })
                .then(response => {
                    if (!response.ok) throw new Error('Failed to fetch CSRF token');
                    this.getView().getModel("ui").setProperty("/csrfToken", response.headers.get("x-csrf-token"));
                })
                .catch(error => console.error("Error fetching CSRF token: ", error));
        },

        _validateUploadInputs: function (sManufacturerNumber, sMFGName, oFile, isEditMode) {
            if (!sManufacturerNumber) return MessageBox.error("Please enter a Manufacturer Number."), false;
            if (!sMFGName) return MessageBox.error("Please enter an MFG Name."), false;
            if (!oFile && !isEditMode) return MessageBox.error("Please choose a file to upload."), false;
            return true;
        },

        _resetForm: function () {
            var oUiModel = this.getView().getModel("ui");
            this.byId("fileUploader").clear();
            oUiModel.setProperty("/fileData", null);
            oUiModel.setProperty("/manufacturerNumber", "");
            oUiModel.setProperty("/mfgName", "");
            this.getView().getModel().refresh();
            this._binding = null;
            this.byId("idMediaFilesTable").removeSelections(true);
        },

        _createDraft: function (manufacturerNumber, mfgName, fileName, fileType, csrfToken) {
            var sAppPath = sap.ui.require.toUrl("mfglogoupld").split("/resources")[0];
            if (sAppPath === "." || sAppPath === "..") {
                sAppPath = "";
            }
            return fetch(sAppPath + "/odata/v4/media/MediaFile", {
            // return fetch("/odata/v4/media/MediaFile", {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken },
                credentials: "include",
                body: JSON.stringify({ manufacturerNumber, MFGName: mfgName, fileName, mediaType: fileType })
            })
                /* Begin of Correction*/
                // .then(response => response.json())
                // .then(data => ({ context: { getPath: () => `/MediaFile(ID=${data.ID},IsActiveEntity=false)` } }))
                // .catch(error => { throw new Error("Failed to create draft: " + error.message); });

                .then(async (res) => {
                    // 1) Fail fast on HTTP errors
                    if (!res.ok) {
                        const text = await res.text().catch(() => "");
                        throw new Error(`Create draft failed (${res.status}) ${text}`);
                    }

                    // 2) Try to parse JSON if present
                    const ct = res.headers.get("content-type") || "";
                    if (ct.includes("application/json")) {
                        return { res, data: await res.json() };
                    }

                    // 3) No JSON body—try Location header (OData often sets this)
                    const location = res.headers.get("Location");
                    return { res, data: null, location };
                })
                .then(({ res, data, location }) => {
                    if (data && typeof data.ID !== "undefined") {
                        return { context: { getPath: () => `/MediaFile(ID=${data.ID},IsActiveEntity=false)` } };
                    }

                    if (location) {
                        // If Location looks like .../MediaFile(ID=...,IsActiveEntity=false)
                        // you can parse the ID from it; otherwise, do a follow-up GET.
                        const m = location.match(/MediaFile\(ID=([^,)]+),IsActiveEntity=false\)/);
                        if (m) {
                            const id = m[1];
                            return { context: { getPath: () => `/MediaFile(ID=${id},IsActiveEntity=false)` } };
                        }
                    }

                    throw new Error("Draft created but response contained no JSON body and no usable Location header.");
                })
                .catch((error) => {
                    throw new Error("Failed to create draft: " + error.message);
                });

            /* End of Correction*/
        },
        /* Begin of correction */
        _updateDraft: function (sPath, manufacturerNumber, mfgName, fileName, fileType, csrfToken) {
            var sAppPath = sap.ui.require.toUrl("mfglogoupld").split("/resources")[0];
            if (sAppPath === "." || sAppPath === "..") {
                sAppPath = "";
            }
            return fetch(sAppPath + "/odata/v4/media" + sPath, {
            // return fetch("/odata/v4/media" + sPath, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken },
                // headers: { "Content-Type": "application/octet-stream", "X-CSRF-Token": csrfToken },
                credentials: "include",
                body: JSON.stringify({ manufacturerNumber, MFGName: mfgName, fileName, mediaType: fileType })
            })

                .then(async (res) => {
                    // 1) Fail fast on HTTP errors
                    if (!res.ok) {
                        const text = await res.text().catch(() => "");
                        throw new Error(`Create draft failed (${res.status}) ${text}`);
                    } else {
                        return res;
                    }
                })
                .then(({ res, data, location }) => {
                    // return res;
                    return { context: { getPath: () => sPath } };

                })
                .catch((error) => {
                    throw new Error("Failed to create draft: " + error.message);
                });

        },
        /* End of correction*/
        _updateDraftWithContent: async function (sPath, oFile, sFileType, sFileName, sToken) {
            try {
                const response = await fetch(this._oModel.sServiceUrl + sPath + "/content", {
                    method: "PUT",
                    headers: {
                        "X-CSRF-Token": sToken,
                        "Content-Type": sFileType,
                        "slug": sFileName
                    },
                    credentials: "include",
                    body: oFile
                });

                console.log("Server Response Status:", response.status);

                if (!response.ok) {
                    throw new Error(`Failed to upload file. Server responded with status: ${response.status}`);
                }

                let fileUrl = null;
                let cuid = null; // Capture the CUID (ID) for constructing the final URL

                if (response.status === 204) {
                    console.warn("Server returned 204 No Content. Constructing file URL manually...");
                } else {
                    const responseText = await response.text();
                    console.log("Raw server response:", responseText);

                    if (responseText) {
                        try {
                            const oResponseData = JSON.parse(responseText);
                            cuid = oResponseData?.ID; // Capture the ID
                        } catch (error) {
                            console.warn("Response is not valid JSON.");
                        }
                    }
                }


                let updatedPath = sPath.replace("IsActiveEntity=false", "IsActiveEntity=true");
                // Construct the correct file URL
                fileUrl = this._oModel.sServiceUrl + updatedPath + "/content";
                console.log("Final file URL:", fileUrl);

                // **Step 1: Store in UI Model**
                this.getView().getModel("ui").setProperty("/fileData/fileUrl", fileUrl);

                // **Step 2: Update Backend with the Correct File URL**
                const patchResponse = await fetch(this._oModel.sServiceUrl + sPath, {
                    method: "PATCH",
                    headers: {
                        "X-CSRF-Token": sToken,
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({ url: fileUrl })
                });

                if (!patchResponse.ok) {
                    throw new Error(`Failed to update file URL in backend. Status: ${patchResponse.status}`);
                }

                console.log("✅ File URL successfully updated in backend.");

            } catch (error) {
                console.error("Upload error:", error.message);
                MessageBox.error("Upload error: " + error.message);
            }
        },
        // _updateDraftWithContent: function (sPath, file, mediaType, fileName, csrfToken) {
        //     return fetch(`/odata/v4/media${sPath}/content`, {
        //         method: "PUT",
        //         headers: { "Content-Type": mediaType, "slug": fileName, "X-CSRF-Token": csrfToken },
        //         body: file
        //     })
        //     .then(response => { if (!response.ok) throw new Error("Failed to update draft with content"); })
        //     .catch(error => { throw new Error("Error updating draft with content: " + error.message); });
        // },

        _activateDraft: function (sPath, csrfToken) {
            debugger
            var sAppPath = sap.ui.require.toUrl("mfglogoupld").split("/resources")[0];
            if (sAppPath === "." || sAppPath === "..") {
                sAppPath = "";
            }
            return fetch(`${sAppPath}/odata/v4/media${sPath}/Media.draftActivate`, {
            // return fetch(`/odata/v4/media${sPath}/Media.draftActivate`, {
                method: "POST",
                headers: {
                    "X-CSRF-Token": csrfToken,
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
                .then(response => { if (!response.ok) throw new Error("Failed to activate draft"); })
                .catch(error => { throw new Error("Error activating draft: " + error.message); });
        },

        // Edit Draft
        _editDraft: function (sPath, csrfToken) {
            debugger
            var sAppPath = sap.ui.require.toUrl("mfglogoupld").split("/resources")[0];
            if (sAppPath === "." || sAppPath === "..") {
                sAppPath = "";
            }            
            return fetch(`${sAppPath}/odata/v4/media${sPath}/Media.draftEdit`, {
            // return fetch(`/odata/v4/media${sPath}/Media.draftEdit`, {
                method: "POST",
                headers: {
                    "X-CSRF-Token": csrfToken,
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
                .then(async (response) => { if (!response.ok) throw new Error("Failed to Edit draft"); })
                .catch(error => { throw new Error("Error Editing draft: " + error.message); });
        },
        _readMediaDraft: function (sPath, csrfToken) {
            debugger
            var sAppPath = sap.ui.require.toUrl("mfglogoupld").split("/resources")[0];
            if (sAppPath === "." || sAppPath === "..") {
                sAppPath = "";
            }
            // Read entity with Active/Draft flags
               return fetch(`${sAppPath}/odata/v4/media${sPath}?$select=IsActiveEntity,HasActiveEntity,HasDraftEntity`, {
            // return fetch(`/odata/v4/media${sPath}?$select=IsActiveEntity,HasActiveEntity,HasDraftEntity`, {
                method: "GET",
                headers: {
                    "X-CSRF-Token": csrfToken,
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
                .then(async (response) => {
                    if (!response.ok) throw new Error("Failed to read Media Entity");
                    const data = await response.json();
                })
                .catch(error => { throw new Error("Error Reading Media Entity: " + error.message); });
        },
        /* End of Correction */
        onTypeMissmatch: function () {
            MessageBox.error("Invalid file type. Allowed types are: pdf, jpg, png, jpeg, svg");
        },

        onManufacturerNumberLiveChange: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oInput = oEvent.getSource();
            var oUiModel = this.getView().getModel("ui");
            var existingManufacturers = oUiModel.getProperty("/existingManufacturers");

            if (/[a-zA-Z]/.test(sValue)) {
                oInput.setValueState("Error");
                oInput.setValueStateText("Manufacturer Number should not contain letters.");
            } else {
                oInput.setValueState("None");
            }

            // Check if manufacturer number already exists
            if (existingManufacturers.includes(sValue)) {
                oInput.setValueState("Error");
                oInput.setValueStateText("This Manufacturer Number already exists.");
            } else {
                oInput.setValueState("None");
            }
        },
        onManufacturerNameLiveChange: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oInput = oEvent.getSource();
            var oUiModel = this.getView().getModel("ui");
            var existingMfgNames = oUiModel.getProperty("/existingMfgNames").map(name => name.toLowerCase()); // Convert all existing names to lowercase

            // Check if manufacturer name already exists
            if (existingMfgNames.includes(sValue)) {
                oInput.setValueState("Error");
                oInput.setValueStateText("This Manufacturer Name already exists.");
            } else {
                oInput.setValueState("None");
            }
        },
        onDeleteDraft: function () {
            var oTable = this.byId("idMediaFilesTable");
            var aSelectedItems = oTable.getSelectedItems();

            if (!aSelectedItems.length) {
                MessageBox.warning("Please select at least one draft to delete.");
                return;
            }

            MessageBox.warning("Make sure ONLY entries you want to delete are selected. Once deleted, this action cannot be undone.", {
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.OK,
                onClose: (oAction) => {
                    if (oAction === MessageBox.Action.OK) {
                        this._deleteDrafts(aSelectedItems);
                    }
                }
            });
        },

        _deleteDrafts: function (aSelectedItems) {
            var oModel = this.getView().getModel();
            var aDeletePromises = [];

            aSelectedItems.forEach(oItem => {
                var oContext = oItem.getBindingContext();
                aDeletePromises.push(oContext.delete());
            });

            Promise.all(aDeletePromises)
                .then(() => {
                    MessageToast.show("Selected items deleted successfully.");
                    oModel.refresh();
                })
                .catch((oError) => {
                    MessageBox.error("Error deleting items: " + oError.message);
                });
        }
    });
});