sap.ui.define([], () => {
	"use strict";

	return {
        formatDate: function(value) {
            if (!value) return "";
            return value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
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
        yesNoIconColor: function (value) {
            const cleanValue = (value || "").trim().toUpperCase(); // Clean and normalize data
            
            if (cleanValue.includes("Y")) {
                return "Success";  // Green for "Current"
            } 
            if (cleanValue.includes("N")) {
                return "Information";    // Red for "Historical"
            } 
            
            return "None"; // Default state for unexpected values
        },
        
        yesNoIcon: function (value) {
            const cleanValue = (value || "").trim().toUpperCase();
        
            if (cleanValue.includes("Y")) {
                return "sap-icon://circle-task-2"; // Checkmark for "Current"
            } 
            if (cleanValue.includes("N")) {
                return "sap-icon://circle-task-2"; // Cross for "Historical"
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