using PROCESSING as service from '../../srv/service';

annotate PROCESSING.BACKORDERS with @(
    
Search.defaultSearchElement: true,
    odata: {
        filterable: {
            DATE_DIFF,
            KUNRE_ANA,
            UDATE,
            VKORG,
            BSTKD,
            EXTENSION,
            VBELN,
            ERDAT,
            UNIT_PRICE,
            MATNR, 
            MAKTX,
            BACK_ORD_QTY,
            KUNWE_ANA, 
            NAME1,
            MFRNR,
            MEINS,
            MFRNR_NAME,
            PLANT,
            PLANT_NAME    
        }
    },
    UI : {
        SelectionFields  : [
           MATNR, MAKTX, KUNRE_ANA, KUNWE_ANA, NAME1, VKORG
        ],
        LineItem  : [
            {
                $Type : 'UI.DataField',
                Value : VBELN,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : BSTKD,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : ERDAT,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : DATE_DIFF,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : UDATE,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : MATNR,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : MAKTX,
                ![@HTML5.CssDefaults] : {width : '15rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : BACK_ORD_QTY,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : MEINS,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },

            {
                $Type : 'UI.DataField',
                Value : UNIT_PRICE,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : EXTENSION,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : KUNRE_ANA,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : KUNWE_ANA,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : NAME1,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : VKORG,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PLANT,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PLANT_NAME,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            }

            
        ],
    },
){
    
    MATNR@(
        Common.ValueList : {
                CollectionPath : 'BOPRODUCT',
                SearchSupported: true,
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterInOut',
                        LocalDataProperty : 'MATNR',
                        ValueListProperty : 'MATNR'
                    }
                ]
            }
        
    );
    MAKTX@(
        Common.ValueList : {
                CollectionPath : 'BOPRODUCTDESC',
                SearchSupported: true,
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterInOut',
                        LocalDataProperty : 'MAKTX',
                        ValueListProperty : 'MAKTX'
                    }
                ]
            }
        
    );
    
    KUNRE_ANA@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'BOBILLTO',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'KUNRE_ANA',
                        ValueListProperty : 'KUNRE_ANA'
                    }
                ]
            },
        }
    );
    KUNWE_ANA@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'BOSHIPTO',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'KUNWE_ANA',
                        ValueListProperty : 'KUNWE_ANA'
                    }
                ]
            },
        }
    );
    NAME1@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'BOSHIPTONAME',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'NAME1',
                        ValueListProperty : 'NAME1'
                    }
                ]
            },
        }
    );
    
    VKORG@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'BOVKORG',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'VKORG',
                        ValueListProperty : 'VKORG'
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
                CollectionPath : 'BOMFRNR',
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
                CollectionPath : 'BOMFRNRNAME',
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