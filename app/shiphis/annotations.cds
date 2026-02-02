using PROCESSING as service from '../../srv/service';

annotate PROCESSING.SHIPPINGHISTORY with @(
Search.defaultSearchElement: true,
    odata: {
        filterable: {
            TRK_DLVTO: true,
            VBELN: true,
            KUNNR: true,
            WADAT_IST: true,
            NAME1: true,
            VKORG: true,
            LFUHR: true,
            CARRIER: true,
            CAL_BILL_ITM_COUNT: true,
            KUNAG: true,
            FKIMG: true,
            MFRNR: true,
            MEINS: true,
            PSTLZ: true,
            LFDAT: true,
            TRACKN: true,
            CURRENT: true,
            MFRNR_NAME: true
        }
    },
    UI : {
        SelectionFields  : [
            VBELN, KUNAG, KUNNR, NAME1, WADAT_IST, TRACKN, CARRIER, VKORG

        ],
        LineItem : [
            {
                $Type : 'UI.DataField',
                Value : CURRENT
            },
            {
                $Type : 'UI.DataField',
                Value : VBELN
            },
            {
                $Type : 'UI.DataField',
                Value : KUNAG
            },
            {
                $Type : 'UI.DataField',
                Value : KUNNR
            },
            {
                $Type : 'UI.DataField',
                Value : NAME1
            },
            {
                $Type : 'UI.DataField',
                Value : PSTLZ
            },
            {
                $Type : 'UI.DataField',
                Value : WADAT_IST
            },
            {
                $Type : 'UI.DataField',
                Value : CARRIER
            },
            {
                $Type : 'UI.DataField',
                Value : PRODUCT_TYPE
            },
            {
                $Type : 'UI.DataField',
                Value : TRACKN
            },
            {
                $Type : 'UI.DataField',
                Value : DELIVERY_DATETIME_TRK_TXT
            },
            {
                $Type : 'UI.DataField',
                Value : GUID_ESI
            },
            {
                $Type : 'UI.DataField',
                Value : DELIVERY_TIMEZONE_TRK_TZONE,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : DOCID
            },
            {
                $Type : 'UI.DataField',
                Value : TRK_DLVTO
            },
            {
                $Type : 'UI.DataField',
                Value : CAL_BILL_ITM_COUNT
            },
            {
                $Type : 'UI.DataField',
                Value : FKIMG
            },
            {
                $Type : 'UI.DataField',
                Value : MEINS
            },
            {
                $Type : 'UI.DataField',
                Value : VKORG
            }
        ],
    },
       
){
    VBELN@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHINVOICE',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'VBELN',
                        ValueListProperty : 'VBELN'
                    }
                ]
            },
        },
    );
    KUNAG@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHCUSTOMER',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'KUNAG',
                        ValueListProperty : 'KUNAG'
                    }
                ]
            },
        },
    );
    KUNNR@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHSHIPTO',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'KUNNR',
                        ValueListProperty : 'KUNNR'
                    }
                ]
            },
        },  
    );
    NAME1@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHSHIPTONAME',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'NAME1',
                        ValueListProperty : 'NAME1'
                    }
                ]
            },
        },  
    );
    CARRIER@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHCARRIER',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'CARRIER',
                        ValueListProperty : 'CARRIER'
                    }
                ]
            },
        }, 
    ); 
    TRACKN@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHTRACKING',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'TRACKN',
                        ValueListProperty : 'TRACKN'
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
                CollectionPath : 'SHVKORG',
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
    MFRNR@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHMFRNR',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'MFRNR',
                        ValueListProperty : 'MFRNR'
                    }
                ]
            },
        }, 
    );  
    MFRNR_NAME@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'SHMFRNRNAME',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'MFRNR_NAME',
                        ValueListProperty : 'MFRNR_NAME'
                    }
                ]
            },
        }, 
    );
   DELIVERY_DATETIME_TRK_TXT @(
    odata.filterable: false,
    UI.HiddenFilter : true
); 
}
