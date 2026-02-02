sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/model/json/JSONModel',
	'sap/f/library',
    "accessmanager1/model/models"
], function(UIComponent, JSONModel, fioriLibrary, models) {
	'use strict';
    return UIComponent.extend("accessmanager1.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            var oRouter;

            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");


			// 1. Get your main OData model (let's assume it's the default model)
            const oODataModel = this.getModel();

            // 2. Create a new JSONModel
            const oModel = new sap.ui.model.json.JSONModel();

            // 3. Read data from your OData service
            oODataModel.read("/OKTAUsers", { // e.g., "/Products"
                success: (oData) => {
                    // 4. In the success callback, set the data
                    oModel.setData(oData.results);
                    
                    // 5. Set the new JSONModel on the component with a name
                    this.setModel(oModel, "edit");
                },
                error: (oError) => {
                    // It's always good to have error handling
                    console.error("Failed to load OData for JSONModel: ", oError);
                }
            });
            oRouter = this.getRouter();
			oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
			oRouter.initialize();
		},

		_onBeforeRouteMatched: function(oEvent) {
			var oModel = this.getModel(),
				sLayout = oEvent.getParameters().arguments.layout;

			// If there is no layout parameter, set a default layout (normally OneColumn)
			if (!sLayout) {
				sLayout = fioriLibrary.LayoutType.OneColumn;
			}

			oModel.setProperty("/layout", sLayout);
		}
        
    });
});