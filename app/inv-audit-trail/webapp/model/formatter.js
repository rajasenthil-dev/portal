sap.ui.define([
    "sap/ui/core/format/DateFormat"
], (DateFormat) => {
    "use strict";

    // Shared EST Time Formatter
    const oTimeFormatter = DateFormat.getTimeInstance({
        pattern: "HH:mm",
        UTC: false,
        timeZone: "America/New_York" // Force EST always
    });

    return {
        yesNoIconColorN: function (value) {
            const cleanValue = (value || "").trim().toUpperCase();
            if (cleanValue.includes("Y")) return "Success";
            if (cleanValue.includes("N")) return "Error";
            return "None";
        },

        yesNoIconN: function (value) {
            const cleanValue = (value || "").trim().toUpperCase();
            if (cleanValue.includes("Y")) return "sap-icon://sys-enter-2";
            if (cleanValue.includes("N")) return "sap-icon://sys-cancel-2";
            return "";
        },

        yesNoIconColor: function (value) {
            const cleanValue = (value || "").trim().toUpperCase();
            if (cleanValue.includes("Y")) return "Success";
            if (cleanValue.includes("N")) return "Information";
            return "None";
        },

        yesNoIcon: function (value) {
            const cleanValue = (value || "").trim().toUpperCase();
            if (cleanValue.includes("Y")) return "sap-icon://circle-task-2";
            if (cleanValue.includes("N")) return "sap-icon://circle-task-2";
            return "";
        },

        _formatCurrency: function (value) {
            if (value == null) return "";

            const sLocale = sap.ui.getCore().getConfiguration().getLocale().getLanguage();
            let sCurrencyCode;

            switch (sLocale) {
                case "en-US":
                    sCurrencyCode = "USD";
                    break;
                case "en-CA":
                case "fr-CA":
                    sCurrencyCode = "CAD";
                    break;
                default:
                    sCurrencyCode = "USD";
                    break;
            }

            const oNumberFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance({
                currencyCode: false,
                customCurrencies: {
                    "MyDollar": {
                        isoCode: sCurrencyCode,
                        decimals: 2
                    }
                },
                groupingEnabled: true,
                showMeasure: true
            });

            return oNumberFormat.format(value, "MyDollar");
        },

        formatToEST: function(sDate) {
            if (!sDate) return "";

            const oDate = new Date(sDate);
            const oFormatter = DateFormat.getDateTimeInstance({
                pattern: "MMM d, yyyy hh:mm:ss a",
                timeZone: "America/New_York"
            });

            return oFormatter.format(oDate);
        },
        formatDateEST: function(sDate) {
            if (!sDate) return "";

            const oDate = new Date(sDate);
            const oFormatter = DateFormat.getDateInstance({
                pattern: "MMM d, yyyy",
                timeZone: "America/New_York"
            });

            return oFormatter.format(oDate);
        },
        formatTimeEST: function(sDate) {
            if (!sDate) return "";

            const oDate = new Date(sDate);
            const oFormatter = DateFormat.getTimeInstance({
                pattern: "hh:mm:ss a",
                timeZone: "America/New_York"
            });

            return oFormatter.format(oDate);
        }
    };
});