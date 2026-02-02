sap.ui.define([], () => {
	"use strict";

	return {
        removeLeadingZeros: function(value) {
            if (typeof value === "string" && /^\d+$/.test(value)) {
                return String(Number(value));
            }
            return value; 
        },
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
        _formatCurrency: function(price, suffix) {
            if (price === null || price === undefined) {
                return "--";
            }
            const oNumberFormat = sap.ui.core.format.NumberFormat.getFloatInstance({
                groupingEnabled: true,
                groupingSeparator: ",",
                decimalSeparator: ".",
                minFractionDigits: 2,
                maxFractionDigits: 2
            });
            let formattedPrice = "$" + oNumberFormat.format(price);
            if (suffix) {
                formattedPrice += " " + suffix;
            }
            return formattedPrice;
        }
	};
});