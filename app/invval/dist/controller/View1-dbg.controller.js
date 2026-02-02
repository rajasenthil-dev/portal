sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], (Controller, JSONModel, MessageBox) => {
    "use strict";

    return Controller.extend("invval.controller.View1", {
        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteView1").attachPatternMatched(this._onPatternMatched, this);
            const oView = this.getView();
            const oSmartFilterBar = oView.byId("bar0");
        
            oView.setBusy(true);
        
            oSmartFilterBar.attachInitialized(function () {
                oView.setBusy(false); // Once filter bar + value helps are ready
            });
            // // Fetch User Data and Logo
            // const oUserModel = this.getOwnerComponent().getModel("userModel");
            // const userData = oUserModel ? oUserModel.getData() : {};
            // const mfgNumber = userData.ManufacturerNumber;

            // const oLogoModel = this.getOwnerComponent().getModel("logo");

            // var sAppPath = sap.ui.require.toUrl("invval").split("/resources")[0];
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
           
            const oModel = this.getOwnerComponent().getModel();
            const oSmartTable = this.getView().byId("table0"); // Smart Table
            const oTable = oSmartTable.getTable(); // Nested Grid Table
            this.bAuthorizationErrorShown = false;
            
            oModel.attachRequestFailed((oEvent) => {
                const oParams = oEvent.getParameters();
                if (oParams.response.statusCode === "403") {
                    oTable.setNoData("No data available due to authorization restrictions");
                    oTable.setBusy(false);
                    if (!this.bAuthorizationErrorShown) {
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
            
            // const oTileCountsModel = new JSONModel({
            //     counts: {
            //         "OPEN_STOCK": 0,
            //         "QUARANTINE": 0,
            //         "DAMAGE_DESTRUCTION": 0,
            //         "RETAINS": 0,
            //         "QUALITY_HOLD": 0,
            //         "RETURNS_CAL": 0,
            //         "RECALLS": 0
            //     }
            // });
            
            // const oFooterCountsModel = new JSONModel({
            //     counts: {
            //         "TOTAL_COST": 0,
            //         "OPEN_STOCK": 0,
            //         "QUARANTINE": 0,
            //         "DAMAGE_DESTRUCTION": 0,
            //         "RETAINS": 0,
            //         "QUALITY_HOLD": 0,
            //         "RETURNS_CAL": 0,
            //         "RECALLS": 0
            //     }
            // });
            
            // this.getView().setModel(oTileCountsModel, "summaryCounts");
            // this.getView().setModel(oFooterCountsModel, "footerCounts");
        
            oTable.attachEvent("rowsUpdated",this.calculateTotals.bind(this));// For GridTable
        },
        _refreshUserModel: async function () {
            const oUserModel = this.getOwnerComponent().getModel("userModel");
            var sAppPath = sap.ui.require.toUrl("invval").split("/resources")[0];
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
        
            var sAppPath = sap.ui.require.toUrl("invval").split("/resources")[0];
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
        calculateTotals: function () {
            var oSmartTable = this.getView().byId("table0");
            var oTable = oSmartTable.getTable();
            var oBinding = oTable.getBinding("rows"); // For GridTable
            var aContexts = oBinding.getContexts(0, oBinding.getLength()); // Get all contexts
            
            var fTotalTotalCost= 0;
            var fTotalOpenStock = 0;
            var fTotalQuarantine = 0;
            var fTotalRetains = 0;
            var fTotalQualityHold = 0;
            var fTotalReturns = 0;
            var fTotalRecalls = 0;
            var fTotalInventoryHold = 0;
            var fTotalReLabel = 0;
            var fTotalDamage= 0;
            var fTotalSample = 0;

            
            aContexts.forEach(function (oContext) {
                fTotalTotalCost += parseFloat(oContext.getProperty("TOTAL_COST")) || 0;
                fTotalOpenStock += parseFloat(oContext.getProperty("AVAILABLE_COST")) || 0;
                fTotalQuarantine += parseFloat(oContext.getProperty("QUARANTINE_COST")) || 0;
                fTotalRetains += parseFloat(oContext.getProperty("RETAINS_COST")) || 0;
                fTotalQualityHold += parseFloat(oContext.getProperty("QUALITY_HOLD_COST")) || 0;
                fTotalReturns += parseFloat(oContext.getProperty("RETURNS_COST")) || 0;
                fTotalRecalls += parseFloat(oContext.getProperty("RECALL_COST")) || 0;
                fTotalInventoryHold += parseFloat(oContext.getProperty("INVENTORY_HOLD_COST")) || 0;
                fTotalReLabel += parseFloat(oContext.getProperty("RELABEL_COST")) || 0;
                fTotalDamage += parseFloat(oContext.getProperty("DAMAGE_DESTRUCTION_COST")) || 0;
                fTotalSample += parseFloat(oContext.getProperty("SAMPLE_COST")) || 0;
                
                
            });
            var formattedTotalCost = this._formatNumber(fTotalTotalCost);
            var formattedOpenStock = this._formatNumber(fTotalOpenStock);
            var formattedQuarantine = this._formatNumber(fTotalQuarantine);
            var formattedRetains = this._formatNumber(fTotalRetains);
            var formattedQualityHold = this._formatNumber(fTotalQualityHold);
            var formattedReturns = this._formatNumber(fTotalReturns);
            var formattedRecalls = this._formatNumber(fTotalRecalls);
            var formattedInventoryHold = this._formatNumber(fTotalInventoryHold);
            var formattedReLabel = this._formatNumber(fTotalReLabel);
            var formattedDamage = this._formatNumber(fTotalDamage);
            var formattedSample = this._formatNumber(fTotalSample);
            // Update the model with calculated totals
            this.byId("footerText1").setText("$" + formattedTotalCost);
            this.byId("footerText2").setText("$" + formattedOpenStock);
            this.byId("footerText3").setText("$" + formattedQuarantine);
            this.byId("footerText4").setText("$" + formattedRetains);
            this.byId("footerText5").setText("$" + formattedQualityHold);
            this.byId("footerText6").setText("$" + formattedReturns);
            this.byId("footerText7").setText("$" + formattedRecalls);
            this.byId("footerText8").setText("$" + formattedInventoryHold);
            this.byId("footerText9").setText("$" + formattedReLabel);
            this.byId("footerText10").setText("$" + formattedDamage);
            this.byId("footerText11").setText("$" + formattedSample);
        },
        _formatNumber : function (value) {
            return new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 0
            }).format(value);

        },
        
        formatLargeNumber: function (value) {
            if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
            if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
            return value.toString();
        },
        
        _formatCurrency: function (value) {
            if (value == null || value === undefined) {
            return "";
            }
        
            // Get the locale
            var sLocale = sap.ui.getCore().getConfiguration().getLocale().getLanguage();
            var sCurrencyCode;
        
            switch (sLocale) {
                case "en-US":
                    sCurrencyCode = "USD";
                    break;
                case "en-CA":
                    sCurrencyCode = "CAD";
                    break;
                case "fr-CA":
                    sCurrencyCode = "CAD";
                    break;
            // Add more cases as needed for other languages/regions
                default:
                    sCurrencyCode = "USD"; // Default currency code
                    break;
            }
        
            // Create a NumberFormat instance with currency type
            var oNumberFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance({
            "currencyCode": false,
            "customCurrencies": {
                "MyDollar": {
                    "isoCode": sCurrencyCode,
                    "decimals": 2
                }
            },
            groupingEnabled: true,
            showMeasure: true
            });
            return oNumberFormat.format(value, "MyDollar");
        },

        _formatNumber: function (value) {
            return new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 0
            }).format(value);
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

        _removeLeadingZeros: function (value) {
            if(typeof value === "string" && /^\d+/.test(value)) {
                return String(Number(value))
            }
            return value
        }
    });
});
