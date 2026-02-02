using SALES as service from '../../srv/service';
// Annotations for the Filter Bar and TreeTable Columns
// All UI annotations are now consolidated into a single block.
annotate SALES.PIVOTTABLE with @(
    Capabilities.FilterRestrictions: {
        FilterExpressionRestrictions: [
            {
                Property: CAL_YEAR,
                AllowedExpressions: 'SingleValue'
            }
        ]
    },
    UI: {
        // Defines the fields that will automatically appear in the FilterBar
        SelectionFields: [
            PROVINCE_REGIO,
            SHIP_TO_NAME,
            CAL_YEAR
        ],

        // Defines the default columns and their labels for tables/lists
        LineItem: [
            {
                $Type : 'UI.DataField',
                Value : PROVINCE_REGIO
            },
            {
                $Type : 'UI.DataField',
                Value : SHIP_TO_NAME
            },
            {
                $Type : 'UI.DataField',
                Value : VTEXT_FKART
            },
            {
                $Type : 'UI.DataField',
                Value : JANUARY
            },
            {
                $Type : 'UI.DataField',
                Value : FEBRUARY
            },
            {
                $Type : 'UI.DataField',
                Value : MARCH
            },
            {
                $Type : 'UI.DataField',
                Value : APRIL
            },
            {
                $Type : 'UI.DataField',
                Value : MAY
            },
            {
                $Type : 'UI.DataField',
                Value : JUNE
            },
            {
                $Type : 'UI.DataField',
                Value : JULY
            },
            {
                $Type : 'UI.DataField',
                Value : AUGUST
            },
            {
                $Type : 'UI.DataField',
                Value : SEPTEMBER
            },
            {
                $Type : 'UI.DataField',
                Value : OCTOBER
            },
            {
                $Type : 'UI.DataField',
                Value : NOVEMBER
            },
            {
                $Type : 'UI.DataField',
                Value : DECEMBER
            },
            {
                $Type : 'UI.DataField',
                Value : TOTAL
            },

        ],

        
    }
){
    CAL_YEAR@(
        Common: {
            ValueListWithFixedValues,
            ValueListWithFixedValues.@Common.ValueListShowValuesImmediately: true,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'PIVOTCALYEAR',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'CAL_YEAR',
                        ValueListProperty : 'CAL_YEAR'
                    }
                ]
            },
         
        },
       
        
    
    ); 
    
    PROVINCE_REGIO@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'PIVOTPROVINCE',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'PROVINCE_REGIO',
                        ValueListProperty : 'PROVINCE_REGIO'
                    }
                ]
            },
        } 
    
    ); 
};




