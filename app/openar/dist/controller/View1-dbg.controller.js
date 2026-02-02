sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",          // Added for Pie Chart Model
    "sap/ui/core/format/NumberFormat",      // Added for _formatCurrency
    "sap/ui/core/format/DateFormat",        // Added for _formatDate
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Image",
    "sap/m/MessageBox"
], (Controller, JSONModel, NumberFormat, DateFormat, Dialog, Button, Image, MessageBox) => { // Added JSONModel, NumberFormat, DateFormat to arguments
    "use strict";

    return Controller.extend("openar.controller.View1", {
        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteView1").attachPatternMatched(this._onPatternMatched, this);
            var oModel = this.getOwnerComponent().getModel();
            const oView = this.getView();
            const oSmartFilterBar = oView.byId("bar0");
            // // Fetch User Data and Logo
            // const oUserModel = this.getOwnerComponent().getModel("userModel");
            // const userData = oUserModel ? oUserModel.getData() : {};
            // const mfgNumber = userData.ManufacturerNumber;

            // const oLogoModel = this.getOwnerComponent().getModel("logo");

            // var sAppPath = sap.ui.require.toUrl("openar").split("/resources")[0];
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
            oView.setBusy(true);

            // Filter Bar Initialization
            if (oSmartFilterBar) { // Check if SmartFilterBar exists
                 oSmartFilterBar.attachInitialized(function () {
                    oView.setBusy(false); // Once filter bar + value helps are ready
                 });
            } else {
                 console.error("SmartFilterBar with ID 'bar0' not found.");
                 oView.setBusy(false); // Still release busy state
            }

            debugger
            // Smart Table and Inner Table Setup
            const oSmartTable = oView.byId("table0");
            if (oSmartTable) {
                 const oTable = oSmartTable.getTable(); // Get the inner UI5 Table from SmartTable

                 if (oTable) {
                      this.bAuthorizationErrorShown = false;

                      // Attach Request Failed handler to the main OData model
                      if (oModel) {
                         oModel.attachRequestFailed((oEvent) => { // Use arrow function to keep 'this' context
                              var oParams = oEvent.getParameters();
                              // Check specifically for 403 Forbidden status
                              if (oParams.response && oParams.response.statusCode === 403) { // Check status code directly
                                 oTable.setNoData("No data available due to authorization restrictions");
                                 oTable.setBusy(false);
                                 if (!this.bAuthorizationErrorShown) {
                                      this.bAuthorizationErrorShown = true;
                                      MessageBox.error("You do not have the required permissions to access this report.", {
                                          title: "Unauthorized Access",
                                          id: "messageBoxId1", // Consider making IDs unique if multiple instances
                                          details: "Permission is required to access this report. Please contact your administrator if you believe this is an error or require access.",
                                          // contentWidth: "100px" // Content width is usually determined by content
                                      });
                                 }
                              } else {
                                   // Handle other request failures if necessary
                                   console.error("OData request failed:", oParams.response);
                                   // Optionally show a generic error message
                              }
                         }, this); // Pass 'this' context
                      } else {
                           console.error("Main OData Model not found.");
                      }



                      // Set main model ONLY on the inner table if using SmartTable features
                      // oTable.setModel(oModel); // Often not needed; SmartTable handles model propagation. Remove if SmartTable binds itself.

                      // Attach the rowsUpdated event to the inner table
                      oTable.attachEvent("rowsUpdated", this._calculateFooterAndSummary.bind(this));

                 } else {
                      console.error("Inner table within SmartTable 'table0' not found.");
                      oView.setBusy(false);
                 }
            } else {
                 console.error("SmartTable with ID 'table0' not found.");
                 oView.setBusy(false);
            }
        },
        _refreshUserModel: async function () {
            const oUserModel = this.getOwnerComponent().getModel("userModel");
            var sAppPath = sap.ui.require.toUrl("openar").split("/resources")[0];
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
        
            var sAppPath = sap.ui.require.toUrl("openar").split("/resources")[0];
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
        // REMOVED _onTableUpdate as rowsUpdated is attached in onInit

        // Calculate Footer and Summary Panel (INCLUDING PIE CHART DATA)
        _calculateFooterAndSummary: function () {
            // **Important:** Get the inner table from the SmartTable
            
            var oSmartTable = this.byId("table0");
            if (!oSmartTable) {
                 console.error("SmartTable 'table0' not found in _calculateFooterAndSummary.");
                 return;
            }
            var oTable = oSmartTable.getTable(); // Get the UI5 Table
             if (!oTable) {
                 console.error("Inner table not found in _calculateFooterAndSummary.");
                 return;
            }

            var oBinding = oTable.getBinding("rows");

            // Check if binding and contexts are ready
            if (!oBinding || !oBinding.getLength()) {
                 console.warn("Table binding 'rows' not ready or has zero length in _calculateFooterAndSummary.");
                 // Optional: Clear previous summary data if needed
                 // this._clearSummaryData();
                 return;
            }

            var aContexts = oBinding.getContexts(0, oBinding.getLength());
            if (!aContexts || aContexts.length === 0) {
                 console.log("No contexts available in _calculateFooterAndSummary.");
                  // Optional: Clear previous summary data if needed
                 // this._clearSummaryData();
                 return; // No data to process
            }

            // --- Start Calculation ---
            var totals = {
                fTotCurrent: 0, fTot1to30: 0, fTot31to60: 0, fTot61to90: 0,
                fTotOver90: 0, fTotInvoice: 0, fTotAmountPaid: 0
            };

            aContexts.forEach(function (oContext) {
                totals.fTotCurrent += this._getValueOrZero(oContext, "CAL_CURRENT");
                totals.fTot1to30 += this._getValueOrZero(oContext, "CAL_1_30");
                totals.fTot31to60 += this._getValueOrZero(oContext, "CAL_31_60");
                totals.fTot61to90 += this._getValueOrZero(oContext, "CAL_61_90");
                totals.fTotOver90 += this._getValueOrZero(oContext, "CAL_OVER_90");
                totals.fTotInvoice += this._getValueOrZero(oContext, "NETWR_VBRK");
                totals.fTotAmountPaid += this._getValueOrZero(oContext, "TSL_CLEARED");
            }, this);

            // --- Update Footer ---
            Object.keys(totals).forEach(function (key) {
                var footerIndex = this._getFooterIndex(key);
                if (footerIndex > 0) { // Ensure mapping exists
                     var oFooterText = this.byId("footerText" + footerIndex);
                     if (oFooterText) {
                         var formattedValue = this._formatCurrency(totals[key]);
                         oFooterText.setText(formattedValue);
                     } else {
                          console.warn("Footer text element 'footerText" + footerIndex + "' not found for key: " + key);
                     }
                }
            }, this);
            var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle(); 
            // --- Prepare and Set Data for VizFrame Pie Chart ---
            var aPieChartData = [
                { BucketName: oBundle.getText("OPENAR.CURRENTGRAPH"), Amount: totals.fTotCurrent },
                { BucketName: oBundle.getText("OPENAR.1_to_30"), Amount: totals.fTot1to30 },
                { BucketName: oBundle.getText("OPENAR.31_to_60"),Amount: totals.fTot31to60 },
                { BucketName: oBundle.getText("OPENAR.61_to_90"),Amount: totals.fTot61to90 },
                { BucketName: oBundle.getText("OPENAR.OVER_90"),   Amount: totals.fTotOver90 }
            ];

            // Filter out zero values if desired (optional)
            // aPieChartData = aPieChartData.filter(item => item.Amount !== 0);

            var oPieModel = this.getView().getModel("pieChartModel");
            if (!oPieModel) {
                oPieModel = new JSONModel();
                this.getView().setModel(oPieModel, "pieChartModel");
            }
            oPieModel.setData({ agingData: aPieChartData });
            // --- End VizFrame Pie Chart Data Setup ---


            // --- REMOVED Donut chart specific logic ---
            /*
            var donutValues = [ ... ];
            var totalDonut = donutValues.reduce((sum, value) => sum + value, 0);
            var percentages = totalDonut === 0 ? [0, 0, 0, 0, 0] : donutValues.map(value => (value / totalDonut) * 100);
            this._updateDonutChart(percentages); // <-- REMOVED call
            */

            // --- Update Other Summary Metrics (Keep these) ---
            this._updatePastDue(aContexts);
            this._updateBalanceOwed(totals.fTotInvoice, totals.fTotAmountPaid);
            this._updateOpenInvoices(aContexts);
            // Pass the inner table (oTable) not the SmartTable (oSmartTable) if _updateAvgAge needs it
            this._updateAvgAge(oTable);


            // --- REMOVED MicroChart data model setup ---
            /*
            var oChartModel = new JSONModel({ agingBuckets: [ ... ] });
            this.getView().setModel(oChartModel, "microchart"); // <-- REMOVED model setting
            */
        },

        // Helper function to get value or return zero if undefined/null
        _getValueOrZero: function (oContext, sProperty) {
            var value = oContext.getProperty(sProperty);
            // Check for null/undefined before parsing
            return (value !== null && value !== undefined) ? parseFloat(value) : 0;
        },

        // Helper function to format currency
        _formatCurrency: function (value) {
             if (value == null) { // Check for null or undefined explicitly
                 return "";
             }
             // Using standard NumberFormat - simpler and more robust
             // Ensure NumberFormat is imported in sap.ui.define
             try {
                  const oCurrencyFormat = NumberFormat.getCurrencyInstance({
                       currencyCode: false, // Don't display currency code like USD/CAD by default
                       groupingEnabled: true,
                       showMeasure: false // Typically don't show the code ($/€) if currencyCode is false
                  });
                  // Handle potential NaN values after parseFloat
                  return isNaN(value) ? "" : oCurrencyFormat.format(value);
             } catch(e) {
                  console.error("Error formatting currency:", e);
                  return String(value); // Fallback to string representation
             }
        },


        // Helper function to update footer text index (Maps keys to numbers)
        _getFooterIndex: function (key) {
            var mapping = {
                fTotCurrent: 1, fTot1to30: 2, fTot31to60: 3,
                fTot61to90: 4, fTotOver90: 5, fTotInvoice: 6,
                fTotAmountPaid: 7
            };
            return mapping[key] || 0; // Return 0 if key not found
        },

        // --- REMOVED _updateDonutChart function ---
        /*
        _updateDonutChart: function (percentages) { ... }
        */

        // --- Keep Other Helper/Update Functions ---

        // Calculate the Past Due Amount
        _updatePastDue: function (aContexts) {
            var totalPastDue = 0;
            var currentDate = new Date(); // Get current date once
            currentDate.setHours(0, 0, 0, 0); // Set to midnight for consistent comparison

            aContexts.forEach((oContext) => { // Use arrow function
                var oData = oContext.getObject();
                // Ensure NETDT exists and is valid before formatting
                if (oData && oData.NETDT) {
                     var dueDate = this._parseDate(oData.NETDT); // Use a dedicated parsing function
                     var balance = (oData.NETWR_VBRK || 0) - (oData.TSL_CLEARED || 0);

                     // Check if dueDate is valid, past, and balance > 0
                     if (dueDate && dueDate < currentDate && balance > 0) {
                          totalPastDue += balance;
                     }
                }
            }, this);

            var totPastDueText = this._formatAmount(totalPastDue); // Use K/M formatter
            var oNumericContent = this.byId("_IDGenNumericContent2");
             if(oNumericContent) oNumericContent.setText(totPastDueText); // Use setValue for NumericContent
        },

        // Calculate Balance Owed
        _updateBalanceOwed: function (invoice, paid) {
            var balanceOwed = (invoice || 0) - (paid || 0);
            var formattedBalance = this._formatAmount(balanceOwed); // Use K/M formatter
            var oNumericContent = this.byId("_IDGenNumericContent1");
            if(oNumericContent) oNumericContent.setText(formattedBalance);
        },

        // Calculate Open Invoices Count
        _updateOpenInvoices: function (aContexts) {
            var openInvoiceCount = aContexts.filter((oContext) => { // Use arrow function
                var oData = oContext.getObject();
                // Ensure properties exist before calculation
                 if (oData) {
                     var balance = (oData.NETWR_VBRK || 0) - (oData.TSL_CLEARED || 0);
                     return balance > 0;
                 }
                 return false;
            }).length;

             var oNumericContent = this.byId("_IDGenNumericContent5");
             if(oNumericContent) oNumericContent.setText(openInvoiceCount); // Use setValue for counts
        },

        // Calculate Average Age of Open Invoices (using inner table reference)
        _updateAvgAge: function (oTable) { // Accepts the inner UI5 Table
            if (!oTable) return; // Guard clause

            var oBinding = oTable.getBinding("rows");
            if (!oBinding || !oBinding.getLength()) return;

            var aContexts = oBinding.getContexts(0, oBinding.getLength());
            if (!aContexts || aContexts.length === 0) return;

            // Filter for open invoices first
            var aOpenInvoiceContexts = aContexts.filter(oContext => {
                 var oData = oContext.getObject();
                 return oData && ((oData.NETWR_VBRK || 0) - (oData.TSL_CLEARED || 0) > 0);
            });

            if (aOpenInvoiceContexts.length === 0) {
                 // Handle case with no open invoices
                 var oNumericContent = this.byId("_IDGenNumericContent4");
                 if(oNumericContent) oNumericContent.setText("0.0"); // Or "-" or ""
                 return;
            }

            var totalAge = aOpenInvoiceContexts.reduce((sum, oContext) => {
                 var oData = oContext.getObject();
                return sum + (oData && oData.CAL_AGE ? parseFloat(oData.CAL_AGE) : 0);
            }, 0);

            var avgAge = totalAge / aOpenInvoiceContexts.length;

            var oNumericContent = this.byId("_IDGenNumericContent4");
             if(oNumericContent) oNumericContent.setText(avgAge.toFixed(1));
        },

        // Format Amount in K/M format
        _formatAmount: function (amount) {
             if (amount == null) return "$0.00"; // Handle null/undefined
             amount = parseFloat(amount); // Ensure it's a number
             if (isNaN(amount)) return "$0.00"; // Handle NaN

             if (Math.abs(amount) >= 1e6) return "$" + (amount / 1e6).toFixed(1) + 'M'; // Use 1 decimal for K/M
             if (Math.abs(amount) >= 1e3) return "$" + (amount / 1e3).toFixed(1) + 'K';
             return "$" + amount.toFixed(2); // Default to 2 decimals
        },

         // Dedicated Date Parsing (handles YYYYMMDD string or Date object)
         _parseDate: function (dateInput) {
             if (!dateInput) return null;

             let oDate = null;

             if (typeof dateInput === "string" && dateInput.length === 8 && /^\d{8}$/.test(dateInput)) {
                 // Try parsing YYYYMMDD string -> Date object in UTC
                 const year = dateInput.substring(0, 4);
                 const month = dateInput.substring(4, 6);
                 const day = dateInput.substring(6, 8);
                 // Create date as UTC to avoid timezone issues during parsing
                 oDate = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)));
             } else if (dateInput instanceof Date) {
                 // If it's already a Date object, clone it and set to UTC midnight
                 oDate = new Date(Date.UTC(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate()));
             }

             // Check if the resulting date is valid
             if (oDate && !isNaN(oDate.getTime())) {
                 return oDate;
             } else {
                  console.warn("Could not parse date:", dateInput);
                 return null; // Return null for invalid or unparseable dates
             }
         },

         // --- Keep Invoice Click/Display Logic ---
        onInvoiceClick: function (oEvent) {
            // Get invoice number safely
            const sInvoiceNumber = oEvent.getSource() ? oEvent.getSource().getText() : null;
            if (!sInvoiceNumber) {
                console.error("Could not get invoice number from event source.");
                sap.m.MessageToast.show("Cannot load invoice details.");
                return;
            }

            // Mock API Call (Keep as is or replace with real service call)
            const sMockAPI = `/mock-api/invoices/${sInvoiceNumber}`; // Replace with actual service if needed
            this._fetchInvoiceImage(sMockAPI)
                .then((sImageUrl) => {
                     if (sImageUrl) { // Check if URL is valid before showing dialog
                          this._showInvoiceDialog(sImageUrl, sInvoiceNumber); // Pass invoice number for title/download name
                     } else {
                          throw new Error("Invalid image URL received.");
                     }
                 })
                .catch((err) => {
                    console.error("Error fetching/showing invoice:", err);
                    sap.m.MessageToast.show(`Failed to load invoice ${sInvoiceNumber}.`);
                });
        },

        _fetchInvoiceImage: function (sUrl) {
            // Simulate API response (Replace with actual fetch/ajax call)
             console.log("Fetching invoice image from:", sUrl); // Log the URL being called
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate success/failure
                    // const success = Math.random() > 0.1; // Simulate 10% failure rate
                    // if (success) {
                       resolve("https://via.placeholder.com/600x800.png?text=Invoice+Image"); // Example URL
                    // } else {
                    //    reject(new Error("Simulated API failure for invoice image."));
                    // }
                }, 500); // Simulate network delay
            });
            /* // Example using actual fetch:
            return fetch(sUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    // Assuming the API returns JSON with an 'imageUrl' property
                    return response.json();
                })
                .then(data => data.imageUrl) // Adjust based on actual API response structure
                .catch(error => {
                    console.error('Fetching invoice image failed:', error);
                    throw error; // Re-throw to be caught by the caller
                });
            */
        },

         _showInvoiceDialog: function (sImageUrl, sInvoiceNumber) {
             // Dispose previous dialog if it exists to prevent memory leaks
             if (this.oInvoiceDialog) {
                 this.oInvoiceDialog.destroy();
             }

             this.oInvoiceDialog = new Dialog({ // Store dialog reference on controller
                 title: `Invoice ${sInvoiceNumber || ''}`,
                 contentWidth: "auto", // Let content determine width
                 contentHeight: "70%", // Limit height, make scrollable
                 verticalScrolling: true,
                 content: new Image({
                      src: sImageUrl,
                      width: "100%", // Fit width
                      densityAware: false, // Prevent potential scaling issues with placeholders
                      decorative: false, // Important for accessibility
                      alt: `Image for Invoice ${sInvoiceNumber || ''}` // Add descriptive alt text
                 }),
                 buttons: [
                     new Button({
                         text: "Download",
                         icon: "sap-icon://download", // Add icon
                         press: () => this._downloadImage(sImageUrl, `Invoice_${sInvoiceNumber || 'Image'}.png`) // Pass filename
                     }),
                     new Button({
                         text: "Print",
                         icon: "sap-icon://print", // Add icon
                         press: () => this._printImage(sImageUrl)
                     }),
                     new Button({
                         text: "Close",
                         type: sap.m.ButtonType.Emphasized, // Emphasize close
                         press: () => {
                             this.oInvoiceDialog.close();
                         }
                     })
                 ],
                 afterClose: () => {
                     // Clean up dialog instance after closing
                     if (this.oInvoiceDialog) {
                           this.oInvoiceDialog.destroy();
                           this.oInvoiceDialog = null; // Remove reference
                     }
                 }
             });
             this.oInvoiceDialog.open();
         },


        _downloadImage: function (sImageUrl, sFileName) {
             const oLink = document.createElement("a");
             oLink.href = sImageUrl;
             // Use a safe filename, replace invalid characters if needed
             oLink.download = sFileName || "invoice_image.png";
             // Append link to body to ensure it works in all browsers (especially Firefox)
             document.body.appendChild(oLink);
             oLink.click();
             // Clean up by removing the link
             document.body.removeChild(oLink);
        },

        _printImage: function (sImageUrl) {
             try {
                 const printWindow = window.open("", "_blank", "height=600,width=800"); // Open in new tab/window
                 if (!printWindow) {
                      MessageBox.warning("Could not open print window. Please check your browser's pop-up settings.");
                      return;
                 }
                 printWindow.document.write('<html><head><title>Print Invoice</title>');
                 // Optional: Add basic styles for printing
                 printWindow.document.write('<style>@media print { body { margin: 0; } img { max-width: 100%; height: auto; display: block; } }</style>');
                 printWindow.document.write('</head><body>');
                 printWindow.document.write(`<img src='${sImageUrl}' onload='window.print(); window.close();' onerror='window.close(); alert("Could not load image for printing.");' />`); // Print/close on load or error
                 printWindow.document.write('</body></html>');
                 printWindow.document.close(); // Needed for some browsers
             } catch (e) {
                 console.error("Error opening print window:", e);
                 MessageBox.error("Could not open print window. Please try again or check browser settings.");
             }
        }

    });

    // REMOVED duplicate sap.ui.define block at the end
});