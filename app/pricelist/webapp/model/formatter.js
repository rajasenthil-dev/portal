sap.ui.define([], () => {
	"use strict";

	return {
        removeLeadingZeros: function(value) {
            if (typeof value === "string" && /^\d+$/.test(value)) {
                return String(Number(value));
            }
            return value; 
        }
	};
});