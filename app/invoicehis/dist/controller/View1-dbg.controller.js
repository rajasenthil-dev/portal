sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/NumberFormat",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Image",
    "sap/m/MessageBox",
    'sap/ui/core/BusyIndicator',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
], (Controller, JSONModel, NumberFormat, Dialog, Button, Image, MessageBox, BusyIndicator, Filter, FilterOperator) => {
    "use strict";

    const sResponsivePaddingClasses = "sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer";
    const decimalProperties = ["TSL_AMOUNT", "CAL_PST", "CAL_GST"]; // Footer sums
    const summarySalesProperty = "TSL_AMOUNT"; // Total sales for summary
    const uniqueInvoiceProperty = "VBELN";
  
    return Controller.extend("invoicehistory.controller.View1", {
  
        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteView1").attachPatternMatched(this._onPatternMatched, this);
            BusyIndicator.show();
            const oModel = this.getOwnerComponent().getModel();
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
                text: oBundle.getText("INVOICEHISTORY.CURRENTTEXT"),
                icon: "sap-icon://circle-task-2",
                state: "Success",
                inverted:true,
                tooltip: oBundle.getText("INVOICEHISTORY.CURRENTTOOLTIP")
                //tooltip:"Captured from the new system post-migration and is up-to-date."
            })
            oCurrentStatus.addStyleClass("sapUiTinyMarginEnd");
            var oCurrentStatusText =  new sap.m.Text({
                text: " | "
            })
            oCurrentStatusText.addStyleClass("text-bold sapUiTinyMarginEnd");
            var oLegacyStatus = new sap.m.ObjectStatus({
                text: oBundle.getText("INVOICEHISTORY.LEGACYTEXT"),
                icon: "sap-icon://circle-task-2",
                state: "Information",
                inverted:true,
                tooltip: oBundle.getText("INVOICEHISTORY.LEGACYTOOLTIP")
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
  
            oModel.attachRequestFailed(this._handleAuthorizationError.bind(this, oTable));
            oTable.attachEvent("rowsUpdated", this._calculateTotals.bind(this));
            
    },     
    _refreshUserModel: async function () {
        const oUserModel = this.getOwnerComponent().getModel("userModel");
        var sAppPath = sap.ui.require.toUrl("invoicehis").split("/resources")[0];
        if (sAppPath === ".") {
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
    
        var sAppPath = sap.ui.require.toUrl("invoicehis").split("/resources")[0];
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
      _handleAuthorizationError: function (oTable, oEvent) {
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
      },
  
      _calculateTotals: function () {
        
        const oSmartTable = this.getView().byId("table0");
        const oTable = oSmartTable.getTable();
        const oBinding = oTable.getBinding("rows");
  
        if (!oBinding) {
          console.warn("Table binding is missing.");
          return;
        }
  
        const aContexts = oBinding.getContexts(0, oBinding.getLength());
        if (!aContexts) {
          console.warn("Data is not available for calculation.");
          return;
        }
        const totals = aContexts.reduce((acc, oContext) => {
          const oData = oContext.getObject();
          if (!oData) return acc;
  
          acc.totalInvoices++;
          acc.uniqueInvoices.add(oData[uniqueInvoiceProperty]);
          decimalProperties.forEach(prop => {
            acc[prop] += parseFloat(oData[prop] || 0);
          });
  
          return acc;
        }, {
          totalInvoices: 0,
          uniqueInvoices: new Set(),
          TSL_AMOUNT: 0,
          CAL_PST: 0,
          CAL_GST: 0
        });
  
        this._updateTile("TileContent1", this.formatLargeNumber(totals.TSL_AMOUNT));
        this._updateTile("TileContent2", totals.uniqueInvoices.size);
        this._updateTile("FooterContent1", this._formatCurrency(totals.TSL_AMOUNT, "USD"));
        this._updateTile("FooterContent2", this._formatCurrency(totals.CAL_PST, "USD"));
        this._updateTile("FooterContent3", this._formatCurrency(totals.CAL_GST, "USD"));
        
    },
  
      _updateTile: function (sTileId, value) {
        const oTile = this.byId(sTileId);
        if (oTile) {
          oTile.setText(value);
        } else {
          console.warn(`Tile with ID ${sTileId} not found.`);
        }
        BusyIndicator.hide();
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
         * Format large numbers for summary panel.
         * Converts 233594532.19 to $233M, 2321980.45 to $2.32M, etc.
         */
        formatLargeNumber: function (value) {
            if (value >= 1e6) {
                return `$${(value / 1e6).toFixed(2)}M`;
            } else if (value >= 1e3) {
                return `$${(value / 1e3).toFixed(2)}K`;
            }
            return `$${value.toFixed(2)}`;
        },
        _formatRowHighlight: function (oValue) {
			// Your logic for rowHighlight goes here
			if (oValue === "N") {
				return "Information";
            }
			return "Success";
		},
        
        // onFilterChange: function () {
        //     const table = this.getView().byId("table");
        //     const data = table.getBinding("rows").getContexts().map(context => context.getObject());

        //     // Reset totals to 0
        //     const oFooterCountsModel = this.getView().getModel('footerCounts');
        //     const oTileCountsModel = this.getView().getModel('summaryCounts');
        //     const resetFTotals = {
        //         "UniqueInvoices": 0,
        //         "TotalSales": 0,
        //         "TotalSalesFormatted": 0
        //     };
        //     const resetSTotals = {
        //         "TSL_AMOUNT": 0,
        //         "CAL_PST": 0,
        //         "CAL_GST": 0
        //     };
        //     oFooterCountsModel.setData(resetFTotals);
        //     oTileCountsModel.setData(resetSTotals)
        //     // Recalculate totals
        //     this.updateCalculations(data);
        // },
        // _updateFooter: function (totalSales, totalPST, totalGST) {
        //     const oTable = this.byId("table");
        //     const oFooterData = {
        //         sales: this._formatCurrency(totalSales),
        //         pst: this._formatCurrency(totalPST),
        //         gst: this._formatCurrency(totalGST)
        //     };

        //     // Assuming footer is rendered with custom rows or JSON binding
        //     const oFooterModel = new JSONModel(oFooterData);
        //     oTable.setModel(oFooterModel, "footer");
        // },

        formatLargeNumber: function (value) {
            const oNumberFormat = NumberFormat.getFloatInstance({
                style: "short",
                minFractionDigits: 0,
                maxFractionDigits: 1
            });
            return oNumberFormat.format(value);
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
        _removeLeadingZeros: function(sku) {
            return sku ? String(parseInt(sku, 10)) : sku;   
        },
        _formatNumberSuffix : function (value, isDollarAmount = true) {
            if (typeof value !== "number") {
                return value;
            }

            var absValue = Math.abs(value);
            let formattedValue;

            if (absValue >= 1_000_000) {
                if (isDollarAmount){
                    formattedValue = (value / 1_000_000).toFixed(2) + "M";
                }
                formattedValue = (value / 1_000_000) + "M";
            } else if (absValue >= 1_000) {
                if (isDollarAmount) {
                    formattedValue = (value / 1_000).toFixed(2) + "K"
                }
                formattedValue = (value / 1_000) + "K"
            } else {
                if (isDollarAmount) {
                    formattedValue = formattedValue.toFixed(2);
                }
                formattedValue = value
            }

            return formattedValue;
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