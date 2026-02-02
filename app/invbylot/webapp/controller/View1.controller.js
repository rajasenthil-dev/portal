sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], (Controller, JSONModel, MessageBox) => {
    "use strict";

    return Controller.extend("invbylot.controller.View1", {
        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteView1").attachPatternMatched(this._onPatternMatched, this);
            var oModel = this.getOwnerComponent().getModel();
            const oView = this.getView();
            const oSmartFilterBar = oView.byId("bar0");
            var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            const oSmartTable = this.getView().byId("table0");
            var oToolbar = oSmartTable.getToolbar();
            var oExpiryStatusGreen = new sap.m.ObjectStatus({
                
                icon: "sap-icon://circle-task-2",
                state: "Success",
                tooltip: oBundle.getText("INVENTORYBYLOT.EXPIRYSTATUSGREENTOOLTIP")
            })
            var oExpiryStatusGreenText = new sap.m.Text({
                text: oBundle.getText("INVENTORYBYLOT.EXPIRYSTATUSGREENTEXT"),
                
            })
            oExpiryStatusGreenText.addStyleClass("text-bold sapUiTinyMarginEnd")

            var oExpiryStatusYellow = new sap.m.ObjectStatus({
                icon: "sap-icon://circle-task-2",
                state: "Warning",
                tooltip: oBundle.getText("INVENTORYBYLOT.EXPIRYSTATUSYELLOWTOOLTIP")
            })
            var oExpiryStatusYellowText = new sap.m.Text({
                text: oBundle.getText("INVENTORYBYLOT.EXPIRYSTATUSYELLOWTEXT"),
                
            })
            oExpiryStatusYellowText.addStyleClass("text-bold sapUiTinyMarginEnd")
            var oExpiryStatusRed = new sap.m.ObjectStatus({
                icon: "sap-icon://circle-task-2",
                state: "Error",
                tooltip: oBundle.getText("INVENTORYBYLOT.EXPIRYSTATUSREDTOOLTIP")
            })
            var oExpiryStatusRedText = new sap.m.Text({
                text: oBundle.getText("INVENTORYBYLOT.EXPIRYSTATUSREDTEXT"),
                
            })
            oExpiryStatusRedText.addStyleClass("text-bold sapUiTinyMarginEnd")

            var oLegendTitle = new sap.m.Text({
                text: oBundle.getText("INVENTORYBYLOT.LEGENDTITLE")
            })
            oLegendTitle.addStyleClass("text-bold sapUiTinyMarginEnd");
            var oLegendBox = new sap.m.HBox({
                items: [
                    oLegendTitle,
                    oExpiryStatusGreen,
                    oExpiryStatusGreenText,
                    oExpiryStatusYellow,
                    oExpiryStatusYellowText,
                    oExpiryStatusRed,
                    oExpiryStatusRedText,
                    
                ],
                alignItems: "Center",
                justifyContent: "End"
            });

            oToolbar.addContent(new sap.m.ToolbarSpacer());
            oToolbar.addContent(oLegendBox);
            oView.setBusy(true);
        
            oSmartFilterBar.attachInitialized(function () {
                oView.setBusy(false); // Once filter bar + value helps are ready
            });
            
            const oTable = oSmartTable.getTable();
            this.bAuthorizationErrorShown = false;
            oModel.attachRequestFailed(function (oEvent) {
                var oParams = oEvent.getParameters();
                if (oParams.response.statusCode === "403") {
                    oTable.setNoData("No data available due to authorization restrictions");
                    oTable.setBusy(false)    
                    if(!this.bAuthorizationErrorShown) {
                        this.bAuthorizationErrorShown = true;
                        MessageBox.error("You do not have the required permissions to access this report.", {
                            title: "Unauthorized Access",
                            id: "messageBoxId1",
                            details: "Permission is required to access this report. Please contact your administrator if you believe this is an error or require access.",
                            contentWidth: "100px",
                        });
                    
                    }
                }
            });
            var oTileCountsModel = new JSONModel({
                counts: {
                    OpenStock: 0,
                    Quarantine: 0,
                    Damage: 0,
                    Retains: 0,
                    QualityHold: 0,
                    Returns: 0,
                    Recalls: 0
                }
            });
            
            this.getView().setModel(oTileCountsModel, "summaryCounts"); //GridTable
            // Get the SmartTable and bind the data change event
            
            var oBinding = oTable.getBinding("rows");
            
            oTable.attachEvent("rowsUpdated",this._calculateTotals.bind(this));// For GridTable

            // // Fetch User Data and Logo
            // const oUserModel = this.getOwnerComponent().getModel("userModel");
            // const userData = oUserModel ? oUserModel.getData() : {};
            // const mfgNumber = userData.ManufacturerNumber;

            // const oLogoModel = this.getOwnerComponent().getModel("logo");

            // var sAppPath = sap.ui.require.toUrl("invbylot").split("/resources")[0];
            // if(sAppPath === ".") {
            //     sAppPath = "";
            // }
            // const sFallbackImage = sAppPath + "/images/MCKCAN1.jpg";

            // if (!mfgNumber) {
            //     console.warn("No ManufacturerNumber in user model. Showing fallback logo.");
            //     oView.byId("logoImage").setSrc(sFallbackImage);
            //     return;
            // }

            // //const paddedMfg = mfgNumber.padStart(9, "0");

            // const oFilter = new sap.ui.model.Filter("manufacturerNumber", "EQ", mfgNumber);
            // const oListBinding = oLogoModel.bindList("/MediaFile", undefined, undefined, [oFilter]);

            // oListBinding.requestContexts().then(function (aContexts) {
            //     if (aContexts && aContexts.length > 0) {
            //     const oData = aContexts[0].getObject();
            //     const sCleanUrl = oData.url.replace(/^.*(?=\/odata\/v4\/media)/, "");
            //     const sSrcUrl = sAppPath + sCleanUrl;
            //     oView.byId("logoImage").setSrc(sSrcUrl);
            //     } else {
            //     console.warn("No matching logo found. Fallback image used.");
            //     oView.byId("logoImage").setSrc(sFallbackImage);
            //     }
            // }.bind(this)).catch(function (err) {
            //     console.error("Binding error:", err);
            //     oView.byId("logoImage").setSrc(sFallbackImage);
            // }.bind(this));
        },
        _refreshUserModel: async function () {
            const oUserModel = this.getOwnerComponent().getModel("userModel");
            var sAppPath = sap.ui.require.toUrl("invbylot").split("/resources")[0];
            if(sAppPath === ".") {
                sAppPath = "";
            }
            const url = sAppPath + "/user-api/attributes"
            try {
                const oResponse = await fetch(url); // or /me or /currentUser
                const oUserData = await oResponse.json();
        
                oUserModel.setData(oUserData);
                console.log("✅ User model refreshed:", oUserData);
            } catch (err) {
                console.error("❌ Failed to fetch user info", err);
            }
        },     
        _fetchAndSetLogo: function () {
            const oView = this.getView();
            const oUserModel = this.getOwnerComponent().getModel("userModel");
            const userData = oUserModel ? oUserModel.getData() : {};
            const mfgNumber = userData.ManufacturerNumber;
            const oLogoImage = oView.byId("logoImage");
        
            var sAppPath = sap.ui.require.toUrl("invbylot").split("/resources")[0];
            if (sAppPath === ".") {
                sAppPath = "";
            }
            
            const sFallbackImage = sAppPath + "/images/MCKCAN1.jpg";
        
            if (!mfgNumber) {
                console.warn("No ManufacturerNumber in user model. Showing fallback logo.");
                oLogoImage.setSrc(sFallbackImage);
                return;
            }
        
            const oLogoModel = this.getOwnerComponent().getModel("logo");
            const oFilter = new sap.ui.model.Filter("manufacturerNumber", "EQ", mfgNumber);
            const oListBinding = oLogoModel.bindList("/MediaFile", undefined, undefined, [oFilter]);
        
            oListBinding.requestContexts().then(function (aContexts) {
                if (aContexts && aContexts.length > 0) {
                    const oData = aContexts[0].getObject();
                    const sCleanUrl = oData.url.replace(/^.*(?=\/odata\/v4\/media)/, "");
                    const sSrcUrl = sAppPath + sCleanUrl;
                    oLogoImage.setSrc(sSrcUrl);
                } else {
                    console.warn("No matching logo found. Fallback image used.");
                    oLogoImage.setSrc(sFallbackImage);
                }
            }.bind(this)).catch(function (err) {
                console.error("Binding error:", err);
                oLogoImage.setSrc(sFallbackImage);
            }.bind(this));
        }, 
        _onPatternMatched: async function () {
            await this._refreshUserModel(); 
            // This function runs every time the route matching this view is hit.
            // Call the logo fetching logic here to ensure it's always up-to-date.
            console.log("RouteView1 pattern matched – fetching logo...");
            this._fetchAndSetLogo();
        },
        removeLeadingZeros: function(value) {
            if (typeof value === "string" && /^\d+$/.test(value)) {
                return String(Number(value));
            }
            return value; 
        },
       
        // Added by Bryan Cash calculate totals for table. This code will need to be updated when backend is finished to refelct correct data
        _calculateTotals: function (oModel) {
            
            var oSmartTable = this.getView().byId("table0");
            var oTable = oSmartTable.getTable();
            var oBinding = oTable.getBinding("rows"); // For GridTable
            var aContexts = oBinding.getContexts(0, oBinding.getLength()); // Get all contexts
            var oTileCounts = {
                OpenStock: 0,
                Quarantine: 0,
                Damage: 0,
                Retains: 0,
                QualityHold: 0,
                Returns: 0,
                Recalls: 0
            };
            var fTotalQuantityOnHand = 0;
            var fTotalDaysUntilExpiry = 0;
            
            aContexts.forEach(function (oContext) {
                // oTileCounts.OpenStock += parseFloat(oContext.getProperty("OPEN_STOCK")) || 0;
                // oTileCounts.Quarantine += parseFloat(oContext.getProperty("QUARANTINE")) || 0;
                // oTileCounts.Damage += parseFloat(oContext.getProperty("DAMAGE_DESTRUCTION")) || 0;
                // oTileCounts.Retains += parseFloat(oContext.getProperty("RETAINS")) || 0;
                // oTileCounts.QualityHold += parseFloat(oContext.getProperty("QUALITY_HOLD")) || 0;
                // oTileCounts.Returns += parseFloat(oContext.getProperty("RETURNS_CAL")) || 0;
                // oTileCounts.Recalls += parseFloat(oContext.getProperty("RECALLS")) || 0;
                fTotalDaysUntilExpiry += parseFloat(oContext.getProperty("DAYS_UNTIL_EXPIRY")) || 0;
                fTotalQuantityOnHand += parseFloat(oContext.getProperty("ON_HAND")) || 0;
            });
            var formattedQuantityOnHand = this._formatNumber(fTotalQuantityOnHand);
            var formattedDaysUntilExpiry = this._formatNumber(fTotalDaysUntilExpiry);

            // Update the model with calculated totals
            this.getView().getModel("summaryCounts").setProperty("/counts", oTileCounts);
            this.byId("footerText1").setText(formattedQuantityOnHand);
            this.byId("footerText2").setText(formattedDaysUntilExpiry);

        },
        _formatDate: function (date) {
            if (!date) return ""; // Return empty string if no date is provided
        
            let oDate;
        
            // Handle string date (e.g., 'yyyyMMdd')
            if (typeof date === "string") {
                if (date.length === 8) { // Ensure the format is correct
                    const formattedDateString = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8);
                    oDate = new Date(formattedDateString + "T00:00:00Z"); // Force UTC for consistency
                } else {
                    return ""; // Invalid string format
                }
            }
            // Handle Date object
            else if (date instanceof Date) {
                oDate = new Date(date.getTime()); // Clone to avoid mutation
            } else {
                return ""; // Unsupported type
            }
        
            // Check if the date is valid
            if (isNaN(oDate.getTime())) {
                return ""; // Return empty string for invalid date
            }
        
            // Adjust for local timezone only if necessary
            // Remove the offset adjustment if using UTC consistently across your app
            oDate.setMinutes(oDate.getMinutes() + oDate.getTimezoneOffset());
        
            // Format the date into a more readable string
            const oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                style: "medium" // Use 'medium' style or customize as needed
            });
        
            // Return the formatted date
            return oDateFormat.format(oDate);
        },
        _formatNumber : function (value) {
            return new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 0
            }).format(value);
        },
        _formatRowHighlight: function (oValue) {
			// Your logic for rowHighlight goes here
			if (oValue >= 120) {
                return "Success";
            } else if (oValue > 0) {
                return "Warning";
            } else if (oValue = 0) {
                return "Error"
            } else {
                return "Error"
            }
		},
    });
});