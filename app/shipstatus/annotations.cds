using PROCESSING as service from '../../srv/service';

annotate PROCESSING.SHIPPINGSTATUS with @(
    Search.defaultSearchElement: true,
    UI : {
        SelectionFields  : [
            SKU_PRODUCTNO,
            CUSTOMER_PO_BSTNK,
            PRODUCT_DESCRIPTION_MAKTX,
            PICK_AND_PACK_STATUS_SALES_SHIPPING_STATUS,
            VKORG

        ],
        LineItem : [
            {
                $Type : 'UI.DataField',
                Value : CUSTOMER_PO_BSTNK
            },
            {
                $Type : 'UI.DataField',
                Value : SKU_PRODUCTNO
            },
            {
                $Type : 'UI.DataField',
                Value : OBD_NO_DOCNO_C
            },
            {
                $Type : 'UI.DataField',
                Value : OBD_TIMESTAMP_LAST_STATUS_TIME_PLANT_BASED
            },
            {
                $Type : 'UI.DataField',
                Value : PICK_AND_PACK_STATUS_SALES_SHIPPING_STATUS
            },
            {
                $Type : 'UI.DataField',
                Value : PRODUCT_DESCRIPTION_MAKTX
            },
            {
                $Type : 'UI.DataField',
                Value : QUANTITY_ORDERED_QTY
            },
            {
                $Type : 'UI.DataField',
                Value : REQUESTED_DELIVERY_DATE_VDATU
            },
            {
                $Type : 'UI.DataField',
                Value : SHIP_TO_NAME_PARTNER
            },
            {
                $Type : 'UI.DataField',
                Value : SHIP_TO_PARTYNO
            },
            {
                $Type : 'UI.DataField',
                Value : SO_NO_REFDOCNO
            },
            {
                $Type : 'UI.DataField',
                Value : STORAGE_CONDITIONS_STOKEY1
            },
            {
                $Type : 'UI.DataField',
                Value : WAREHOUSE_NAME_LNUMT
            },
            {
                $Type : 'UI.DataField',
                Value : WAREHOUSE_TIME_ZONE
            },
            {
                $Type : 'UI.DataField',
                Value : VKORG
            }
        ]
    } 
){
    SKU_PRODUCTNO@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHIPSTATUSSKU',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'SKU_PRODUCTNO',
                        ValueListProperty : 'SKU_PRODUCTNO'
                    }
                ]
            },
        },
    );
    CUSTOMER_PO_BSTNK@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHIPSTATUSCUSTPO',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'CUSTOMER_PO_BSTNK',
                        ValueListProperty : 'CUSTOMER_PO_BSTNK'
                    }
                ]
            },
        },
    );
    PRODUCT_DESCRIPTION_MAKTX@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHIPSTATUSPRODDESC',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'PRODUCT_DESCRIPTION_MAKTX',
                        ValueListProperty : 'PRODUCT_DESCRIPTION_MAKTX'
                    }
                ]
            },
        },  
    );
    PICK_AND_PACK_STATUS_SALES_SHIPPING_STATUS@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHIPSTATUSWHSTATUS',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'PICK_AND_PACK_STATUS_SALES_SHIPPING_STATUS',
                        ValueListProperty : 'PICK_AND_PACK_STATUS_SALES_SHIPPING_STATUS'
                    }
                ]
            },
        },  
    );
    VKORG@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHIPSTATUSVKORG',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'VKORG',
                        ValueListProperty : 'VKORG'
                    }
                ]
            },
        }, 
    ); 
    
    MANUFACTURER_MFRNR@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHIPSTATUSMFRNR',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'MANUFACTURER_MFRNR',
                        ValueListProperty : 'MANUFACTURER_MFRNR'
                    }
                ]
            },
        }, 
    );  
    MANUFACTURER_NAME_MC_NAME1@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHIPSTATUSMFRNRNAME',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'MANUFACTURER_NAME_MC_NAME1',
                        ValueListProperty : 'MANUFACTURER_NAME_MC_NAME1'
                    }
                ]
            },
        }, 
    );  
};