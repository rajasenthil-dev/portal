sap.ui.define([
    "sap/ui/core/UIComponent",
    "invoicehis/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("invoicehis.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
            // const oUserModel = new sap.ui.model.json.JSONModel();
            // this.setModel(oUserModel, "user");

            // // Load user info from App Router's user-api
            // $.ajax({
            //     url: "/services/user-api/currentUser",
            //     method: "GET",
            //     success: function (oData) {
            //     console.log("🔐 User info:", oData);
            //     oUserModel.setData(oData);
            //     },
            //     error: function (err) {
            //     console.error("❌ Failed to fetch user info", err);
            //     }
            // });
        }
    });
});