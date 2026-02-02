using INVENTORY as service from '../../srv/service';

annotate INVENTORY.INVENTORYSTATUS with @(
    Search.defaultSearchElement: true,
    odata: {
        filterable: {
            SKU_MATNR: true,
            PRODUCT_CODE: true,
            PRODUCT_DESCRIPTION: true,
            MANUFACTURER_MFRPN: true,
            SIZE: true,
            VKBUR: true,
        }
    },
    UI : {
        SelectionFields  : [
            PRODUCT_CODE,
            VKBUR

        ],
        LineItem  : [
            {
                $Type : 'UI.DataField',
                Value : SKU_MATNR,
                Label : '{i18n>INVENTORYSTATUS.SKU_MATNR}',
                ![@HTML5.CssDefaults] : {width : '4.688rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : PRODUCT_CODE,
                Label : '{i18n>INVENTORYSTATUS.PRODUCT_CODE}',
                ![@HTML5.CssDefaults] : {width : '4.688rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : PRODUCT_DESCRIPTION,
                Label : '{i18n>INVENTORYSTATUS.PRODUCT_DESCRIPTION}',
                ![@HTML5.CssDefaults] : {width : '20rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : SIZE,
                Label : '{i18n>INVENTORYSTATUS.SIZE}',
                ![@HTML5.CssDefaults] : {width : '4.688rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PLANT
            },
            {
                $Type : 'UI.DataField',
                Value : PLANT_NAME,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}

            },
            
            {
                $Type : 'UI.DataField',
                Value : OPEN_STOCK,
                Label : '{i18n>INVENTORYSTATUS.OPEN_STOCK}',
                ![@HTML5.CssDefaults] : {width : '10rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : QUARANTINE,
                Label : '{i18n>INVENTORYSTATUS.QUARANTINE}',
                ![@HTML5.CssDefaults] : {width : '10rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : DAMAGE_DESTRUCTION,
                Label : '{i18n>INVENTORYSTATUS.DAMAGE_DESTRUCTION}',
                ![@HTML5.CssDefaults] : {width : '10rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : RETAINS,
                Label : '{i18n>INVENTORYSTATUS.RETAINS}',
                ![@HTML5.CssDefaults] : {width : '10rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : QUALITY_HOLD,
                Label : '{i18n>INVENTORYSTATUS.QUALITY_HOLD}',
                ![@HTML5.CssDefaults] : {width : '10rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : RETURNS_CAL,
                Label : '{i18n>INVENTORYSTATUS.RETURNS_CAL}',
                ![@HTML5.CssDefaults] : {width : '10rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : RECALLS,
                Label : '{i18n>INVENTORYSTATUS.RECALLS}',
                ![@HTML5.CssDefaults] : {width : '10rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : INVENTORY_HOLD,
                Label : '{i18n>INVENTORYSTATUS.INVENTORY_HOLD}',
                ![@HTML5.CssDefaults] : {width : '10rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : RELABEL_QTY,
                Label : '{i18n>INVENTORYSTATUS.RELABEL_QTY}',
                ![@HTML5.CssDefaults] : {width : '10rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : MARKETING_SAMPLE_QTY,
                Label : '{i18n>INVENTORYSTATUS.SAMPLE_QTY}',
                ![@HTML5.CssDefaults] : {width : '10rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : LAB_SAMPLE_QTY,
                Label : '{i18n>INVENTORYSTATUS.SAMPLE_QTY}',
                ![@HTML5.CssDefaults] : {width : '10rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : IN_PROCESS
            },
            {
                $Type : 'UI.DataField',
                Value : TOTAL_QTY
            },
            {
                $Type : 'UI.DataField',
                Value : UNIT,
                Label : '{i18n>INVENTORYSTATUS.UNIT}',
                ![@HTML5.CssDefaults] : {width : '10rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : VKBUR,
                Label : '{i18n>INVENTORYSTATUS.VKBUR}',
                ![@HTML5.CssDefaults] : {width : '4.688rem'}
            }
        ],
    },
){
    PRODUCT_CODE@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVSTATUSPRODUCTCODE',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'PRODUCT_CODE',
                        ValueListProperty : 'PRODUCT_CODE'
                    }
                ]
            },
        }
    );
     PLANT_NAME@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVSTATUSPLANTNAME',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'PLANT_NAME',
                        ValueListProperty : 'PLANT_NAME'
                    }
                ]
            },
        }
    );
    VKBUR@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVSTATUSVKBUR',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'VKBUR',
                        ValueListProperty : 'VKBUR'
                    }
                ]
            },
        }
    );
    MANUFACTURER_MFRNR@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVSTATUSMFRNR',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'MANUFACTURER_MFRNR',
                        ValueListProperty : 'MANUFACTURER_MFRNR'
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
                CollectionPath : 'INVSTATUSMFRNRNAME',
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
    WAREHOUSE_STATUS@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVSTATUSWAREHOUSESTATUS',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'WAREHOUSE_STATUS',
                        ValueListProperty : 'WAREHOUSE_STATUS'
                    }
                ]
            },
        }
    );
    // <--- UPDATED: Use Aggregation.default for aggregation method
    OPEN_STOCK @(
        Analytics.Measure: true,
        Aggregation.default: #SUM
    );
    QUARANTINE @(
        Analytics.Measure: true,
        Aggregation.default: #SUM
    );
    DAMAGE_DESTRUCTION @(
        Analytics.Measure: true,
        Aggregation.default: #SUM
    );
    RETAINS @(
        Analytics.Measure: true,
        Aggregation.default: #SUM
    );
    QUALITY_HOLD @(
        Analytics.Measure: true,
        Aggregation.default: #SUM
    );
    RETURNS_CAL @(
        Analytics.Measure: true,
        Aggregation.default: #SUM
    );
    RECALLS @(
        Analytics.Measure: true,
        Aggregation.default: #SUM
    );
    INVENTORY_HOLD @(
        Analytics.Measure: true,
        Aggregation.default: #SUM
    );
    RELABEL_QTY @(
        Analytics.Measure: true,
        Aggregation.default: #SUM
    );
    SAMPLE_QTY @(
        Analytics.Measure: true,
        Aggregation.default: #SUM
    );
    // <--- END OF ANALYTICS ANNOTATIONS
};


