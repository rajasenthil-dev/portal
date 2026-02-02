using FINANCE as service from '../../srv/service';

annotate FINANCE.OPENAR with @(
    odata: {
        filterable: {
            CAL_1_30: true,
            CAL_31_60: true,
            CAL_61_90: true,
            CAL_AGE: true,
            TSL: true,
            VKORG: true,
            CREDIT_LIMIT: true,
            CAL_CURRENT: true,
            BILL_TO: true,
            NAME1: true,
            BSTKD: true, 
            NETDT: true,
            BELNR: true,
            FKDAT: true,
            ZTERM: true,
            NETWR: true,
            CAL_OVER_90: true,
            STORE_SHIP_TO: true,
            BLART: true,
        }
    },
    UI : {
        SelectionFields  : [
            BILL_TO,
            NAME1,
            FKDAT,
            VKORG,
            DOC_TYPE
        ],
        
        LineItem  : [
            {
                $Type : 'UI.DataField',
                Value : BILL_TO,
                ![@HTML5.CssDefaults] : {width : '5.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : NAME1,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : BELNR,
                ![@HTML5.CssDefaults] : {width : '5.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : BSTKD,
                ![@HTML5.CssDefaults] : {width : '6.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : FKDAT,
                ![@HTML5.CssDefaults] : {width : '5.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : NETDT,
                ![@HTML5.CssDefaults] : {width : '5.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : DOC_TYPE,
                ![@HTML5.CssDefaults] : {width : '5.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : VTEXT_ZTERM
            },
            {
                $Type : 'UI.DataField',
                Value : STORE_SHIP_TO,
                ![@HTML5.CssDefaults] : {width : '5.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CAL_AGE,
                ![@HTML5.CssDefaults] : {width : '3.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CAL_CURRENT,
                ![@HTML5.CssDefaults] : {width : '4.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CAL_1_30,
                ![@HTML5.CssDefaults] : {width : '4.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CAL_31_60,
                ![@HTML5.CssDefaults] : {width : '4.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CAL_61_90,
                ![@HTML5.CssDefaults] : {width : '4.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CAL_OVER_90,
                ![@HTML5.CssDefaults] : {width : '5rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : NETWR_VBRK,
                ![@HTML5.CssDefaults] : {width : '7.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : TSL_CLEARED,
                ![@HTML5.CssDefaults] : {width : '6.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : ZTERM,
                ![@HTML5.CssDefaults] : {width : '6.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CREDIT_LIMIT,
                ![@HTML5.CssDefaults] : {width : '6.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : VKORG,
                ![@HTML5.CssDefaults] : {width : '5.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PROFIT_CENTER,
                ![@HTML5.CssDefaults] : {width : '5.813rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PROFIT_CENTER_NAME
            },

        ],
    },
    
    
)

{
    BILL_TO@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'OPENARCUSTOMERID',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'BILL_TO',
                        ValueListProperty : 'BILL_TO'
                    }
                ]
            },
        }    
        
    );
    NAME1@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'OPENARCUSTOMER',
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
    PROFIT_CENTER@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'OPENARMFRNR',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'PROFIT_CENTER',
                        ValueListProperty : 'PROFIT_CENTER'
                    }
                ]
            },
        }    
        
    );
    PROFIT_CENTER_NAME@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'OPENARMFRNRNAME',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'PROFIT_CENTER_NAME',
                        ValueListProperty : 'PROFIT_CENTER_NAME'
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
                CollectionPath : 'OPENARSALESORG',
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
    DOC_TYPE@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'OPENARBILLINGTYPE',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'DOC_TYPE',
                        ValueListProperty : 'DOC_TYPE'
                    }
                ]
            },
        }    
        
    );
};