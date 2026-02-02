/* ********* Modification Log *****************************************************************
Version CHG#:       INCIDENT#:     DATE:       DEVELOPER:
1.0     CHG0238269  INC3492677     Jan-12-26  Raja Senthil N
DESCRIPTION: During format of Summation of Total Sales, Handle null value flow of String "0"
2.0     CHG0242283  INC3611792     Jan-27-26  Raja Senthil N 
DESCRIPTION: - During format of Summation of Total Sales: Handle summation value less than "1000"
               by Converting to Number(from String) before formatting
***********************************************************************************************/
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Image",
    "sap/m/MessageBox",
    'sap/ui/core/BusyIndicator'
], (Controller, Dialog, Button, Image, MessageBox, BusyIndicator) => {
    "use strict";
    return Controller.extend("salesbycus.controller.View1", {
        onInit: function () { 
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteView1").attachPatternMatched(this._onPatternMatched, this);
            const oModel = this.getOwnerComponent().getModel();
            const oView = this.getView();
            const oSmartFilterBar = oView.byId("bar0");
            // oModel.read('/SalesTotals', {
            //     success: (oData) => {
            //         console.log('SalesTotals data:', oData);
            //         this.getView().getModel('local').setProperty('/salesTotals', oData.value); // save locally
            //     },
            //     error: (oError) => {
            //         console.error('Error loading SalesTotals:', oError);
            //     }
            // });
            var oUserPermissionsModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oUserPermissionsModel, "userPermissions"); // Use Component for Component-wide access
            var oDataModel = this.getOwnerComponent().getModel()
            // OData V2 Example (might need $format=json in URL or specific call method):
            // oDataModel.callFunction("/getUserPermissions", {
            //     method: "GET",
            //     success: function(oData, response) {
            //         // The actual result might be nested under a property named after the function
            //         oUserPermissionsModel.setData(oData.getUserPermissions || oData);
            //         console.log("User Permissions:", oUserPermissionsModel.getData());
            //     }.bind(this),
            //     error: function(oError) {
            //         console.error("Error fetching user permissions:", oError);
            //         oUserPermissionsModel.setData({ shouldHidePatientId: false });
            //     }.bind(this)
            // });
            oView.setBusy(true);
        
            oSmartFilterBar.attachInitialized(function () {
                oView.setBusy(false); // Once filter bar + value helps are ready
            });
            const oSmartTable = this.getView().byId("table0");
            if (!oSmartTable) {
                console.error("Smart Table 'table0' not found in the view.");
                return; // Exit if the control isn't there yet
            }
            
            // Attach the initialise event handler. 
            // We use .bind(this) or passing 'this' as the third argument to ensure the context is correct.
            oSmartTable.attachInitialise(this._onSmartTableInitialised, this);
            var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            
            var oToolbar = oSmartTable.getToolbar();
            var oCurrentStatus = new sap.m.ObjectStatus({
                text: oBundle.getText("SALESBYCURRENT.CURRENTTEXT"),
                icon: "sap-icon://circle-task-2",
                state: "Success",
                inverted:true,
                tooltip:oBundle.getText("SALESBYCURRENT.CURRENTTOOLTIP"),
            })
            oCurrentStatus.addStyleClass("sapUiTinyMarginEnd");
            var oCurrentStatusText =  new sap.m.Text({
                text: " | "
            })
            oCurrentStatusText.addStyleClass("text-bold sapUiTinyMarginEnd");
            var oLegacyStatus = new sap.m.ObjectStatus({
                text: oBundle.getText("SALESBYCURRENT.LEGACYTEXT"),
                icon: "sap-icon://circle-task-2",
                state: "Information",
                inverted:true,
                tooltip:oBundle.getText("SALESBYCURRENT.LEGACYTOOLTIP"),
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
            oTable.attachEvent("rowsUpdated", this._calculateTotals.bind(this));
            // // Fetch User Data and Logo
            // const oUserModel = this.getOwnerComponent().getModel("userModel");
            // const userData = oUserModel ? oUserModel.getData() : {};
            // const mfgNumber = userData.ManufacturerNumber;

            // const oLogoModel = this.getOwnerComponent().getModel("logo");

            // var sAppPath = sap.ui.require.toUrl("salesbycus").split("/resources")[0];
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
            var sAppPath = sap.ui.require.toUrl("salesbycus").split("/resources")[0];
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
        
            var sAppPath = sap.ui.require.toUrl("salesbycus").split("/resources")[0];
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
        _onSmartTableInitialised: function() {
            const oSmartTable = this.byId("table0"); // Safe to access here, as it's initialized

            const sFilterBarId = oSmartTable.getSmartFilterId();
            const oFilterBar = this.byId(sFilterBarId);

            if (oFilterBar) {
                // Attach the search event to our totals method
                // This ensures _calculateTotals is called whenever the user applies a filter
                oFilterBar.attachSearch(this._calculateTotals, this);
                
                // Also attach the reset event
                oFilterBar.attachReset(this._calculateTotals, this);

                // Perform the initial calculation after the SFB and Table are ready
                this._calculateTotals(); 
            } else {
                console.warn("Smart Filter Bar not found or not initialized.");
            }
        },
       /**
         * Executes a server-side OData read to fetch application-wide totals 
         * from the CAP service, applying any active filters from the Smart Filter Bar.
        */
        _calculateTotals: function (oEvent) {
            // 1. Get the necessary control references
            const oSmartTable = this.byId("table0");
            if (!oSmartTable) {
                console.error("Smart Table 'table0' not found.");
                return;
            }

            const sFilterBarId = oSmartTable.getSmartFilterId();
            const oFilterBar = this.byId(sFilterBarId);
            
            // Check if the SFB exists and is initialized
            if (!oFilterBar) {
                console.warn("Smart Filter Bar not ready for filter extraction.");
                return;
            }

            // 2. Extract and clean up the filters from the Smart Filter Bar
            // We get the raw filter array, which may contain complex groups (AND/OR).
            const aComplexFilters = oFilterBar.getFilters() || [];
            const aSimpleFilters = [];

            // Helper function to flatten the complex filter structure (to avoid serialization issues)
            const extractSimpleFilters = (oFilter) => {
                // Recursively extract filters if it's a composite filter (AND/OR group)
                if (oFilter.aFilters && oFilter.aFilters.length > 0) {
                    oFilter.aFilters.forEach(extractSimpleFilters);
                } else if (oFilter.sOperator && oFilter.oValue1 !== undefined) {
                    // It's a simple filter: Property, Operator, Value
                    aSimpleFilters.push(oFilter);
                }
                // NOTE: This intentionally skips filters with null/undefined values
            };
            
            aComplexFilters.forEach(extractSimpleFilters);
            
            // 3. Execute the OData read on the Singleton entity
            // This server call is now responsible for calculation and filter application.
            this.getView().getModel().read("/GlobalTotals(1)", {
                // Pass the array of clean filter objects
                filters: aSimpleFilters, 
                
                success: (oData) => {
                    // Data received from CAP: {ID: 1, TotalSales: 9828221.40, TotalUnits: ..., TotalLines: ...}

                    const fTotalSales = oData.TotalSales || 0;
                    const fTotalUnits = oData.TotalUnits || 0;
                    const iTotalLines = oData.TotalLines || 0;
                    const iUniqueInvoices = oData.UniqueInvoices || 0;
                    
                    


                    // 4. Format and update UI elements
                    
                    // Sales formatting (Assuming formatLargeNumber and formatCurrency are available)
                    const salesTotalFormatted = this.formatLargeNumber ? this.formatLargeNumber(fTotalSales) : fTotalSales;
                    const salesAmountFormatted = this.formatCurrency ? this.formatCurrency(fTotalSales, "USD") : fTotalSales;
                    
                    // Quantity/Line formatting
                    const unitsTotalFormatted = this.formatNumberWithCommas ? this.formatNumberWithCommas(fTotalUnits) : fTotalUnits;
                    const lineCountFormatted = this.formatNumberWithCommas ? this.formatNumberWithCommas(iTotalLines) : iTotalLines;
                    const uniqueInvoiceCountFormatted = this.formatNumberWithCommas ? this.formatNumberWithCommas(iUniqueInvoices) : iUniqueInvoices;

                    // Update Tiles
                    this._updateTile("_IDGenNumericContent1", salesTotalFormatted);       // Sales
                    this._updateTile("_IDGenNumericContent2", uniqueInvoiceCountFormatted);// Unique Invoices
                    this._updateTile("_IDGenNumericContent3", lineCountFormatted);        // Lines
                    this._updateTile("_IDGenNumericContent4", unitsTotalFormatted);       // Units
                    
                    // Update Footer (Assuming FooterText1 is for Quantity and FooterText2 is for Amount)
                    this._updateTile("FooterText1", unitsTotalFormatted);  // Quantity/Units
                    this._updateTile("FooterText2", salesAmountFormatted); // Amount
                    
                },
                error: (oError) => {
                    console.error("Failed to fetch server totals:", oError);
                    // Optionally clear the tiles or display a friendly error message
                    this._updateTile("_IDGenNumericContent1", "N/A");
                    this._updateTile("_IDGenNumericContent2", "N/A");
                    // ...
                }
            });
        },
        // _calculateTotals: function () {
        //     const oSmartTable = this.getView().byId("table0");
        //     const oTable = oSmartTable.getTable();
        //     const oBinding = oTable.getBinding("rows");
        
        //     if (!oBinding) {
        //         console.warn("Table binding is missing.");
        //         // Optionally clear tiles/footers if no binding
        //         this._updateTile("_IDGenNumericContent1", "0");
        //         this._updateTile("_IDGenNumericContent2", "0");
        //         this._updateTile("_IDGenNumericContent3", "0");
        //         this._updateTile("_IDGenNumericContent4", "0");
        //         this._updateTile("FooterText1", "0");
        //         this._updateTile("FooterText2", "0"); // Assuming FooterText2 is also updated by _updateTile
        //         return;
        //     }
        
        //     const aContexts = oBinding.getContexts(0, oBinding.getLength());
        //     // Check if contexts array is available and not empty
        //     if (!aContexts || aContexts.length === 0) {
        //         console.warn("Data is not available for calculation.");
        //         // Clear tiles/footers if no data
        //         this._updateTile("_IDGenNumericContent1", "0");
        //         this._updateTile("_IDGenNumericContent2", "0");
        //         this._updateTile("_IDGenNumericContent3", "0");
        //         this._updateTile("_IDGenNumericContent4", "0");
        //         this._updateTile("FooterText1", "0");
        //         this._updateTile("FooterText2", "0"); // Assuming FooterText2 is also updated by _updateTile
        //         return;
        //     }
        
        //     // Initialize totals and sets
        //     const totals = aContexts.reduce((acc, oContext) => {
        //         const oData = oContext.getObject();
        //         if (!oData) return acc;
        
        //         // Sales & Amount Calculation (Applied to all rows)
        //         acc.salesTotal += parseFloat(oData.AMOUNT_NETWR || 0);
        
        //         // Lines Calculation (Count every row)
        //         acc.lineCount++;
        
        //         // Units Calculation (Units per case * Quantity - Applied to all rows)
        //         // const unitsPerCase = parseFloat(oData.UNITS_PER_CASE || 0);
        //         const quantity = parseFloat(oData.QUANTITY_FKIMG || 0);
        //         acc.unitsTotal += quantity;
        
        //         // Footer Quantity Calculation (Sum QUANTITY_FKIMG - Applied to all rows)
        //         acc.quantityTotal += quantity;
        
        //         // --- New Logic for Unique Invoice Count ---
        //         // Only process if the type is "Invoice"
        //         if (oData.VTEXT_FKART === "Invoice") {
        //             // Add the invoice number to the Set for unique count if it exists
        //             if (oData.INVOICE_CREDIT_VBELN) {
        //                 acc.uniqueInvoiceNumbers.add(oData.INVOICE_CREDIT_VBELN);
        //             }
        //             // Note: The previous 'invoiceCount' which counted rows with type "Invoice"
        //             // is removed as the requirement is for the unique invoice number count.
        //         }
        //         // --- End New Logic ---
        
        //         return acc;
        //     }, {
        //         salesTotal: 0,
        //         // invoiceCount: 0, // Removed as we are now counting unique numbers
        //         lineCount: 0,
        //         unitsTotal: 0,
        //         quantityTotal: 0,
        //         uniqueInvoiceNumbers: new Set() // Set to store unique invoice numbers
        //     });
        
        //     // Calculate unique counts from the Sets
        //     const uniqueInvoiceCount = totals.uniqueInvoiceNumbers.size; // Get the size of the Set
        
        //     // Format values
        //     // Ensure formatter, formatLargeNumber, formatNumberWithCommas, and formatCurrency are available
        //     // Added basic checks for formatter and functions
        //     const salesTotalFormatted = this.formatLargeNumber ? this.formatLargeNumber(totals.salesTotal) : totals.salesTotal;
        //     const lineCountFormatted = this.formatNumberWithCommas ? this.formatNumberWithCommas(totals.lineCount) : totals.lineCount;
        //     const unitsTotalFormatted = this.formatNumberWithCommas ? this.formatNumberWithCommas(totals.unitsTotal) : totals.unitsTotal;
        //     const quantityTotalFormatted = this.formatLargeNumber ? this.formatLargeNumber(totals.quantityTotal) : totals.quantityTotal;
        //     const salesAmountFormatted = this.formatCurrency ? this.formatCurrency(totals.salesTotal, "USD") : totals.salesTotal;
        
        
        //     // Update UI elements (tiles)
        //     this._updateTile("_IDGenNumericContent1", salesTotalFormatted); // Sales
        //     // Update TileContent2 with the unique invoice count
        //     this._updateTile("_IDGenNumericContent2", this.formatNumberWithCommas ? this.formatNumberWithCommas(uniqueInvoiceCount) : uniqueInvoiceCount); // Unique Invoices
        //     this._updateTile("_IDGenNumericContent3", lineCountFormatted); // Lines
        //     this._updateTile("_IDGenNumericContent4", unitsTotalFormatted); // Units
        
        //     // Update Footer
        //     this._updateTile("FooterText1", quantityTotalFormatted); // Quantity (Assuming FooterText1 is updated by _updateTile)
        //     this._updateTile("FooterText2", salesAmountFormatted); // Amount (Same as Sales) (Assuming FooterText2 is updated by _updateTile)
        // },
        
        // Assuming these helper functions exist in your controller or a formatter file
        // Example placeholder for _updateTile
        _updateTile: function(sTileId, sText) {
            const oTile = this.getView().byId(sTileId);
            if (oTile) {
                // Assuming the tile has a setText method or a content with setText
                if (oTile.setText) {
                    oTile.setText(sText);
                } else if (oTile.getContent && oTile.getContent() && oTile.getContent().setText) {
                    oTile.getContent().setText(sText);
                } else {
                    console.warn("Tile or its content does not have a setText method:", sTileId);
                }
            } else {
                console.warn("Tile not found:", sTileId);
            }
        },
        onSearch: function () {
            const oSmartFilterBar = this.getView().byId("bar0");
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
        _formatRowHighlight: function (oValue) {
			// Your logic for rowHighlight goes here
			if (oValue === "NO") { 
				return "Information";
            }
			return "Success";
		},
        formatDate:function(value) {
            if (!value) return "";
            return value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
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
        formatLargeNumber: function(value) {
            /* Begin of CHG0238269 - INC3492677 - Handle String "0" */
            // if (!value || isNaN(value)) return "0";
            if (!value || isNaN(value) || value == "0") return "0";
            /* End of CHG0238269 - INC3492677 */
            const absValue = Math.abs(value); // Handle negative numbers safely
        
            if (absValue >= 1_000_000_000) {
                return (value / 1_000_000_000).toFixed(2) + "B";
            } else if (absValue >= 1_000_000) {
                return (value / 1_000_000).toFixed(2) + "M";
            } else if (absValue >= 1_000) {
                return (value / 1_000).toFixed(2) + "K";
            }
        /* Begin of CHG0242283 - INC3611792 - 
            Convert to Number(from String) before formatting */ 
            // return value.toFixed(2); // For values less than 1K
            return Number(value).toFixed(2); // For values less than 1K
        /* End of CHG0242283 - INC3611792 */
        },
        formatNumberWithCommas: function(value) {
            if (!value || isNaN(value)) return "0";
        
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        formatCurrency: function(value) {
            if (value === null || value === undefined || value === "") {
                return "--";
            }
            const numericValue = parseFloat(value);
            if (isNaN(numericValue)) {
                return "--"; // Or handle non-numeric values as appropriate
            }
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'narrowSymbol', // forces just $
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(numericValue);
        },
        _formatCurrency: function (value) {
            if (value == null || value === undefined) {
            return "--";
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
        onInvoiceClick: function (oEvent) {
            const sInvoiceNumber = oEvent.getSource().getText();

            // Mock API Call
            const sMockAPI = `/mock-api/invoices/${sInvoiceNumber}`;
            this._fetchInvoiceImage(sMockAPI)
                .then((sImageUrl) => this._showInvoiceDialog(sImageUrl))
                .catch((err) => sap.m.MessageToast.show("Failed to load invoice"));
        },
        _fetchInvoiceImage: function (sUrl) {
            // Simulate API response
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve("https://via.placeholder.com/600x800.png?text=Invoice");
                }, 1000);
            });
        },
        _showInvoiceDialog: function (sImageUrl) {
            const oDialog = new Dialog({
                title: "Invoice",
                content: new Image({ src: sImageUrl, width: "100%" }),
                buttons: [
                    new Button({
                        text: "Download",
                        press: () => this._downloadImage(sImageUrl)
                    }),
                    new Button({
                        text: "Print",
                        press: () => this._printImage(sImageUrl)
                    }),
                    new Button({
                        text: "Close",
                        press: function () {
                            oDialog.close();
                        }
                    })
                ]
            });
            oDialog.open();
        },

        _downloadImage: function (sImageUrl) {
            const oLink = document.createElement("a");
            oLink.href = sImageUrl;
            oLink.download = "invoice.png";
            oLink.click();
        },

        _printImage: function (sImageUrl) {
            const printWindow = window.open("");
            printWindow.document.write(`<img src='${sImageUrl}' style='width:100%;'/>`);
            printWindow.print();
            printWindow.close();
        }
        
    });
});