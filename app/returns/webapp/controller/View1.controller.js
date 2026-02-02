sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"

], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("returns.controller.View1", {
        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteView1").attachPatternMatched(this._onPatternMatched, this);

            var oModel = this.getOwnerComponent().getModel();
            const oView = this.getView();
            const oSmartFilterBar = oView.byId("bar0");
        
            oView.setBusy(true);
        
            oSmartFilterBar.attachInitialized(function () {
                oView.setBusy(false); // Once filter bar + value helps are ready
            });
            const oSmartTable = this.getView().byId("table0");
            var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var oToolbar = oSmartTable.getToolbar();
            var oCurrentStatus = new sap.m.ObjectStatus({
                text: oBundle.getText("RETURNS.CURRENTTEXT"),
                icon: "sap-icon://circle-task-2",
                state: "Success",
                inverted:true,
                tooltip: oBundle.getText("RETURNS.CURRENTTOOLTIP")
            })
            oCurrentStatus.addStyleClass("sapUiTinyMarginEnd");
            var oCurrentStatusText =  new sap.m.Text({
                text: " | "
            })
            oCurrentStatusText.addStyleClass("text-bold sapUiTinyMarginEnd");
            var oLegacyStatus = new sap.m.ObjectStatus({
                text: oBundle.getText("RETURNS.LEGACYTEXT"),
                icon: "sap-icon://circle-task-2",
                state: "Information",
                inverted:true,
                tooltip: oBundle.getText("RETURNS.LEGACYTOOLTIP")
            })
            oLegacyStatus.addStyleClass("sapUiTinyMarginEnd")
            var oLegacyStatusText =  new sap.m.Text({
                text: "Legacy Data"
            })
            oLegacyStatusText.addStyleClass("text-bold sapUiTinyMarginEnd")
            var oLegendTitle = new sap.m.Text({
                text: "Legend:"
            })
            oLegendTitle.addStyleClass("text-bold sapUiTinyMarginEnd");
            var oLegendBox = new sap.m.HBox({
                items: [
                    oCurrentStatus,
                    oCurrentStatusText,
                    oLegacyStatus
                    
                ],
                alignItems: "Center",
                justifyContent: "End"
            });

            oToolbar.addContent(new sap.m.ToolbarSpacer());
            oToolbar.addContent(oLegendBox);
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
            // // Fetch User Data and Logo
            // const oUserModel = this.getOwnerComponent().getModel("userModel");
            // const userData = oUserModel ? oUserModel.getData() : {};
            // const mfgNumber = userData.ManufacturerNumber;

            // const oLogoModel = this.getOwnerComponent().getModel("logo");

            // var sAppPath = sap.ui.require.toUrl("returns").split("/resources")[0];
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
            
            // Attach event listener for rowsUpdated to recalculate totals when data changes
            oTable.attachEvent("rowsUpdated", this._calculateTotals.bind(this));
        },
        _refreshUserModel: async function () {
            const oUserModel = this.getOwnerComponent().getModel("userModel");
            var sAppPath = sap.ui.require.toUrl("returns").split("/resources")[0];
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
        
            var sAppPath = sap.ui.require.toUrl("returns").split("/resources")[0];
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
        onSearch: function () {
            const oSmartFilterBar = this.getView().byId("smartFilterBar");
            const oSmartTable = this.getView().byId("table0");
            const oBinding = oSmartTable.getTable().getBinding("rows");
        
            if (!oBinding) {
                console.warn("Table binding is missing.");
                return;
            }
        
            // Get selected value from the filter
            let sCurrentStatus = this.getView().byId("currentFilterBox").getSelectedKey();
        
            // Build the filter condition
            let aFilters = [];
            if (sCurrentStatus) {
                aFilters.push(new sap.ui.model.Filter("CURRENT", sap.ui.model.FilterOperator.Contains, sCurrentStatus));
            }
        
            // Apply the filter
            oBinding.filter(aFilters);
        },
        // calculateRgaCounts: function(aData) {
        //     let iOpenRgaCount = 0;
        //     let iClosedRgaCount = 0;
        //     let iCreditAmountNotNullCount = 0;
        
        //     // Use a Set to track unique VBELN_VBAK for open RGAs
        //     const uniqueOpenRgas = new Set();
        
        //     if (aData && Array.isArray(aData)) {
        //         aData.forEach(oItem => {
        //             // Count 1: Unique count of VBELN_VBAK for open RGA (LFGDK is not 'C')
        //             if (oItem.LFGSK !== 'C' && oItem.VBELN_VBAK) {
        //                 uniqueOpenRgas.add(oItem.VBELN_VBAK);
        //             }
        
        //             // Count 2: Count of LFGDK where LFGDK = 'C' for closed RGA
        //             if (oItem.LFGSK === 'C') {
        //                 iClosedRgaCount++;
        //             }
        
        //             // Count 3: Count of all CREDIT_AMT_NETWR where CREDIT_AMT_NETWR is not null
        //             // We check for undefined, null, and empty string, and also ensure it's not 0 if 0 is considered null in this context
        //             if (oItem.CREDIT_AMT_NETWR !== undefined && oItem.CREDIT_AMT_NETWR !== null && oItem.CREDIT_AMT_NETWR !== '') {
        //                  // You might want to add a check for 0 depending on your data's representation of 'null' credit
        //                  // if (parseFloat(oItem.CREDIT_AMT_NETWR) !== 0) {
        //                      iCreditAmountNotNullCount++;
        //                  // }
        //             }
        //         });
        
        //         // The unique open RGA count is the size of the Set
        //         iOpenRgaCount = uniqueOpenRgas.size;
        //     }
        
        //     return {
        //         openRgaCount: iOpenRgaCount,
        //         closedRgaCount: iClosedRgaCount,
        //         creditAmountNotNullCount: iCreditAmountNotNullCount
        //     };
        // },
        _calculateTotals: function (oEvent) {
            // Get the table and its rows binding from the event source
            var oTable = oEvent.getSource();
            var oBinding = oTable.getBinding("rows");
        
            // Ensure the binding exists and has data contexts
            if (oBinding && oBinding.getLength() > 0) {
                // Get all data contexts from the binding
                var aContexts = oBinding.getContexts(0, oBinding.getLength());
        
                // Map contexts to plain JavaScript objects for easier access
                var aData = aContexts.map(oContext => oContext.getObject());
        
                // --- Initialize counters and sets for calculations ---
        
                // Total for CREDIT_AMT_NETWR (keeping existing logic for footer)
                var fTotalCreditAmountNetWr = 0; // Renamed for clarity
        
                // Set to store distinct VBAK-VBELN where VBTYP = 'H' (Total Returns)
                const uniqueTotalReturnsVBELN_VBAK = new Set();
        
                // Set to store distinct VBAK-VBELN where VBTYP = 'H' and LFGSK = 'C' (Closed RGA)
                const uniqueClosedRgaVBELN_VBAK = new Set();
        
                // Set to store unique VBELN_VBRK for all credited RGAs (where VBELN_VBRK exists)
                const uniqueCreditedRgasVBELN_VBRK = new Set(); // Re-introduced Set for unique VBELN_VBRK for credited
        
                // --- Iterate through the data to perform calculations ---
                aData.forEach(function (oItem) {
                    // Calculate Total CREDIT_AMT_NETWR for footer
                    // Using CREDIT_AMT_NETWR based on your provided code snippet
                    fTotalCreditAmountNetWr += parseFloat(oItem.CREDIT_AMT_NETWR || 0);
        
                    // Check if the item is a Return (VBTYP === 'H')
                    if (oItem.VBTYP === 'H' && oItem.VBELN_VBAK) {
                        // Add to the set for total returns count
                        uniqueTotalReturnsVBELN_VBAK.add(oItem.VBELN_VBAK);
        
                        // Check if it's also a Closed RGA (LFGSK === 'C')
                        if (oItem.LFGSK === 'C') {
                            // Add to the set for closed RGA count
                            uniqueClosedRgaVBELN_VBAK.add(oItem.VBELN_VBAK);
                        }
                    }
        
                    // Add VBELN_VBRK to the set for all credited RGAs if VBELN_VBRK exists
                    // This is separate from the Open/Closed RGA logic
                    if (oItem.VBELN_VBRK !== undefined && oItem.VBELN_VBRK !== null && oItem.VBELN_VBRK !== '') {
                         uniqueCreditedRgasVBELN_VBRK.add(oItem.VBELN_VBRK);
                    }
                });
        
                // --- Finalize counts based on new logic ---
        
                // Count 1: Distinct count of VBAK-VBELN where VBTYP = 'H' (Total Returns)
                const iTotalReturnsCount = uniqueTotalReturnsVBELN_VBAK.size;
        
                // Count 2: Distinct count of VBAK-VBELN where VBTYP = 'H' and LFGSK = 'C' (Closed RGA)
                const iClosedRgaCount = uniqueClosedRgaVBELN_VBAK.size;
        
                // Count 3: Open RGA = Total Returns - Closed RGA
                const iOpenRgaCount = iTotalReturnsCount - iClosedRgaCount;
        
                // Count 4: Unique Credited RGA Count (Distinct VBELN_VBRK where VBELN_VBRK exists)
                const iUniqueCreditedRgaCount = uniqueCreditedRgasVBELN_VBRK.size; // Get the size of the credited set
        
                // --- Update UI elements with calculated totals and counts ---
        
                // Update footer with formatted Total CREDIT_AMT_NETWR
                // Assuming _formatCurrency is available in your controller
                var formattedCreditAmountNetWr = this._formatCurrency ? this._formatCurrency(fTotalCreditAmountNetWr) : fTotalCreditAmountNetWr;
                this.byId("TotUnitsPriceText").setText(formattedCreditAmountNetWr);
        
                // Update summary tiles based on the new requirements:
                // Assuming mapping based on the new RGA calculation logic and re-added credited count:
                // summaryTile1: Unique Credited RGA Count (Distinct VBELN_VBRK where VBELN_VBRK exists)
                // summaryTile2: Total Returns Count (Distinct VBAK-VBELN where VBTYP = 'H')
                // summaryTile3: Closed RGA Count (Distinct VBAK-VBELN where VBTYP = 'H' and LFGSK = 'C')
                // summaryTile4: Open RGA Count (Total Returns - Closed RGA)
                // Note: Adjusted tile mapping based on typical placement and re-addition of credited count.
                // You might need to adjust the tile IDs (summaryTile1, summaryTile2, etc.)
                // based on which tile you want each count to appear in.
                this.byId("summaryTile1").setText(iUniqueCreditedRgaCount); // Credited RGA Count
                this.byId("summaryTile2").setText(iOpenRgaCount); // Total Returns Count
                this.byId("summaryTile3").setText(iClosedRgaCount); // Closed RGA Count
                // If you have a fourth tile, you could display Open RGA there:
                // this.byId("summaryTile4").setText(iOpenRgaCount);
                // Or you can choose to display Open RGA in one of the existing tiles if you prefer.
                // For now, I'll map Total, Closed, and Credited to 1, 2, and 3.
        
            } else {
                // Handle case where binding is not available or has no data
                console.warn("Table binding not available or no data found.");
                // Optionally clear the tile texts and footer if no data
                this.byId("TotUnitsPriceText").setText("0"); // Assuming this is the footer ID
                this.byId("summaryTile1").setText("0");
                this.byId("summaryTile2").setText("0");
                this.byId("summaryTile3").setText("0");
                // If summaryTile4 exists:
                // this.byId("summaryTile4").setText("0");
            }
        },
        // _calculateTotals: function (oEvent) {
        //     var oTable = oEvent.getSource();
        //     var oBinding = oTable.getBinding("rows");  // Get the rows binding
        //     var aContexts = oBinding.getContexts(0, oBinding.getLength());
        //     // Ensure that the binding exists and is set up
        //     if (oBinding) { // Get the data rows
        //         var fTotalNetWr = 0;
        //         let credited = new Set();   // Total for NETWR (Invoice Amount)
        //         var fTotalCredited = 0;  
        //         var fTotalOpenRGA = 0;  // Total for CAL_CASH_RECEIVED (Cash Received)
        //         var fTotalClosedRGA = 0;
        //         var aData = aContexts.map(oContext => oContext.getObject());
        //         fTotalClosedRGA = aData.filter(item => item.AUDAT).length
        //         fTotalOpenRGA = aData.filter(item => !item.AUDAT).length
        //         // Iterate through the rows to sum the values
        //         aContexts.forEach(function (oContext) {
        //             var oData = oContext.getObject();
        //             fTotalNetWr += parseFloat(oContext.getProperty("NETWR")) || 0;
        //             credited.add(oData.VBELN);
        //         });
        //         var formattedNetWr = this._formatCurrency(fTotalNetWr);
        //         const creditedCount = credited.size;
        //         // Update footer with the calculated totals
                
        //         this.byId("TotUnitsPriceText").setText(formattedNetWr);
        //         this.byId("summaryTile1").setText(creditedCount);
        //         this.byId("summaryTile2").setText(fTotalOpenRGA);
        //         this.byId("summaryTile3").setText(fTotalClosedRGA);
                
        //     }
        // },
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
        }
    });
});