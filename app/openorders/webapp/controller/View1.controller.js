sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/format/NumberFormat"
], (Controller, MessageBox, NumberFormat) => {
    "use strict";

    return Controller.extend("openorders.controller.View1", {
        _bFilterBarInitialized: false,
        onInit: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteView1").attachPatternMatched(this._onPatternMatched, this);
             // Initial setup if needed
             this._bFilterBarInitialized = false; // Reset flag on init
            var oModel = this.getOwnerComponent().getModel();
            const oView = this.getView();
            const oSmartFilterBar = oView.byId("bar0");
        
            oView.setBusy(true);
        
            oSmartFilterBar.attachInitialized(function () {
                oView.setBusy(false); // Once filter bar + value helps are ready
            });
            const oSmartTable = this.getView().byId("table0");
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

            // var sAppPath = sap.ui.require.toUrl("openorders").split("/resources")[0];
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
            var sAppPath = sap.ui.require.toUrl("openorders").split("/resources")[0];
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
        
            var sAppPath = sap.ui.require.toUrl("openorders").split("/resources")[0];
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
        /**
         * Called after the view has been rendered.
         * Used here to set the initial busy state for the SmartFilterBar.
         */
        onAfterRendering: function() {
            // Run this logic only once after the initial rendering
            if (!this._bFilterBarInitialized) {
                var oFilterBar = this.byId("bar0");
                if (oFilterBar) {
                    console.log("Setting FilterBar busy in onAfterRendering");
                    oFilterBar.setBusy(true);
                }
            }
        },

        /**
         * Event handler for the SmartFilterBar's 'initialise' event.
         * Hides the busy indicator for the filter bar.
         * @param {sap.ui.base.Event} oEvent The event object
         */
        onFilterBarInitialised: function (oEvent) {
            console.log("FilterBar initialise event fired");
            var oFilterBar = oEvent.getSource(); // Get the filter bar from the event
            oFilterBar.setBusy(false); // Hide the busy indicator
            this._bFilterBarInitialized = true; // Set flag to prevent re-setting busy in onAfterRendering
        },

        /**
         * Event handler for the SmartTable's 'beforeRebindTable' event.
         * Shows the busy indicator for the table itself.
         * @param {sap.ui.base.Event} oEvent The event object
         */
        onBeforeRebindTable: function(oEvent) {
            var oSmartTable = this.byId("table0"); // Use byId for consistency
            oSmartTable.setBusy(true); // Show busy indicator on the table

            var oBindingParams = oEvent.getParameter("bindingParams");
            oBindingParams.events = oBindingParams.events || {};
            oBindingParams.events.dataReceived = function(oDataEvent) {
                oSmartTable.setBusy(false); // Hide busy indicator
            }.bind(this);
        },
        

        _calculateTotals: function (oEvent) {
            // --- Get Number Format Instances ---
            // For counts (integers)
            var oIntegerFormat = NumberFormat.getIntegerInstance({
                groupingEnabled: true // This enables the comma separator based on locale
            });
            // For quantities (decimals, KWMENG is Decimal(20,3))
            var oQuantityFormat = NumberFormat.getFloatInstance({
                groupingEnabled: true, // Enable comma separator
                maxFractionDigits: 3,  // Allow up to 3 decimal places like the entity definition
                minFractionDigits: 0   // Don't force decimals if it's a whole number
            });
            // --- End Format Instances ---
        
            // It's safer to get the table via ID if this function isn't guaranteed
            // to be called directly by the table event, or ensure oEvent.getSource() is correct.
            // Let's assume oEvent.getSource() is the table for this example.
            var oTable = oEvent.getSource();
            var oBinding = oTable.getBinding("rows"); // Get the rows binding
        
            // Ensure that the binding exists
            if (oBinding) {
                var iLength = oBinding.getLength(); // Get the length of currently bound/filtered data
                var aContexts = oBinding.getContexts(0, iLength);
        
                var fTotalOpenLines = iLength; // Represents total lines displayed/bound
                var fTotalKWMENG = 0;
                var fTotalOpenOrders = new Set(); // Consider renaming if it's unique descriptions
        
                // Check if there are contexts to iterate over
                if (aContexts && aContexts.length > 0) {
                    // Iterate through the currently visible/filtered rows
                    aContexts.forEach(function (oContext) {
                        // KWMENG is Decimal(20,3), ensure parsing handles it
                        // getProperty should return the correct type if model is set up right
                        var vKwmen = oContext.getProperty("KWMENG");
                        fTotalKWMENG += parseFloat(vKwmen) || 0; // Accumulate sum
        
                        // Assuming MAKTX contains the value to determine unique "lines"
                        var vMaktx = oContext.getProperty("VBELN");
                        if (vMaktx !== null && vMaktx !== undefined) {
                             fTotalOpenOrders.add(vMaktx);
                        }
                    });
                }
        
                // Use .size for Set count
                var fTotalOpenOrdersCount = fTotalOpenOrders.size;
        
                // --- Format the calculated numbers ---
                var sFormattedTotalOpenLines = oIntegerFormat.format(fTotalOpenLines);
                var sFormattedTotalOpenOrdersCount = oIntegerFormat.format(fTotalOpenOrdersCount);
                var sFormattedTotalKWMENG = oQuantityFormat.format(fTotalKWMENG);
                // --- End Formatting ---
        
                // --- Update UI with formatted strings ---
                // Consider renaming fTotalOpenOrders variable if it means lines
                this.byId("_IDGenNumericContent1").setText(sFormattedTotalOpenLines);
                // Consider renaming fTotalOpenLinesCount variable if it means unique descriptions
                this.byId("_IDGenNumericContent2").setText(sFormattedTotalOpenOrdersCount);
                this.byId("footerText1").setText(sFormattedTotalKWMENG);
                // --- End UI Update ---
        
            } else {
                // Handle case where binding is not available - clear fields
                this.byId("_IDGenNumericContent1").setText("0"); // Or use oIntegerFormat.format(0)
                this.byId("_IDGenNumericContent2").setText("0"); // Or use oIntegerFormat.format(0)
                this.byId("footerText1").setText("0");        // Or use oQuantityFormat.format(0)
                console.error("Row binding not found for table.");
            }
        }
    });
});