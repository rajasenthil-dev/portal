using SALES as service from '../../srv/service';
annotate SALES.SALESSERIALNUMBER with @(
Search.defaultSearchElement: true,
    UI : {
        SelectionFields  : [
            INVOICE_CREDIT_NO,
            PRODUCT_DESCRIPTION,
            ORDER_REASON_DESCRIPTION,
            DOCUMENT_TYPE,
            LOT,
            BILL_TO_NAME,
            SHIP_TO_NAME,
            SALES_ORG

        ],
        
        LineItem  : [
            {
                $Type : 'UI.DataField',
                Value : SALES_ORDER_NO
            },
            {
                $Type : 'UI.DataField',
                Value : PURCHASE_ORDER_BSTKD
            },
            {
                $Type : 'UI.DataField',
                Value : INVOICE_DATE_FKDAT
            },
            {
                $Type : 'UI.DataField',
                Value : INVOICE_CREDIT_NO
            },
            {
                $Type : 'UI.DataField',
                Value : SKU
            },
            {
                $Type : 'UI.DataField',
                Value : PRODUCT_DESCRIPTION
            },
            {
                $Type : 'UI.DataField',
                Value : AMOUNT,
            },
            {
                $Type : 'UI.DataField',
                Value : QUANTITY
            },
            {
                $Type : 'UI.DataField',
                Value : LOT
            },
            {
                $Type : 'UI.DataField',
                Value : DOCUMENT_TYPE
            },
            {
                $Type : 'UI.DataField',
                Value : BILL_TO_NAME
            },
            {
                $Type : 'UI.DataField',
                Value : BILL_TO_NO
            },
            {
                $Type : 'UI.DataField',
                Value : SHIP_TO_NAME
            },
            {
                $Type : 'UI.DataField',
                Value : SHIP_TO_NO
            },
            {
                $Type : 'UI.DataField',
                Value : ADDRESS_1
            },
            {
                $Type : 'UI.DataField',
                Value : ADDRESS_2
            },
            {
                $Type : 'UI.DataField',
                Value : CITY
            },
            {
                $Type : 'UI.DataField',
                Value : POSTAL_CODE
            },
            {
                $Type : 'UI.DataField',
                Value : PROVINCE
            },
            {
                $Type : 'UI.DataField',
                Value : UNIT_PRICE
            },
            {
                $Type : 'UI.DataField',
                Value : TIME_OFF_DELIVERY
            },
            {
                $Type : 'UI.DataField',
                Value : DELIVERY_DATE
            },
            {
                $Type : 'UI.DataField',
                Value : SALES_ORG
            },
            {
                $Type : 'UI.DataField',
                Value : TAX_AMOUNT
            },
            {
                $Type : 'UI.DataField',
                Value : ORDER_TYPE
            },
            {
                $Type : 'UI.DataField',
                Value : ORDER__REASON
            },
            {
                $Type : 'UI.DataField',
                Value : ORDER_REASON_DESCRIPTION
            },
            {
                $Type : 'UI.DataField',
                Value : VGBEL
            },
            {
                $Type : 'UI.DataField',
                Value : SERIAL_NUMBER
            },
            {
                $Type : 'UI.DataField',
                Value : EXP_DATE
            }
        ],
    }, 
){
    INVOICE_CREDIT_NO@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SSNINVOICE',
                Label : 'Invoice #',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterInOut',
                        LocalDataProperty : 'INVOICE_CREDIT_NO',
                        ValueListProperty : 'INVOICE_CREDIT_NO'
                    }
                ]
            },
        } 
        
    );
    PRODUCT_DESCRIPTION@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SSNPRODDESC',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'PRODUCT_DESCRIPTION',
                        ValueListProperty : 'PRODUCT_DESCRIPTION'
                    }
                ]
            },
        }
        
    );
    LOT@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SSNLOT',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterInOut',
                        LocalDataProperty : 'LOT',
                        ValueListProperty : 'LOT'
                    }
                ]
            },
        }
        
    );
    DOCUMENT_TYPE@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SSNDOCTYPE',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterInOut',
                        LocalDataProperty : 'DOCUMENT_TYPE',
                        ValueListProperty : 'DOCUMENT_TYPE'
                    }
                ]
            },
        }
        
    );
    
    BILL_TO_NAME@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SSNBILLTO',
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
    
    SHIP_TO_NAME@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SSNSHIPTO',
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
    
    MFRNR@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SSNMFRNR',
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
    SALES_ORG@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SSNSALESORG',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'SALES_ORG',
                        ValueListProperty : 'SALES_ORG'
                    }
                ]
            },
        }
        
    );
    
    ORDER_REASON_DESCRIPTION@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SSNORDERREASON',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'ORDER_REASON_DESCRIPTION',
                        ValueListProperty : 'ORDER_REASON_DESCRIPTION'
                    }
                ]
            },
        }
        
    );
    
};