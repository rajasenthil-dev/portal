sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
	"sap/f/library"
], function (Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
    "use strict";

    return Controller.extend("accessmanager1.controller.View1", {
        onInit: function () {
			this.oView = this.getView();
			this._bDescendingSort = false;
			this.oProductsTable = this.oView.byId("productsTable");
			this.oRouter = this.getOwnerComponent().getRouter();
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("email", FilterOperator.Contains, sQuery)];
			}

			this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
		},

		onAdd: function () {
			debugger
			//const oCrossAppNav = sap.ushell?.Container?.getService?.("CrossApplicationNavigation");

			if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getServiceAsync) {
				sap.ushell.Container.getServiceAsync("CrossApplicationNavigation")
					.then(function(oCrossAppNav) {
					oCrossAppNav.toExternal({
						target: {
						semanticObject: "user",
						action: "create"
						}
					});
					})
					.catch(function(err) {
					console.error("❌ CrossAppNav failed", err);
					sap.m.MessageBox.error("Navigation service not available.");
					});
			} else {
				// Fallback (optional): direct URL
				MessageBox.information("This functionality is not ready yet.", {title: "Aw, Snap!"});
			}
			
		},

		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new Sorter("lastName", this._bDescendingSort);

			oBinding.sort(oSorter);
		},

		onListItemPress: function (oEvent) {
			var productPath = oEvent.getSource().getBindingContext("edit").getPath(),
				product = productPath.split("/").slice(-1).pop();

			this.oRouter.navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, product: product});
		}
    });
});