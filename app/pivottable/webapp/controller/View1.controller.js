sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], function (Controller, Filter, FilterOperator, MessageToast) {
    "use strict";

    return Controller.extend("pivottable.controller.View1", {

        onInit: function () {
            const monthLookup = {
                "JANUARY": 1, "FEBRUARY": 2, "MARCH": 3, "APRIL": 4,
                "MAY": 5, "JUNE": 6, "JULY": 7, "AUGUST": 8,
                "SEPTEMBER": 9, "OCTOBER": 10, "NOVEMBER": 11, "DECEMBER": 12
            };
            const oTileModel = new sap.ui.model.json.JSONModel({
                monthTotals: {
                    JANUARY: 0,
                    FEBRUARY: 0,
                    MARCH: 0,
                    APRIL: 0,
                    MAY: 0,
                    JUNE: 0,
                    JULY: 0,
                    AUGUST: 0,
                    SEPTEMBER: 0,
                    OCTOBER: 0,
                    NOVEMBER: 0,
                    DECEMBER: 0
                }
            });
            this.getView().setModel(oTileModel, "tileModel");
            // Default product key
            this._sSelectedKey = "Ladega";

            const oSmartTable     = this.byId("table0");
            const oSmartFilterBar = this.byId("bar0");
            const oTabs           = this.byId("idIconTabBar");

            this._oSmartTable = oSmartTable;
            
            // -----------------------------------------
            // 1️⃣ SmartTable INITIALISE (table is ready)
            // -----------------------------------------
            oSmartTable.attachInitialise(() => {
                // mark table ready if you still use flags
                this._bTableReady = true;

                // Preselect product tab visually
                if (oTabs) {
                    oTabs.setSelectedKey("Ladega");
                }

                // 🔹 Inner GridTable exists *now*
                const oInnerTable = oSmartTable.getTable();
                if (oInnerTable) {
                    oInnerTable.attachRowsUpdated(this._onRowsUpdated.bind(this));
                }
            });

            // --------------------------------------------------
            // 2️⃣ SmartFilterBar INITIALIZED (when controls exist)
            // --------------------------------------------------
            oSmartFilterBar.attachEventOnce("initialized", () => {

                this._bFilterReady = true;

                const currentYear  = new Date().getFullYear().toString();
                const oYearControl = oSmartFilterBar.getControlByKey("CAL_YEAR");

                if (oYearControl && oYearControl.setSelectedKey) {
                    oYearControl.setSelectedKey([currentYear]);
                }

                oSmartFilterBar.fireFilterChange();
                oSmartFilterBar.search(); // triggers rebind
            });
            
            // --------------------------------------------------
            // 3️⃣ Inject product filter before SmartTable binds
            // --------------------------------------------------
            oSmartTable.attachBeforeRebindTable(this._onBeforeRebindTable, this);
        },
        _applyInitialSort: function () {
            var oTable = this.byId("table");
            var oBinding = oTable.getBinding("items");

            if (!oBinding) return;

            oBinding.sort([
                new sap.ui.model.Sorter("PROVINCE_REGIO", false),
                new sap.ui.model.Sorter("SHIP_TO_NAME", false)
            ]);
        },
        _onTabSelect: function (oEvent) {
            debugger
            const key = oEvent.getParameter("key");

            // Store selected product
            this._sSelectedKey = key;

            // Force SmartTable to rebind
            this._oSmartTable.rebindTable();
        },
        // _attemptInitialLoad: function () {
        //     if (this._bTableReady && this._bFilterReady) {
        //         this._oSmartTable.rebindTable();
        //     }
        // },
        /**
         * Runs only when BOTH SmartTable.initialise AND SmartFilterBar.initialise have fired
         */
        _attemptInitialRebind: function () {

            if (this._bSmartTableReady && this._bFilterBarReady) {

                // Rebind table now that both are ready
                this._oSmartTable.rebindTable();
            }
        },
        // onAfterRendering: function () {
        //     const oTabs = this.byId("idIconTabBar");

        //     // Visually select the tab
        //     // Set default internal key value
        //     oTabs.sSelectedKey = "Ladega";

        //     // Rebind SmartTable with that filter
        //     setTimeout(() => {
        //         oSmartTable.rebindTable();
        //     }, 200); // 150–200 ms is the sweet spot for Work Zone
        
        // },
        _onRowsUpdated: function () {
            const oSmartTable = this.byId("table0");
            const oTable = oSmartTable.getTable();
            const oBinding = oTable.getBinding("rows");

            if (!oBinding) return;

            const aContexts = oBinding.getContexts(0, oBinding.getLength());
            if (!aContexts.length) return;

            // Your actual month column names coming from the CAP aggregated handler
            const monthOrder = [
                "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
            ];

            const totals = {};
            monthOrder.forEach(m => totals[m] = 0);

            let ytd = 0;
            let rowCount = aContexts.length;

            aContexts.forEach(ctx => {
                const row = ctx.getObject();

                monthOrder.forEach(m => {
                    const val = Number(row[m] || 0);
                    totals[m] += val;
                    ytd += val;
                });
            });

            // Find highest month
            let highest = { month: "", value: 0 };
            monthOrder.forEach(m => {
                if (totals[m] > highest.value) {
                    highest = { month: m, value: totals[m] };
                }
            });

            const avg = rowCount > 0 ? ytd / rowCount : 0;

            // Update your existing footer
            this.byId("FooterText1").setText(ytd.toLocaleString());

            // Render both tile sets
            this._renderMonthlyTiles(totals);
            this._renderAdvancedTiles({
                ytd,
                highest,
                avg,
                rows: rowCount
            });
            this._generateMonthBadges(totals);
        },
        _refreshUserModel: async function () {
            const oUserModel = this.getOwnerComponent().getModel("userModel");
            var sAppPath = sap.ui.require.toUrl("pivottable").split("/resources")[0];
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
        
            var sAppPath = sap.ui.require.toUrl("pivottable").split("/resources")[0];
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

        _onSmartTableInit: function () {
            this._oTable = this._oSmartTable.getTable();
        },

        onFilterSelect: function (oEvent) {
            this._sSelectedKey = oEvent.getParameter("key"); // Save key for later
            this._oSmartTable.rebindTable(); // Trigger rebind
        },

        _onBeforeRebindTable: function (oEvent) {
            const mParams = oEvent.getParameter("bindingParams");
            const aFilters = [];

            // Override default sorter stack
            mParams.sorter = [
                new sap.ui.model.Sorter("PROVINCE_REGIO", false),
                new sap.ui.model.Sorter("SHIP_TO_NAME", false)
            ];
            switch (this._sSelectedKey) {
                case "Ladega":
                aFilters.push(new sap.ui.model.Filter("MAKTX", sap.ui.model.FilterOperator.Contains, "LEDAGA"));
                break;
                case "SIGNIFOR":
                aFilters.push(new sap.ui.model.Filter("MAKTX", sap.ui.model.FilterOperator.Contains, "SIGNIFOR"));
                break;
                case "Cystadrops":
                aFilters.push(new sap.ui.model.Filter("MAKTX", sap.ui.model.FilterOperator.Contains, "CYSTADROPS"));
                break;
            }

            // Inject filters before SmartTable binds
            mParams.filters.push.apply(mParams.filters, aFilters);
        },

        formatOrDash: function (date) { 
            if (date === '00000000' || !date) { return '--' } else { return date ? date : '--'; } 
        },
        _calculateMonthlyTotals: function () {
            const oSmartTable = this.byId("table0");
            const oTable = oSmartTable.getTable();
            const oBinding = oTable.getBinding("rows");

            if (!oBinding) return;

            const aContexts = oBinding.getContexts();
            if (!aContexts.length) return;

            const monthFields = [
                "JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE",
                "JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"
            ];

            // Initialize totals
            const totals = {};
            monthFields.forEach(m => totals[m] = 0);

            // Aggregate totals
            aContexts.forEach(ctx => {
                const row = ctx.getObject();
                monthFields.forEach(m => {
                    totals[m] += Number(row[m] || 0);
                });
            });

            this._renderMonthlyTiles(totals);
        },
        _renderMonthlyTiles: function (totals) {
            const oContainer = this.byId("monthlyTileContainer");
            oContainer.removeAllItems();

            const monthOrder = [
                "JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE",
                "JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"
            ];

            monthOrder.forEach(month => {
                const value = totals[month] || 0;

                const oTile = new sap.m.VBox({
                    alignItems: "Center",
                    justifyContent: "Center",
                    items: [
                        new sap.m.Label({
                            text: month.substring(0, 3), // JAN, FEB, ...
                            design: "Bold"
                        }).addStyleClass("mckMonthTileHeader"),
                        new sap.m.Text({
                            text: value.toLocaleString()
                        }).addStyleClass("mckMonthTileValue")
                    ]
                }).addStyleClass("mckMonthTile");

                oContainer.addItem(oTile);
            });
        },
        _renderAdvancedTiles: function (stats) {

            const oContainer = this.byId("advancedTileContainer");
            oContainer.removeAllItems();

            const tiles = [
                {
                    title: "YTD Total",
                    value: stats.ytd,
                    icon: "sap-icon://sum",
                    color: "blue"
                },
                {
                    title: "Highest Month",
                    value: stats.highest.value,
                    subtitle: stats.highest.month,
                    icon: "sap-icon://arrow-top",
                    color: "orange"
                },
                {
                    title: "Average / Month",
                    value: stats.avg,
                    icon: "sap-icon://measure",
                    color: "grey"
                },
                {
                    title: "Total Customers",
                    value: stats.rows,
                    icon: "sap-icon://list",
                    color: "green"
                }
            ];

            tiles.forEach(t => {

                const oTile = new sap.m.VBox({
                    width: "180px",
                    height: "90px",
                    alignItems: "Start",
                    justifyContent: "Center",
                    items: [
                        new sap.m.HBox({
                            alignItems: "Center",
                            items: [
                                new sap.ui.core.Icon({
                                    src: t.icon,
                                    size: "1.5rem"
                                }).addStyleClass("advTileIcon"),
                                new sap.m.Label({
                                    text: t.title,
                                    design: "Bold"
                                }).addStyleClass("advTileTitle")
                            ]
                        }),
                        new sap.m.Text({
                            text: t.value.toLocaleString()
                        }).addStyleClass("advTileValue"),
                        t.subtitle
                            ? new sap.m.Text({ text: t.subtitle }).addStyleClass("advTileSubtitle")
                            : new sap.m.Text({ text: "" })
                    ]
                }).addStyleClass("advTile advTile-" + t.color);

                oContainer.addItem(oTile);
            });
        },
        _generateMonthBadges: function (monthTotals) {
            const oBox = this.byId("monthBadgesBox");
            oBox.removeAllItems();

            const monthNames = [
                "Jan","Feb","Mar","Apr","May","Jun",
                "Jul","Aug","Sep","Oct","Nov","Dec"
            ];

            const monthLookup = {
                "JANUARY": 1, "FEBRUARY": 2, "MARCH": 3, "APRIL": 4,
                "MAY": 5, "JUNE": 6, "JULY": 7, "AUGUST": 8,
                "SEPTEMBER": 9, "OCTOBER": 10, "NOVEMBER": 11, "DECEMBER": 12
            };

            Object.keys(monthTotals).forEach(monthKey => {
                const total = monthTotals[monthKey];

                // Convert "JANUARY" → 1, etc.
                let monthIndex = Number(monthKey);
                if (isNaN(monthIndex)) {
                    monthIndex = monthLookup[monthKey.toUpperCase()] || null;
                }

                if (!monthIndex) {
                    console.warn("Invalid month key:", monthKey);
                    return;
                }

                const monthName = monthNames[monthIndex - 1];

                const oChip = new sap.m.HBox({
                    items: [
                        new sap.m.Text({ text: monthName }).addStyleClass("mckMonthName"),
                        new sap.m.Text({ text: total.toLocaleString() }).addStyleClass("mckMonthValue")
                    ]
                }).addStyleClass("mckMonthChip");

                oBox.addItem(oChip);
            });
        }
    });
});