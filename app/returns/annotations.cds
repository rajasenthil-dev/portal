using PROCESSING as service from '../../srv/service';

annotate PROCESSING.RETURNS with @(
Search.defaultSearchElement: true,
    odata: {
        filterable: {
                CUSTOMER_KUNNR: true,
                CUSTOMER_NAME_NAME1: true,
                PROVINCE_REGIO: true,
                VBELN_VBAK: true,
                REASON_BEZEI: true,
                REFERENCE_BSTKD: true,
                CO_VKORG: true,
                VKBUR: true,
                MFRNR: true
        }
    },
    UI : {
        SelectionFields  : [
           VBELN_VBAK, CUSTOMER_KUNNR, CUSTOMER_NAME_NAME1, REASON_BEZEI, ERDAT, CO_VKORG, VKBUR
        ],
        LineItem  : [
            {
                $Type : 'UI.DataField',
                Value : CURRENT,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : ERDAT,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : CUSTOMER_KUNNR,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}

            },
            {
                $Type : 'UI.DataField',
                Value : CUSTOMER_NAME_NAME1,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PROVINCE_REGIO,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : VBELN_VBAK,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : REFERENCE_BSTKD,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : REASON_BEZEI,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : VBELN_VBRK,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : FKDAT_ANA,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CREDIT_AMT_NETWR,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CO_VKORG,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : VKBUR,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : LFGSK,
                ![@HTML5.CssDefaults] : {width : '4rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : VBTYP,
                ![@HTML5.CssDefaults] : {width : '4rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PLANT,
                ![@HTML5.CssDefaults] : {width : '4rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PLANT_NAME,
                ![@HTML5.CssDefaults] : {width : '4rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CREDIT_IND
            },
            {
                $Type : 'UI.DataField',
                Value : MSR_RET_REASON
            }
            


        ],
    },
){
    CUSTOMER_KUNNR@(
         Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'RETCUST',
                Label : 'Customer #',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'CUSTOMER_KUNNR',
                        ValueListProperty : 'CUSTOMER_KUNNR'
                    }
                ]
            },
        }
    );
    CUSTOMER_NAME_NAME1@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'RETCUSTNAME',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'CUSTOMER_NAME_NAME1',
                        ValueListProperty : 'CUSTOMER_NAME_NAME1'
                    }
                ]
            },
        }
    );
    VBELN_VBAK@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'RETRGA',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'VBELN_VBAK',
                        ValueListProperty : 'VBELN_VBAK'
                    }
                ]
            },
        }

    );
    REASON_BEZEI@(
        
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'RETREASON',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'REASON_BEZEI',
                        ValueListProperty : 'REASON_BEZEI'
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
                CollectionPath : 'RETVKORG',
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
                CollectionPath : 'RETVKBUR',
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
    MFRNR@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'RETMFRNR',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
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
                CollectionPath : 'RETMFRNRNAME',
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
    



};
