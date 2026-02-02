sap.ui.define([
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/format/NumberFormat"
], (DateFormat, NumberFormat) => {
    "use strict";

    return {
        
        formatDate: function (date) {
            if (!date) return "";

            let oDate;

            // Parse string date (e.g., 'yyyyMMdd')
            if (typeof date === "string" && date.length === 8) {
                const formattedDateString = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
                oDate = new Date(`${formattedDateString}T00:00:00Z`);
            } else if (date instanceof Date) {
                oDate = new Date(date.getTime());
            } else {
                return ""; // Unsupported type
            }

            if (isNaN(oDate.getTime())) return ""; // Invalid date

            const oDateFormat = DateFormat.getDateInstance({
                style: "medium"
            });
            return oDateFormat.format(oDate);
        },

        formatNumber: function (value) {
            return value != null ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value) : "";
        },

        formatCurrency: function (value, currencyCode) {
            if (value == null) return "";

            const oNumberFormat = NumberFormat.getCurrencyInstance({
                currencyCode: !!currencyCode,
                groupingEnabled: true,
                showMeasure: true
            });

            return oNumberFormat.format(value);
        },
        formatUrl: function (sUrl) {
            if (!sUrl) return "";

            var sAppPath = sap.ui.require.toUrl("bckorders").split("/resources")[0];
            if(sAppPath === ".") {
                sAppPath = "";
            }
            console.log("✅ Dynamic Base Path:", sAppPath);

            var fullUrl = sAppPath + sUrl;

            return fullUrl;
        }
    };
});