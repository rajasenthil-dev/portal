sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/ProgressIndicator",
    "sap/m/Text",
    "sap/ui/core/library" // Required for ValueState
], function(Control, ProgressIndicator, Text, coreLibrary) { // Added coreLibrary
    "use strict";

    // Obtain the ValueState type from the core library
    var ValueState = coreLibrary.ValueState;

    return Control.extend("invbylot.control.SegmentedProgressBar", {
        metadata: {
            properties: {
                value: { // Represents Days Until Expiry
                    type: "int",
                    defaultValue: null // Use null to better represent 'no date' initially
                },
                width: { // Add width property for better layout control
                   type: "sap.ui.core.CSSSize",
                   defaultValue: "100%"
                }
            },
            // --- Added Aggregations Section ---
            aggregations: {
                /**
                 * Internal aggregation for the ProgressIndicator.
                 * Making it public aggregation but hidden for direct use,
                 * allows potential extension scenarios but keeps it managed internally.
                 * Or keep it fully private if no extension needed. Let's make it hidden.
                 */
                 _progressBar: { type: "sap.m.ProgressIndicator", multiple: false, visibility: "hidden" },

                /**
                 * Internal aggregation for the Text label.
                 */
                 _label: { type: "sap.m.Text", multiple: false, visibility: "hidden" },

                /**
                 * Defines layout data associated with this control.
                 * Allows the control to be used within layout containers like FlexBox or Grid.
                 * This is the key part to enable <layoutData> in XML View.
                 */
                layoutData: { type: "sap.ui.core.LayoutData", multiple: false, singularName: "layoutData" }
            }
            // --- End Added Aggregations Section ---
        },

        init: function() {
             // Use internal aggregations for better lifecycle management
            this.setAggregation("_progressBar", new ProgressIndicator({
                percentValue: 0,
                showValue: false, // Keep value hidden on bar itself
                width: "100%" // Make internal progress bar fill the container
            }));
            this.setAggregation("_label", new Text({ // Removed .addStyleClass()
                width: "100%" // Allow text to use available space
            }));
        },

        onBeforeRendering: function() {
            // It's generally better practice to get models via this.getModel() if available
            // Assuming i18n model is set on the view/component
            var oResourceBundle = this.getModel("i18n") ? this.getModel("i18n").getResourceBundle() : null;
            var iDaysLeft = this.getValue(); // Can be null now

            var sState = ValueState.Error; // Default to Error
            var iPercent = 0;
            var sLabelText = oResourceBundle ? oResourceBundle.getText("noExpirationDate") : "No Expiration Date"; // Default text

            if (iDaysLeft === 0) { // Check for 0 first
                sState = ValueState.None;
                iPercent = 100;
                sLabelText = oResourceBundle.getText("noExpirationDate") ;
           } else if (iDaysLeft === null || isNaN(iDaysLeft)) { // Still handle other invalid inputs
                sState = ValueState.None;
                iPercent = 100;
                sLabelText =  oResourceBundle.getText("noExpirationDate"); // Or maybe an "Invalid Date" text?
           } else if (iDaysLeft >= 120) {
                sState = ValueState.Success;
                iPercent = 100;
                sLabelText = iDaysLeft + " " + oResourceBundle.getText("daysLeft");
           } else if (iDaysLeft > 0) { // Now covers 1 to 119
                sState = ValueState.Warning;
                iPercent = Math.max(Math.round((iDaysLeft / 120) * 100), 1);
                sLabelText = iDaysLeft + " " + oResourceBundle.getText("daysLeft");
           } else { // Now only covers iDaysLeft < 0
                sState = ValueState.Error;
                iPercent = 100;
                sLabelText = oResourceBundle.getText("expired")
           }

            // Get internal controls via aggregation getter
            var oProgressBar = this.getAggregation("_progressBar");
            var oLabel = this.getAggregation("_label");

            if (oProgressBar) {
                 oProgressBar.setPercentValue(iPercent);
                 oProgressBar.setState(sState);
            }

            if (oLabel) {
                 oLabel.setText(sLabelText);
                 // Optional: Add tooltip based on state/days
                 oLabel.setTooltip(sLabelText);
            }
        },

        // Use the default renderer of sap.ui.core.Control
        // The custom renderer is only strictly needed if you want HTML structure
        // different from just rendering the internal aggregations sequentially.
        // By using aggregations, the framework can handle rendering often.
        // If you KEEP the custom renderer, ensure it accesses aggregations correctly:
        /*
        renderer: function (oRM, oControl) {
            oRM.openStart("div", oControl); // Use openStart/openEnd
            oRM.style("width", oControl.getWidth()); // Apply the width property
            oRM.openEnd(); // Close the start tag

            var oLabel = oControl.getAggregation("_label");
            var oProgressBar = oControl.getAggregation("_progressBar");

            if (oLabel) {
                oRM.renderControl(oLabel);
            }
            if (oProgressBar) {
                oRM.renderControl(oProgressBar);
            }

            oRM.close("div"); // Close the tag
        }
        */
        // If you remove the custom renderer, the framework will render _label then _progressBar
        // inside the control's main div. You might need CSS for styling layout then.
        // Let's assume for now you might keep the renderer for structure:
         renderer: function (oRM, oControl) {
            oRM.openStart("div", oControl); // Use openStart/openEnd for attributes/styles
            oRM.style("width", oControl.getWidth()); // Apply the width property from metadata
            oRM.class("mySegmentedProgressBar"); // Optional: Add a CSS class for styling
            oRM.openEnd(); // Writes ">"

            var oLabel = oControl.getAggregation("_label");
            var oProgressBar = oControl.getAggregation("_progressBar");

            if (oLabel) {
                oRM.renderControl(oLabel);
            }
            if (oProgressBar) {
                oRM.renderControl(oProgressBar);
            }

            oRM.close("div"); // Writes "</div>"
        }
    });
});