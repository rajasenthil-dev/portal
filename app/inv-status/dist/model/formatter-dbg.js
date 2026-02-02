sap.ui.define([
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/format/NumberFormat"
], (DateFormat, NumberFormat) => {
    "use strict";

    return {
        removeLeadingZeros: function(value) {
            if (typeof value === "string" && /^\d+$/.test(value)) {
                return String(Number(value));
            }
            return value; 
        },
        // formatStockWithUnit: function(stock, unit) {
        //     if (stock == null || stock === "") return "N/A";
          
        //     // Convert to integer and format with commas
        //     const formattedStock = parseInt(stock, 10).toLocaleString();
          
        //     // Append unit (if available)
        //     return `${formattedStock} ${unit || ""}`.trim();
        //   }
    };
});