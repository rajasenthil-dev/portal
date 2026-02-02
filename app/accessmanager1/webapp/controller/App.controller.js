sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("accessmanager1.controller.App", {
    onInit: function () {
      this.oOwnerComponent = this.getOwnerComponent();
      this.oRouter = this.oOwnerComponent.getRouter();
      this.oRouter.attachRouteMatched(this.onRouteMatched, this);
    },

    onRouteMatched: function (oEvent) {
      var sRouteName = oEvent.getParameter("name"),
          oArguments = oEvent.getParameter("arguments"),
          sLayout = oArguments.layout; // <-- *** 1. GET THE LAYOUT ***

      // Save the current route name
      this.currentRouteName = sRouteName;
      this.currentProduct = oArguments.product;

      // --- *** 2. APPLY THE LAYOUT (THE FIX) *** ---
      // Get the FlexibleColumnLayout control (assuming its ID is 'flexibleColumnLayout' in App.view.xml)
      var oLayoutControl = this.byId("flexibleColumnLayout"); 
      
      if (sLayout && oLayoutControl) {
          oLayoutControl.setLayout(sLayout);
      }
    },

		onStateChanged: function (oEvent) {
			debugger
			var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
				sLayout = oEvent.getParameter("layout");

			// Replace the URL with the new layout if a navigation arrow was used
			if (bIsNavigationArrow) {
				this.oRouter.navTo(this.currentRouteName, {layout: sLayout, product: this.currentProduct}, true);
			}
		},

		onExit: function () {
			this.oRouter.detachRouteMatched(this.onRouteMatched, this);
		}
  });
});