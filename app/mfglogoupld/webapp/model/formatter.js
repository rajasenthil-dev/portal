sap.ui.define([], () => {
    "use strict";

    return {
        
        formatUrl: function (sUrl, isActiveEntity) {
            if (!sUrl) return "";

            const isActive = isActiveEntity !== false;
            
            var sAppPath = sap.ui.require.toUrl("mfglogoupld").split("/resources")[0];
            if(sAppPath === ".") {
                sAppPath = "";
            }
            console.log("✅ Dynamic Base Path:", sAppPath);

            var fullUrl = sAppPath + '/odata/v2/media/MediaFile';

            return `${fullUrl}(ID='${sUrl}',IsActiveEntity=${isActive})/content`;
        },
        formatModifiedAt: function (modifiedAt, createdAt) {
            const oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({ style: "medium" });
            if (modifiedAt) {
                return oDateFormat.format(new Date(modifiedAt));
            }
            if (createdAt) { // Fallback to createdAt if modifiedAt is not yet set (e.g., for new records)
                return "Created: " + oDateFormat.format(new Date(createdAt));
            }
            return "Not yet saved"; // Or empty string, or some placeholder
        }


        
    };
});