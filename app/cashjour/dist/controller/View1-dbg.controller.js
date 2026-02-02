sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Image",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
	"sap/ui/core/syncStyleClass",
    "sap/m/MessageToast",
    "sap/ui/model/resource/ResourceModel"
], (Controller, Dialog, Button, Image, MessageBox,Fragment, syncStyleClass, MessageToast, ResourceModel) => {
    "use strict";

    return Controller.extend("cashjour.controller.View1", {
        onInit: async function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteView1").attachPatternMatched(this._onPatternMatched, this);
            var oModel = this.getOwnerComponent().getModel();
            const oView = this.getView();
            const oSmartFilterBar = oView.byId("bar0");
            const oTable = oView.byId("table")
            oView.setBusy(true);
        
            oSmartFilterBar.attachInitialized(function () {
                oView.setBusy(false); // Once filter bar + value helps are ready
            });
            const oSmartTable = this.getView().byId("table0");
            // var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            // var oToolbar = oSmartTable.getToolbar();
            // var oCurrentStatus = new sap.m.ObjectStatus({
            //     text: oBundle.getText("CASHJOURNAL.CURRENTTEXT"),
            //     icon: "sap-icon://circle-task-2",
            //     state: "Success",
            //     inverted:true,
            //     tooltip: oBundle.getText("CASHJOURNAL.CURRENTTOOLTIP")
            // })
            // oCurrentStatus.addStyleClass("sapUiTinyMarginEnd");
            // var oCurrentStatusText =  new sap.m.Text({
            //     text: " | "
            // })
            // oCurrentStatusText.addStyleClass("text-bold sapUiTinyMarginEnd");
            // var oLegacyStatus = new sap.m.ObjectStatus({
            //     text: oBundle.getText("CASHJOURNAL.LEGACYTEXT"),
            //     icon: "sap-icon://circle-task-2",
            //     state: "Information",
            //     inverted:true,
            //     tooltip: oBundle.getText("CASHJOURNAL.LEGACYTOOLTIP")
            // })
            // oLegacyStatus.addStyleClass("sapUiTinyMarginEnd")
            // var oLegacyStatusText =  new sap.m.Text({
            //     text: "Legacy Data"
            // })
            // oLegacyStatusText.addStyleClass("text-bold sapUiTinyMarginEnd")
            // var oLegendTitle = new sap.m.Text({
            //     text: "Legend:"
            // })
            // oLegendTitle.addStyleClass("text-bold sapUiTinyMarginEnd");
            // var oLegendBox = new sap.m.HBox({
            //     items: [
            //         oCurrentStatus,
            //         oCurrentStatusText,
            //         oLegacyStatus
                    
            //     ],
            //     alignItems: "Center",
            //     justifyContent: "End"
            // });

            // oToolbar.addContent(new sap.m.ToolbarSpacer());
            // oToolbar.addContent(oLegendBox);
            // const oTable = oSmartTable.getTable();
            // this.bAuthorizationErrorShown = false;
            // oModel.attachRequestFailed(function (oEvent) {
            //     var oParams = oEvent.getParameters();
            //     if (oParams.response.statusCode === "403") {
            //         oTable.setNoData("No data available due to authorization restrictions");
            //         oTable.setBusy(false)    
            //         if(!this.bAuthorizationErrorShown) {
            //             this.bAuthorizationErrorShown = true;
            //             MessageBox.error("You do not have the required permissions to access this report.", {
            //                 title: "Unauthorized Access",
            //                 id: "messageBoxId1",
            //                 details: "Permission is required to access this report. Please contact your administrator if you believe this is an error or require access.",
            //                 contentWidth: "100px",
            //             });
                    
            //         }
            //     }
            // });
              // Access the underlying table
            
            this._debouncedCalculateTotals = this._debounce(this._calculateTotals.bind(this), 300);
            oTable.attachEvent("rowsUpdated", this._debouncedCalculateTotals);
            // // Fetch User Data and Logo
            // const oUserModel = this.getOwnerComponent().getModel("userModel");
            // const userData = oUserModel ? oUserModel.getData() : {};
            // const mfgNumber = userData.ManufacturerNumber;

            // const oLogoModel = this.getOwnerComponent().getModel("logo");

            // var sAppPath = sap.ui.require.toUrl("cashjour").split("/resources")[0];
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
            var sAppPath = sap.ui.require.toUrl("cashjour").split("/resources")[0];
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
        
            var sAppPath = sap.ui.require.toUrl("cashjour").split("/resources")[0];
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
        // onSearch: function () {
        //     const oSmartFilterBar = this.getView().byId("bar0");
        //     const oSmartTable = this.getView().byId("table0");
        //     const oBinding = oSmartTable.getTable().getBinding("rows");
        
        //     if (!oBinding) {
        //         console.warn("Table binding is missing.");
        //         return;
        //     }
        
        //     // Get selected value from the filter
        //     let sCurrentStatus = this.getView().byId("currentFilterBox").getSelectedKey();
        
        //     // Build the filter condition
        //     let aFilters = [];
        //     if (sCurrentStatus) {
        //         aFilters.push(new sap.ui.model.Filter("CURRENT", sap.ui.model.FilterOperator.Contains, sCurrentStatus));
        //     }
        
        //     // Apply the filter
        //     oBinding.filter(aFilters);
        // },
        onOpenDialog: function () {
			// load BusyDialog fragment asynchronously
			if (!this._pBusyDialog) {
				this._pBusyDialog = Fragment.load({
					name: "cashjour.view.BusyDialog",
					controller: this
				}).then(function (oBusyDialog) {
					this.getView().addDependent(oBusyDialog);
					syncStyleClass("sapUiSizeCompact", this.getView(), oBusyDialog);
					return oBusyDialog;
				}.bind(this));
			}

			this._pBusyDialog.then(function(oBusyDialog) {
				oBusyDialog.open();
			}.bind(this));
		},
        onCloseDialog: function () {
            var oBusyDialog = this.getView().byId("busyDialog");
            oBusyDialog.close();
        },
        _calculateTotals: function (oEvent) {
            var oSmartTable = this.getView().byId("table0");
            var oTable = oSmartTable.getTable();
            var oBinding = oTable.getBinding("rows"); // For GridTable
            var aContexts = oBinding.getContexts(0, oBinding.getLength()); // Get all contexts binding
            
            // Ensure that the binding exists and is set up
            if (oBinding) {
                var fTotalNetWr = 0;   // Total for NETWR (Invoice Amount)
                var fTotalCashReceived = 0;  // Total for CAL_CASH_RECEIVED (Cash Received)
                var fTotalDiscount = 0;  // Total for CAL_CASH_RECEIVED (Cash Received)
        
                // Iterate through the rows to sum the values
                aContexts.forEach(function (oContext) {
                    fTotalNetWr += parseFloat(oContext.getProperty("CAL_INV_AMOUNT")) || 0;
                    fTotalCashReceived += parseFloat(oContext.getProperty("CAL_CASH_RECEIVED")) || 0;
                    fTotalDiscount += parseFloat(oContext.getProperty("CAL_DISCOUNT")) || 0;
                });
                var formattedNetWr = this._formatCurrency(fTotalNetWr);
                var formattedCashReceived = this._formatCurrency(fTotalCashReceived);
                var formattedDiscount = this._formatCurrency(fTotalDiscount);
                // Update footer with the calculated totals
                
                this.byId("TotUnitsPriceText").setText(formattedNetWr);
                this.byId("TotUnitsInStockText").setText(formattedCashReceived);
                this.byId("TotUnitsOnOrderText").setText(formattedDiscount);
            }
            
        },
        _debounce: function(func, wait) {
            let timeout;
            return function (...args) {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
            
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