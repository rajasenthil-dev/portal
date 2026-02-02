sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageBox",
    "sap/ui/model/resource/ResourceModel"
], (Controller, JSONModel, BusyIndicator, MessageBox, ResourceModel) => {
    "use strict";

    return Controller.extend("invaudittrail.controller.View1", {
        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteView1").attachPatternMatched(this._onPatternMatched, this);
            var oModel = this.getOwnerComponent().getModel();
            const oView = this.getView();
            const oSmartFilterBar = oView.byId("bar0");
        
            oView.setBusy(true);

            // oSmartFilterBar.attachSearch(() => {
            //     this._loadInventoryAuditSummary();
            // });
            oSmartFilterBar.attachInitialized(function () {
                oView.setBusy(false); // Once filter bar + value helps are ready
            });
            var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            const oSmartTable = this.getView().byId("table0");
            var oToolbar = oSmartTable.getToolbar();
            var oCurrentStatus = new sap.m.ObjectStatus({
                text: oBundle.getText("INVENTORYAUDITTRAIL.CURRENTTEXT"),
                icon: "sap-icon://circle-task-2",
                state: "Success",
                inverted:true,
                tooltip: oBundle.getText("INVENTORYAUDITTRAIL.CURRENTTOOLTIP")
            })
            oCurrentStatus.addStyleClass("sapUiTinyMarginEnd");
            var oCurrentStatusText =  new sap.m.Text({
                text: " | "
            })
            oCurrentStatusText.addStyleClass("text-bold sapUiTinyMarginEnd");
            var oLegacyStatus = new sap.m.ObjectStatus({
                text: oBundle.getText("INVENTORYAUDITTRAIL.LEGACYTEXT"),
                icon: "sap-icon://circle-task-2",
                state: "Information",
                inverted:true,
                tooltip: oBundle.getText("INVENTORYAUDITTRAIL.LEGACYTOOLTIP")
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
            // Initialize a model for tile counts
            var oTileCountsModel = new JSONModel({
                counts: {
                    Order: 0,
                    Receipt: 0,
                    Adjustments: 0,
                    Returns: 0,
                    PhysicalCount: 0
                }
            });
            this.getView().setModel(oTileCountsModel, "transactionCounts");
            
            // Get the SmartTable and bind the data change event
            oTable.attachEvent("rowsUpdated", this._onRowsUpdated.bind(this));
           

            // // Fetch User Data and Logo
            // const oUserModel = this.getOwnerComponent().getModel("userModel");
            // const userData = oUserModel ? oUserModel.getData() : {};
            // const mfgNumber = userData.ManufacturerNumber;

            // const oLogoModel = this.getOwnerComponent().getModel("logo");

            // var sAppPath = sap.ui.require.toUrl("invaudittrail").split("/resources")[0];
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
         _onRowsUpdated: function () {
            const oSmartTable = this.byId("table0");
            const oTable = oSmartTable.getTable();
            const oBinding = oTable.getBinding("rows");
            if (!oBinding) return;

            const aContexts = oBinding.getContexts();
            if (!aContexts.length) return;

            const firstRow = aContexts[0]?.getObject()?._Totals;
            if (!firstRow) return;
            console.log(firstRow)

            // --- Update UI tiles ---
            // this.byId("_IDGenNumericContent1").setText(this._formatNumber(firstRow.OrderTotal));
            // this.byId("_IDGenNumericContent2").setText(this._formatNumber(firstRow.ReceiptTotal));
            // this.byId("_IDGenNumericContent3").setText(this._formatNumber(firstRow.AdjustmentsTotal));
            // this.byId("_IDGenNumericContent4").setText(this._formatNumber(firstRow.ReturnsTotal));
            // this.byId("_IDGenNumericContent5").setText(this._formatNumber(firstRow.PhysicalCountTotal));

            // --- Update footer if needed ---
            this.byId("footerText1").setText(this._formatNumber(firstRow.GrandTotal || 0));

            // --- Generate badges from totals ---
            this._updateTransactionBadges(firstRow);
        },
         _refreshUserModel: async function () {
            const oUserModel = this.getOwnerComponent().getModel("userModel");
            var sAppPath = sap.ui.require.toUrl("invaudittrail").split("/resources")[0];
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
        
            var sAppPath = sap.ui.require.toUrl("invaudittrail").split("/resources")[0];
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
         
        _calculateTotals: function () {
            var oSmartTable = this.getView().byId("table0");
            var oTable = oSmartTable.getTable();
            var oBinding = oTable.getBinding("rows");

            var aContexts = oBinding.getContexts(0, oBinding.getLength());
            var oTileCounts = {
                Order: 0,
                Receipt: 0,
                Adjustments: 0,
                Returns: 0,
                PhysicalCount: 0
            };
            var fTotalQuantity = 0;
            
            aContexts.forEach(function (oContext) {
                fTotalQuantity += parseFloat(oContext.getProperty("STOCK_QTY")) || 0;
                var oData = oContext.getObject();
                if (oData.TRAN_TYPE && oData.STOCK_QTY) {
                    var iQuantity = parseFloat(oData.STOCK_QTY);
                    if (!isNaN(iQuantity)){
                        switch (oData.TRAN_TYPE) {
                            case "Order":
                                oTileCounts.Order += iQuantity;
                                break;
                            case "Receipt":
                                oTileCounts.Receipt += iQuantity;
                                break;
                            case "Adjustments":
                                oTileCounts.Adjustments += iQuantity;
                                break;
                            case "Returns":
                                oTileCounts.Returns += iQuantity;
                                break;
                            case "PhysicalCount":
                                oTileCounts.PhysicalCount += iQuantity;
                                break;
                        }
                    }
                }
            });
            var formattedQuantity = this._formatNumber(fTotalQuantity);

            // Update the model with calculated totals
            this.getView().getModel("transactionCounts").setProperty("/counts", oTileCounts);
            this.byId("footerText1").setText(formattedQuantity);
            
        },
        // _loadAuditSummary: function () {
        //     const oModel = this.getView().getModel(); // OData V4 model
        //     const oFilterBar = this.byId("bar0");

        //     const aFilters = oFilterBar.getFilters(); // SmartFilterBar filters

        //     oModel.read("/InventoryAuditSummary", {
        //         filters: aFilters,
        //         success: (oData) => {
        //             const results = oData.results;

        //             // Build tile summaries:
        //             const tileCounts = {
        //                 Order: 0,
        //                 Receipt: 0,
        //                 Adjustments: 0,
        //                 Returns: 0,
        //                 PhysicalCount: 0
        //             };

        //             results.forEach(row => {
        //                 tileCounts[row.TRAN_TYPE] = row.TOTAL_QTY;
        //             });

        //             this.getView()
        //                 .getModel("transactionCounts")
        //                 .setProperty("/counts", tileCounts);
        //         }
        //     });
        // },
        _formatNumber : function (value) {
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
        removeLeadingZeros: function(value) {
            if (typeof value === "string" && /^\d+$/.test(value)) {
                return String(Number(value));
            }
            return value; 
        },
        _updateTransactionBadges: function(firstRow) {
            const oBox = this.byId("monthBadgesBox");
            oBox.removeAllItems(); // clear existing badges

            if (!firstRow) return;

            const badgeConfig = [
                { title: "Orders",          value: firstRow.OrderTotal,       color: "#143359" },
                { title: "Receipts",        value: firstRow.ReceiptTotal,     color: "#143359" },
                { title: "Adjustments",     value: firstRow.AdjustmentsTotal, color: "#143359" },
                { title: "Returns",         value: firstRow.ReturnsTotal,     color: "#143359" },
                { title: "Physical Inventory",  value: firstRow.PhysicalCountTotal, color: "#143359" },
                { title: "Goods Receipt Posting",  value: firstRow.GoodsReceiptPostingTotal, color: "#143359" },
                { title: "Goods Issue Posting",  value: firstRow.GoodsIssuePostingTotal, color: "#143359" },
                { title: "Internal Warehouse Movement",  value: firstRow.InternalWarehouseMovementTotal, color: "#143359" },
                { title: "Posting Change",  value: firstRow.PostingChangeTotal, color: "#143359" },
                { title: "Putaway",  value: firstRow.PutawayTotal, color: "#143359" },
                { title: "Stock Removal",  value: firstRow.StockRemovalTotal, color: "#143359" }
            ];

            badgeConfig.forEach(cfg => {
                const oChip = new sap.m.HBox({
                    items: [
                        new sap.m.Text({ text: cfg.title }).addStyleClass("mckMonthName"),
                        new sap.m.Text({ text: this._formatNumber(cfg.value) }).addStyleClass("mckMonthValue")
                    ]
                }).addStyleClass("mckMonthChip");

                oBox.addItem(oChip);
            });
        }

        
        
    });
});