sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "bckorders/model/formatter",
  "sap/m/MessageBox"
], (Controller, formatter, MessageBox) => {
  "use strict";

  var sResponsivePaddingClasses = "sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer";

  return Controller.extend("bckorders.controller.View1", {
    formatter: formatter,

    onInit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute("RouteView1").attachPatternMatched(this._onPatternMatched, this);
        var oModel = this.getOwnerComponent().getModel();
        const oView = this.getView();
        const oSmartFilterBar = oView.byId("smartFilterBar");
    
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
        
        oTable.attachEvent("rowsUpdated", this._calculateTotals.bind(this));

        // // Fetch User Data and Logo
        // const oUserModel = this.getOwnerComponent().getModel("userModel");
        // const userData = oUserModel ? oUserModel.getData() : {};
        // const mfgNumber = userData.ManufacturerNumber;

        // const oLogoModel = this.getOwnerComponent().getModel("logo");
        // var sAppPath = sap.ui.require.toUrl("bckorders").split("/resources")[0];
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
        var sAppPath = sap.ui.require.toUrl("bckorders").split("/resources")[0];
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
    
        var sAppPath = sap.ui.require.toUrl("bckorders").split("/resources")[0];
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
    _calculateTotals: function () {
        const oSmartTable = this.getView().byId("table0");
        const oTable = oSmartTable.getTable();
        const oBinding = oTable.getBinding("rows");
    
        if (!oBinding) {
            console.warn("Table binding is missing.");
            // Optionally clear tiles/footers if no binding
            this._updateTile("TileContent1", "0");
            this._updateTile("TileContent2", "0");
            this._updateTile("TileContent3", "0");
            this._updateTile("TileContent4", "0");
            this._updateTile("TileContent5", "0");
            this._updateFooter("footerText1", "0");
            this._updateFooter("footerText2", "0");
            return;
        }
    
        const aContexts = oBinding.getContexts(0, oBinding.getLength());
        if (!aContexts || aContexts.length === 0) { // Also check if contexts array is empty
            console.warn("Data is not available for calculation.");
            // Clear tiles/footers if no data
            this._updateTile("TileContent1", "0");
            this._updateTile("TileContent2", "0");
            this._updateTile("TileContent3", "0");
            this._updateTile("TileContent4", "0");
            this._updateTile("TileContent5", "0");
            this._updateFooter("footerText1", "0");
            this._updateFooter("footerText2", "0");
            return;
        }
    
        // Use reduce for consolidated calculations
        const totals = aContexts.reduce((acc, oContext) => {
            const oData = oContext.getObject();
            if (!oData) return acc;
    
            // Add VBELN to the Set for unique back order count
            if (oData.VBELN) {
                acc.uniqueBackOrders.add(oData.VBELN);
            }
    
            // Add KUNRE_ANA to the Set for unique impacted customers
            if (oData.KUNRE_ANA) {
                 acc.impactedCustomers.add(oData.KUNRE_ANA);
            }
    
            // Add MATNR to the Set for unique items on back order
            if (oData.MATNR) {
                 acc.totalItemsOnBackOrder.add(oData.MATNR);
            }
    
    
            // Sum total units back ordered
            acc.totalUnitsBackOrdered += parseFloat(oData.BACK_ORD_QTY || 0);
    
            // Sum total extension
            acc.totalExtension += parseFloat(oData.EXTENSION || 0);
    
            // Logic for units to be received (if applicable)
            if (oData.DATE_DIFF > 0 && !oData.UDATE) {
                acc.totalUnitsToBeReceived += parseFloat(oData.BACK_ORD_QTY || 0);
            }
    
            return acc;
        }, {
            uniqueBackOrders: new Set(), // Use a Set for unique VBELN
            impactedCustomers: new Set(),
            totalItemsOnBackOrder: new Set(),
            totalUnitsBackOrdered: 0,
            totalUnitsToBeReceived: 0,
            totalExtension: 0
        });
    
        // Calculate unique counts from the Sets
        const uniqueBackOrdersCount = totals.uniqueBackOrders.size; // Get the size of the Set
        const impactedCustomersCount = totals.impactedCustomers.size;
        const totalItemsOnBackOrderCount = totals.totalItemsOnBackOrder.size;
    
        // Format values
        // Ensure formatter and formatNumberWithCommas are available in your controller
        const totalExtensionFormatted = this.formatter ? (this.formatter.formatCurrency ? this.formatter.formatCurrency(totals.totalExtension, "USD") : totals.totalExtension) : totals.totalExtension; // Basic check for formatter
        const totalQtyFormatted = this.formatter ? (this.formatter.formatNumber ? this.formatter.formatNumber(totals.totalUnitsBackOrdered) : totals.totalUnitsBackOrdered) : totals.totalUnitsBackOrdered; // Basic check for formatter
    
        // Update UI elements (tiles)
        // Update TileContent1 with the unique back order count
        this._updateTile("TileContent1", this.formatNumberWithCommas ? this.formatNumberWithCommas(uniqueBackOrdersCount) : uniqueBackOrdersCount); // Use unique count
        this._updateTile("TileContent2", this.formatNumberWithCommas ? this.formatNumberWithCommas(impactedCustomersCount) : impactedCustomersCount);
        this._updateTile("TileContent3", this.formatNumberWithCommas ? this.formatNumberWithCommas(totalItemsOnBackOrderCount) : totalItemsOnBackOrderCount);
        this._updateTile("TileContent4", this.formatNumberWithCommas ? this.formatNumberWithCommas(totals.totalUnitsBackOrdered) : totals.totalUnitsBackOrdered);
        this._updateTile("TileContent5", this.formatNumberWithCommas ? this.formatNumberWithCommas(totals.totalUnitsToBeReceived) : totals.totalUnitsToBeReceived);
    
        // Update footer elements
        this._updateFooter("footerText1", totalQtyFormatted);
        this._updateFooter("footerText2", totalExtensionFormatted);
    },
    
    // Assuming these helper functions exist in your controller or a formatter file
    // Example placeholder for _updateTile
    _updateTile: function(sTileId, sText) {
        const oTile = this.getView().byId(sTileId);
        if (oTile && oTile.getContent()) {
            // Assuming the tile content has a setText method, adjust if needed
            if (oTile.getContent().setText) {
                oTile.getContent().setText(sText);
            } else if (oTile.setText) { // Some tiles might have setText directly
                oTile.setText(sText);
            }
        } else {
            console.warn("Tile or Tile Content not found:", sTileId);
        }
    },
    
        // Example placeholder for _updateFooter
        _updateFooter: function(sFooterId, sText) {
            const oFooterElement = this.getView().byId(sFooterId);
            if (oFooterElement && oFooterElement.setText) {
                oFooterElement.setText(sText);
            } else {
                console.warn("Footer element not found:", sFooterId);
            }
        },
    
        // Example placeholder for formatNumberWithCommas (if not using a dedicated formatter)
        formatNumberWithCommas: function(number) {
            if (number === null || number === undefined) {
                return "";
            }
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        formatNumberWithCommas: function(value) {
            if (!value || isNaN(value)) return "0";
        
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

    _updateTile: function (sTileId, value) {
        const oTile = this.byId(sTileId);
        if (oTile) {
            oTile.setText(value);
        } else {
            console.warn(`Tile with ID ${sTileId} not found.`);
        }
    },

    _updateFooter: function (sFooterId, value) {
        const oFooter = this.byId(sFooterId);
        if (oFooter) {
            oFooter.setText(value);
        } else {
            console.warn(`Footer with ID ${sFooterId} not found.`);
        }
    }
  });
});
