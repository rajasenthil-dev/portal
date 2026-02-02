using CUSTOMERS as service from '../../srv/service';

annotate CUSTOMERS.CUSTOMERMASTER with @(
    odata: {
        filterable: {
            KUNN2_BILLTO: true,
            STRAS_BILLTO: true,
            ORT01_BILLTO: true,
            ERDAT_BILLTO: true,
            NAME1_BILLTO: true,
            PSTLZ_BILLTO: true,
            BEZEI_BILLTO: true,
            KTEXT_BILLTO: true,
            VKORG: true,
            KUNN2_SHIPTO: true,
            STRAS_SHIPTO: true,
            ORT01_SHIPTO: true,
            ERDAT_SHIPTO: true,
            NAME1_SHIPTO: true,
            PSTLZ_SHIPTO: true,
            BEZEI_SHIPTO: true,
            KTEXT_SHIPTO: true,
            CAL_CUST_STATUS: true,
            CAL_TERM: true  
        }
    },
    UI : {
        SelectionFields  : [
            KUNN2_BILLTO,
            KUNN2_SHIPTO,
            NAME1_BILLTO,
            NAME1_SHIPTO,
            CAL_CUST_STATUS,
            VKORG
        ],
        
        LineItem  : [
            {
                $Type : 'UI.DataField',
                Value : KUNN2_BILLTO
            },          
            {
                $Type : 'UI.DataField',
                Value : NAME1_BILLTO
            },
            {
                $Type : 'UI.DataField',
                Value : KUNN2_SHIPTO
            },
            {
                $Type : 'UI.DataField',
                Value : NAME1_SHIPTO
            },
            {
                $Type : 'UI.DataField',
                Value : KTEXT_BILLTO
            },
            {
                $Type : 'UI.DataField',
                Value : KTEXT_SHIPTO
            },
            {
                $Type : 'UI.DataField',
                Value : CAL_TERM
            },
            {
                $Type : 'UI.DataField',
                Value : CREDIT_LIMIT
            },
            {
                $Type : 'UI.DataField',
                Value : STRAS_BILLTO
            },
            {
                $Type : 'UI.DataField',
                Value : ORT01_BILLTO
            },
            {
                $Type : 'UI.DataField',
                Value : PSTLZ_BILLTO
            },
            {
                $Type : 'UI.DataField',
                Value : BEZEI_BILLTO
            },
            {
                $Type : 'UI.DataField',
                Value : STRAS_SHIPTO
            },
            {
                $Type : 'UI.DataField',
                Value : ORT01_SHIPTO
            },
            {
                $Type : 'UI.DataField',
                Value : PSTLZ_SHIPTO
            },
            {
                $Type : 'UI.DataField',
                Value : BEZEI_SHIPTO
            },
            {
                $Type : 'UI.DataField',
                Value : ERDAT_BILLTO
            },
            {
                $Type : 'UI.DataField',
                Value : ERDAT_SHIPTO
            },
            {
                $Type : 'UI.DataField',
                Value : VTEXT
            },
            {
                $Type : 'UI.DataField',
                Value : VKORG
            },
            {
                $Type : 'UI.DataField',
                Value : CAL_CUST_STATUS
            },

        ],
    },
    
    
)

{   
    KUNN2_BILLTO@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'KUNN2_BILLTO',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'KUNN2_BILLTO',
                        ValueListProperty : 'KUNN2_BILLTO'
                    }
                ]
            },
        } 
    );
    NAME1_BILLTO@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'KUNN2_BILLTONAME',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'NAME1_BILLTO',
                        ValueListProperty : 'NAME1_BILLTO'
                    }
                ]
            },
        } 
    );
    KUNN2_SHIPTO@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'KUNN2_SHIPTO',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'KUNN2_SHIPTO',
                        ValueListProperty : 'KUNN2_SHIPTO'
                    }
                ]
            },
        } 
    );
    NAME1_SHIPTO@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'KUNN2_SHIPTONAME',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'NAME1_SHIPTO',
                        ValueListProperty : 'NAME1_SHIPTO'
                    }
                ]
            },
        } 
    );
    CAL_CUST_STATUS@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'CAL_CUST_STATUS',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'CAL_CUST_STATUS',
                        ValueListProperty : 'CAL_CUST_STATUS'
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
                CollectionPath : 'CMSALESORG',
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
};