sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Image",
    "sap/m/MessageBox",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/format/NumberFormat" 
], function (Controller, Dialog, Button, Image, MessageBox, ResourceModel, NumberFormat) {
    "use strict";

    return Controller.extend("shiphis.controller.View1", {
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
                text: oBundle.getText("statusCurrent"),
                icon: "sap-icon://circle-task-2",
                state: "Success",
                inverted:true,
                tooltip: oBundle.getText("SHIPPINGHISTORY.CURRENTTOOLTIP")
            })
            oCurrentStatus.addStyleClass("sapUiTinyMarginEnd");
            var oCurrentStatusText =  new sap.m.Text({
                text: " | "
            })
            oCurrentStatusText.addStyleClass("text-bold sapUiTinyMarginEnd");
            var oLegacyStatus = new sap.m.ObjectStatus({
                text: oBundle.getText("statusLegacy"),
                icon: "sap-icon://circle-task-2",
                state: "Information",
                inverted:true,
                tooltip: oBundle.getText("SHIPPINGHISTORY.LEGACYTOOLTIP")
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

            // var sAppPath = sap.ui.require.toUrl("shiphis").split("/resources")[0];
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
        
            // // Attach event for rowsUpdated to handle dynamic updates
            // oTable.attachEvent("rowsUpdated", this._calculateTotals.bind(this));
        
            // // Listen to binding's dataReceived event to get the full dataset after initial loading
            // var oBinding = oTable.getBinding("rows");
            // if (oBinding) {
            //     oBinding.attachEventOnce("dataReceived", function () {
            //         this._calculateInitialTotals(oBinding); // Pass the binding directly
            //     }.bind(this));
            // }
        },
        _refreshUserModel: async function () {
            const oUserModel = this.getOwnerComponent().getModel("userModel");
            var sAppPath = sap.ui.require.toUrl("shiphis").split("/resources")[0];
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
        
            var sAppPath = sap.ui.require.toUrl("shiphis").split("/resources")[0];
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
        /**
         * Calculate totals on initialization with full dataset.
         */
        _calculateInitialTotals: function (oBinding) {
            debugger
            if (oBinding) {
                var oModel = oBinding.getModel();
                var sPath = oBinding.getPath();
                
                // Get all data directly from the model
                var aData = oModel.getProperty(sPath) || [];
                this._updateTotals(aData); // Use the shared function to calculate totals
            }
        },
        
        /**
         * Event-driven totals calculation for visible/filtered data.
         */
        _calculateTotals: function () {
            // debugger // Keep or remove debugger as needed
            var oTable = this.byId("table0").getTable();
            var oBinding = oTable.getBinding("rows");
            var fTotalLinesShipped = 0;
        
            if (oBinding) {
                fTotalLinesShipped = oBinding.getCount(); // Get the count (this is a number)
        
                // Get contexts only if count > 0 to avoid unnecessary calls
                var aContexts = [];
                if (fTotalLinesShipped > 0) {
                     aContexts = oBinding.getContexts(0, fTotalLinesShipped);
                }
        
                var aFilteredData = aContexts.map(function (oContext) {
                    return oContext.getObject();
                });
        
                // --- Formatting Added Here ---
                // Get an integer formatter (handles thousand separators based on locale)
                var oIntegerFormat = NumberFormat.getIntegerInstance({
                    groupingEnabled: true
                });
                var formattedLinesShipped = oIntegerFormat.format(fTotalLinesShipped); // Format the number
                // --- End Formatting ---
        
                // Set the formatted text
                this.byId("_IDGenNumericContent2").setText(formattedLinesShipped);
        
                // Pass raw data to next function for further calculations
                this._updateTotals(aFilteredData);
        
            } else {
                 // Handle case where binding doesn't exist? Clear fields maybe?
                 var oIntegerFormat = NumberFormat.getIntegerInstance({ groupingEnabled: true });
                 this.byId("_IDGenNumericContent2").setText(oIntegerFormat.format(0));
                 this._updateTotals([]); // Call update with empty data
            }
        },
        
         /**
         * Perform totals calculation and update UI elements.
         */
        _updateTotals: function (aData) {
            // debugger // Keep or remove debugger as needed

            // --- Get Formatter Instances ---
            var oIntegerFormat = NumberFormat.getIntegerInstance({
                groupingEnabled: true
            });
            // Use Float instance for amounts that might have decimals
            var oFloatFormat = NumberFormat.getFloatInstance({
                groupingEnabled: true,
                maxFractionDigits: 2 // Adjust max/minFractionDigits as needed for FKIMG
                // minFractionDigits: 2 // Use if you always want two decimal places
            });
            // --- End Formatter Instances ---

            if (aData && aData.length > 0) { // Check if aData is valid array
                var fTotalOrdersShipped = 0;  // Total for Orders Shipped (Count)
                var fTotalItemAmount = 0;     // Total for Item Amount (Sum)
                var oUniqueInvoices = new Set(); // Track unique invoices

                // Iterate through the data
                aData.forEach(function (oRowData) {
                    var sInvoice = oRowData["VBELN"];
                    // Ensure FKIMG is treated as a number, default to 0 if invalid/null
                    var fItemAmount = parseFloat(oRowData["FKIMG"]) || 0;

                    if (sInvoice) {
                        oUniqueInvoices.add(sInvoice); // Track unique invoices
                    }

                    // Sum up item amount
                    fTotalItemAmount += fItemAmount;
                });

                // Total unique invoices equals Orders Shipped
                fTotalOrdersShipped = oUniqueInvoices.size;

                // --- Format Totals ---
                var formattedOrdersShipped = oIntegerFormat.format(fTotalOrdersShipped);
                var formattedItemAmount = oFloatFormat.format(fTotalItemAmount);
                // --- End Formatting ---

                // Bind the formatted totals to respective UI elements
                this.byId("_IDGenNumericContent1").setText(formattedOrdersShipped); // Orders Shipped
                // _IDGenNumericContent2 (Lines Shipped) is set in _calculateTotals
                this.byId("_IDGenNumericContent3").setText(formattedItemAmount);    // Item Amount

            } else {
                // If no data, clear the UI fields using formatted zero values
                this.byId("_IDGenNumericContent1").setText(oIntegerFormat.format(0));
                // _IDGenNumericContent2 is already handled if _calculateTotals passes empty data
                this.byId("_IDGenNumericContent3").setText(oFloatFormat.format(0));
            }
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
        /** 
         * @param {boolean} [b12HourFomat]
        **/
        _formatTime: function (sTime, b12HourFomat) {
            if (!sTime) {
                return ""
            }

            var iHours = parseInt(sTime.substr(0, 2), 10);
            var iMinutes = parseInt(sTime.substr(2, 2), 10);
            var iSeconds = parseInt(sTime.substr(4, 2), 10);

            var sPeriod = iHours > 12 ? "PM" : "AM";
            iHours = iHours % 12 || 12;
            
            var sFormattedTime = iHours + ":" + String(iMinutes).padStart(2, "0") + ":" + String(iSeconds).padStart(2, "0") + " " + sPeriod;

            return sFormattedTime;
        },
        _removeLeadingZeros: function(sku) {
            return sku ? String(parseInt(sku, 10)) : sku;   
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