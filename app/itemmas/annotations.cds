/* ********* Modification Log *****************************************************************
Version: CHG#:       INCIDENT#:     DATE:       DEVELOPER:
  1.0     CHG#       INC3619116     Feb-02-26   Raja Senthil N
DESCRIPTION: ITEM Master Listing App: Add new column field: UNITS_PER_PALLET
***********************************************************************************************/
using INVENTORY as service from '../../srv/service';

annotate INVENTORY.ITEMMASTER with @(
Search.defaultSearchElement: true,
    odata: {
        filterable: {
                PRODUCT: true,
                SALESORG: true,
                CREATIONDATE: true,
                DIN: true,
                GST_APPLICABLE: true,
                LOT_CONTROL_YN: true,
                NARCOTIC_YN: true,
                CATEGORY: true,
                PRODUCTDESCRIPTION_EN: true,
                PRODUCTDESCRIPTION_FR: true,
                PST_APPLICABLE: true,
                REFRIGERATED: true,
                SIZEUOM: true,
                PRODUCTSTANDARDID: true,
                MANUFACTURERNUMBER: true
        }
    },
);
annotate INVENTORY.ITEMMASTER with @(
    UI : {
        HeaderInfo: {
            TypeName: '{i18n>ITEMMASTER.TITLE}',
            TypeNamePlural: '{i18n>ITEMMASTER.TITLE_PLURAL}',
            Title: {
                $Type: 'UI.DataField',
                Value: PRODUCT
            },
            Description: {
                $Type: 'UI.DataField',
                Value: PRODUCTDESCRIPTION_EN
            }
        },
        SelectionFields  : [
            PRODUCT, 
            MFRNR_PART_NUMBER, 
            PRODUCTDESCRIPTION_EN, 
            CATEGORY,
            SALESORG
        ],
        LineItem  : [
            {
                $Type : 'UI.DataField',
                Value : PRODUCT,
                Label : '{i18n>ITEMMASTER.PRODUCT}',
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : MFRNR_PART_NUMBER,
                Label : '{i18n>ITEMMASTER.MFRNR_PART_NUMBER}',
                ![@HTML5.CssDefaults] : {width : '7.813rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : PRODUCTDESCRIPTION_EN,
                Label : '{i18n>ITEMMASTER.PRODUCTDESCRIPTION_EN}',
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PRODUCTSTANDARDID,
                Label : '{i18n>ITEMMASTER.PRODUCTSTANDARDID}',
                ![@HTML5.CssDefaults] : {width : '7.813rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : PRODUCTDESCRIPTION_FR,
                Label : '{i18n>ITEMMASTER.PRODUCTDESCRIPTION_FR}',
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : DIN,
                Label : '{i18n>ITEMMASTER.DIN}',
                ![@HTML5.CssDefaults] : {width : '3.125rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : SIZEUOM,
                Label : '{i18n>ITEMMASTER.SIZEUOM}',
                ![@HTML5.CssDefaults] : {width : '4.688rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CATEGORY,
                Label : '{i18n>ITEMMASTER.CATEGORY}',
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : NARCOTIC_YN,
                Label : '{i18n>ITEMMASTER.NARCOTIC_YN}',
                ![@HTML5.CssDefaults] : {width : '6.25rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : LOT_CONTROL_YN,
                Label : '{i18n>ITEMMASTER.LOT_CONTROL_YN}',
                ![@HTML5.CssDefaults] : {width : '7.188rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : REFRIGERATED,
                Label : '{i18n>ITEMMASTER.REFRIGERATED}',
                ![@HTML5.CssDefaults] : {width : '6.25rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PST_APPLICABLE,
                Label : '{i18n>ITEMMASTER.PST_APPLICABLE}',
                ![@HTML5.CssDefaults] : {width : '6.875rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : GST_APPLICABLE,
                Label : '{i18n>ITEMMASTER.GST_APPLICABLE}',
                ![@HTML5.CssDefaults] : {width : '7rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CREATIONDATE,
                Label : '{i18n>ITEMMASTER.CREATIONDATE}',
                ![@HTML5.CssDefaults] : {width : '7rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : UNITS_PER_CASE,
                Label : '{i18n>ITEMMASTER.UNITS_PER_CASE}',
                ![@HTML5.CssDefaults] : {width : '6.875rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : SALESORG,
                Label : '{i18n>ITEMMASTER.SALESORG}',
                ![@HTML5.CssDefaults] : {width : '5rem'}
            },
/* Begin of INC3619116 - New Column "UNITS_PER_PALLET"*/
            {
                $Type : 'UI.DataField',
                Value : UNITS_PER_PALLET,
                Label : '{i18n>ITEMMASTER.UNITS_PER_PALLET}',
                ![@HTML5.CssDefaults] : {width : '7.5rem'}
            }
/* End of INC3619116*/
        ],
    },
)
{
    PRODUCT@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'ITEMMASP',
                Label: '${i18n>ITEMMASTER.PRODUCT}',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'PRODUCT',
                        ValueListProperty : 'PRODUCT'
                    }
                ]
            },
        } 
    );
    MFRNR_PART_NUMBER@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'ITEMMASPSID',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'MFRNR_PART_NUMBER',
                        ValueListProperty : 'MFRNR_PART_NUMBER'
                    }
                ]
            },
        } 
    );
    PRODUCTDESCRIPTION_EN@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'ITEMMASPD',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'PRODUCTDESCRIPTION_EN',
                        ValueListProperty : 'PRODUCTDESCRIPTION_EN'
                    }
                ]
            },
        } 
    );
    CATEGORY@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'ITEMMASCATEGORY',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'CATEGORY',
                        ValueListProperty : 'CATEGORY'
                    }
                ]
            },
        } 
        
    );
    MANUFACTURERNUMBER@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'ITEMMASMFRNR',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'MANUFACTURERNUMBER',
                        ValueListProperty : 'MANUFACTURERNUMBER'
                    }
                ]
            },
        } 
        
    );
    MFRNR_NAME@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'ITEMMASMFRNRNAME',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'MFRNR_NAME',
                        ValueListProperty : 'MFRNR_NAME'
                    }
                ]
            },
        } 
        
    );
    SALESORG@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'ITEMMASSALESORG',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'SALESORG',
                        ValueListProperty : 'SALESORG'
                    }
                ]
            },
        }  
    ); 
};