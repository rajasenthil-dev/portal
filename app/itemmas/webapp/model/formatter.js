sap.ui.define([], () => {
	"use strict";

	return {
        yesNoIconColor: function (value) {
            const cleanValue = (value || "").trim().toUpperCase(); // Clean and normalize data
            
            if (cleanValue.includes("Y")) {
                return "Success";  // Green for "Current"
            } 
            if (cleanValue.includes("N")) {
                return "Error";    // Red for "Historical"
            } 
            
            return "None"; // Default state for unexpected values
        },
        
        yesNoIcon: function (value) {
            const cleanValue = (value || "").trim().toUpperCase();
        
            if (cleanValue.includes("Y")) {
                return "sap-icon://sys-enter-2"; // Checkmark for "Current"
            } 
            if (cleanValue.includes("N")) {
                return "sap-icon://sys-cancel-2"; // Cross for "Historical"
            } 
            
            return ""; // No icon for undefined or invalid values
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
        }
	};
});