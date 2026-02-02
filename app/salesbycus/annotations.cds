using SALES as service from '../../srv/service';

annotate SALES.SALESBYCURRENTAPP with @(
Search.defaultSearchElement: true,
    odata: {
        filterable: {
            ADDRESS_1               : true,
            ADDRESS_2               : true,
            AMOUNT_NETWR            : true,
            AUGRU_AUFT              : true,
            BILL_TO_KUNRE_ANA       : true,
            BILL_TO_NAME            : true,
            CITY_ORT01              : true, 
            CO_VKORG                : true,
            COMMENT                 : true,
            DELEVERY_DATE_VDATU     : true,
            EXPIRY_DATE_VFDAT       : true,
            INVOICE_CREDIT_VBELN    : true,
            INVOICE_DATE_FKDAT      : true,
            LOT_CHARG               : true,
            MFRNR                   : true,
            MFRPN                   : true,
            PATIENT_ID              : true,
            POSTAL_CODE_PSTLZ       : true,
            PRODUCT_DESCRIPTION_MAKTX : true,
            PROVINCE_REGIO          : true,
            PURCHASE_ORDER_BSTKD    : true,
            QUANTITY_FKIMG          : true,
            RBTXT                   : true,
            SHIP_TO_KUNWE_ANA       : true,
            SHIP_TO_NAME            : true,
            SKU_MATNR               : true,
            TBTXT                   : true,
            TRACKING_TRACKN         : true,
            UNIT_PRICE              : true,
            UNITS_PER_CASE          : true,
            UPC_EAN11               : true,
            VKBUR                   : true,
            VTEXT_FKART             : true,
            WAERK                   : true,
            WAREHOUSE               : true,
            WERKS                   : true,
            PLANT_NAME              : true,
            MFRNR_NAME              : true,
            BEZEI_AUART             : true,
            AUART                   :true
        }
    },
    UI : {
        SelectionFields  : [
            INVOICE_CREDIT_VBELN,
            PRODUCT_DESCRIPTION_MAKTX,
            VTEXT_FKART,
            WAREHOUSE,
            LOT_CHARG,
            BILL_TO_KUNRE_ANA,
            BILL_TO_NAME,
            SHIP_TO_KUNWE_ANA,
            SHIP_TO_NAME,
            INVOICE_DATE_FKDAT,
            EXPIRY_DATE_VFDAT,
            CURRENT,
            CO_VKORG,
            VKBUR,
            BEZEI,
            BEZEI_AUART,
            BILL_TO_TYPE
        ],
        
        LineItem  : [
            {
                $Type : 'UI.DataField',
                Value : CURRENT,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : INVOICE_CREDIT_VBELN,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : INVOICE_DATE_FKDAT,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PURCHASE_ORDER_BSTKD,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : SKU_MATNR,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PRODUCT_DESCRIPTION_MAKTX,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : OBKNR,
            //     ![@HTML5.CssDefaults] : {width : '10rem'}
            // },
            {
                $Type : 'UI.DataField',
                Value : VBELN_VBAK,
            },
            {
                $Type : 'UI.DataField',
                Value : UNITS_PER_CASE,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : QUANTITY_FKIMG,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : RBTXT,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : UNIT_PRICE,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : AMOUNT_NETWR,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : AUGRU_AUFT,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : LOT_CHARG,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : EXPIRY_DATE_VFDAT,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : VTEXT_FKART,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : BILL_TO_KUNRE_ANA,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : SHIP_TO_KUNWE_ANA,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : BILL_TO_NAME,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : SHIP_TO_NAME,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : BILL_TO_TYPE,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : KTOKD,
            },
            {
                $Type : 'UI.DataField',
                Value : TXT30, 
            },
            {
                $Type : 'UI.DataField',
                Value : KTEXT, 
            },
            {
                $Type : 'UI.DataField',
                Value : SMTP_ADDR, 
            },
            {
                $Type : 'UI.DataField',
                Value : TEL_NUMBER, 
            },
            {
                $Type : 'UI.DataField',
                Value : KZWI1, 
            },
            {
                $Type : 'UI.DataField',
                Value : KZWI3, 
            },
            {
                $Type : 'UI.DataField',
                Value : TOTAL_AMOUNT, 
            },
            {
                $Type : 'UI.DataField',
                Value : ADDRESS_1,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : ADDRESS_2,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CITY_ORT01,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : POSTAL_CODE_PSTLZ,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PROVINCE_REGIO,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : TBTXT,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : UPC_EAN11,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : WAREHOUSE,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : WERKS,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PLANT_NAME,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : TRACKING_TRACKN,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : TIME_OFF_DELIVERY,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : DELIVERY_DATE,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : VGBEL,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : MFRPN,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : BEZEI_AUART
            },
            {
                $Type : 'UI.DataField',
                Value : BEZEI
            },
            {
                $Type : 'UI.DataField',
                Value : COMMENT,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CO_VKORG,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : VKBUR,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            }
        ],
    }, 
){
    INVOICE_CREDIT_VBELN@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCINVOICE',
                Label : 'Invoice #',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterInOut',
                        LocalDataProperty : 'INVOICE_CREDIT_VBELN',
                        ValueListProperty : 'INVOICE_CREDIT_VBELN'
                    }
                ]
            },
        } 
        
    );
    PRODUCT_DESCRIPTION_MAKTX@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCPRODDESC',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'PRODUCT_DESCRIPTION_MAKTX',
                        ValueListProperty : 'PRODUCT_DESCRIPTION_MAKTX'
                    }
                ]
            },
        }
        
    );
    LOT_CHARG@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCLOT',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterInOut',
                        LocalDataProperty : 'LOT_CHARG',
                        ValueListProperty : 'LOT_CHARG'
                    }
                ]
            },
        }
        
    );
    VTEXT_FKART@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCTYPE',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterInOut',
                        LocalDataProperty : 'VTEXT_FKART',
                        ValueListProperty : 'VTEXT_FKART'
                    }
                ]
            },
        }
        
    );
    BILL_TO_KUNRE_ANA@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCBILLTOID',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'BILL_TO_KUNRE_ANA',
                        ValueListProperty : 'BILL_TO_KUNRE_ANA'
                    }
                ]
            },
        }
    );
    BILL_TO_NAME@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCBILLTO',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'BILL_TO_NAME',
                        ValueListProperty : 'BILL_TO_NAME'
                    }
                ]
            },
        }
    );
    SHIP_TO_KUNWE_ANA@(
         Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCSHIPTOID',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'SHIP_TO_KUNWE_ANA',
                        ValueListProperty : 'SHIP_TO_KUNWE_ANA'
                    }
                ]
            },
        }
    );
    SHIP_TO_NAME@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCSHIPTO',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterInOut',
                        LocalDataProperty : 'SHIP_TO_NAME',
                        ValueListProperty : 'SHIP_TO_NAME'
                    }
                ]
            },
        }
        
    );
    WAREHOUSE@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCWAREHOUSE',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterInOut',
                        LocalDataProperty : 'WAREHOUSE',
                        ValueListProperty : 'WAREHOUSE'
                    }
                ]
            },
        }
        
    );
    BILL_TO_TYPE@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCCUSTOMERTYPE',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterInOut',
                        LocalDataProperty : 'BILL_TO_TYPE',
                        ValueListProperty : 'BILL_TO_TYPE'
                    }
                ]
            },
        }
        
    );
    MFRNR@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCMFRNR',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterInOut',
                        LocalDataProperty : 'MFRNR',
                        ValueListProperty : 'MFRNR'
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
                CollectionPath : 'SBCMFRNRNAME',
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
    CO_VKORG@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCSALESORG',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'CO_VKORG',
                        ValueListProperty : 'CO_VKORG'
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
                CollectionPath : 'SBCSALESOFFICE',
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
    BEZEI@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCBEZEI',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'BEZEI',
                        ValueListProperty : 'BEZEI'
                    }
                ]
            },
        }
        
    );
    BEZEI_AUART@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCBEZEIAUART',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'BEZEI_AUART',
                        ValueListProperty : 'BEZEI_AUART'
                    }
                ]
            },
        }
        
    );
    PLANT_NAME@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SBCPLANTNAME',
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
};



