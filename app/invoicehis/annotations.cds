using SALES as service from '../../srv/service';

annotate SALES.INVOICEHISTORY with @(
Search.defaultSearchElement: true,
    odata: {
        filterable: {
            BKTXT: true,
            LFDAT: true,
            CAL_GST: true,
            CAL_PST: true,
            ORT01: true,
            MFRNR: true,
            VKORG: true,
            SHIP_TO: true,
            TSL_AMOUNT: true,
            NAME1: true,
            BSTKD: true,
            PSTLZ: true,
            REGIO: true,
            AUBEL: true,
            TRACKN: true,
            BILL_TO: true,
            WAERK: true,
            VBELN: true, 
            CURRENT: true,
            ORDER_TYPE: true,
            FKDAT: true,
            PATIENT_ID: true,
            AUGRU_AUFT: true,
            PLANT_NAME: true,
            WERKS: true,
            BEZEI: true,
            MFRNR_NAME: true,
            MFRNR_7CH
        },
        sortable: {
            BKTXT: true,
            LFDAT: true,
            CAL_GST: true,
            CAL_PST: true,
            ORT01: true,
            MFRNR: true,
            VKORG: true,
            SHIP_TO: true,
            TSL_AMOUNT: true,
            NAME1: true,
            BSTKD: true,
            PSTLZ: true,
            REGIO: true,
            AUBEL: true,
            TRACKN: true,
            BILL_TO: true,
            WAERK: true,
            VBELN: true, 
            CURRENT: true,
            ORDER_TYPE: true,
            FKDAT: true,
            PATIENT_ID: true,
            AUGRU_AUFT: true,
            PLANT_NAME: true,
            WERKS: true,
            BEZEI: true,
            MFRNR_NAME: true,
            MFRNR_7CH
        }
    },
    UI : {
        SelectionFields  : [
             NAME1, SHIP_TO, VBELN, BSTKD, FKDAT, ORDER_TYPE, REGIO, VKORG, BEZEI
        ],
        LineItem  : [
            {
                $Type : 'UI.DataField',
                Value : NAME1
            },
            {
                $Type : 'UI.DataField',
                Value : ORT01
            },
            {
                $Type : 'UI.DataField',
                Value : REGIO
            },
            {
                $Type : 'UI.DataField',
                Value : PSTLZ
            },
            {
                $Type : 'UI.DataField',
                Value : SHIP_TO
            },
            {
                $Type : 'UI.DataField',
                Value : BSTKD
            },
            {
                $Type : 'UI.DataField',
                Value : AUBEL
            },
            {
                $Type : 'UI.DataField',
                Value : VBELN
            },
            {
                $Type : 'UI.DataField',
                Value : FKDAT
            },
            {
                $Type : 'UI.DataField',
                Value : TSL_AMOUNT,
            },
            {
                $Type : 'UI.DataField',
                Value : CAL_PST
            },
            {
                $Type : 'UI.DataField',
                Value : CAL_GST
            },
            {
                $Type : 'UI.DataField',
                Value : ORDER_TYPE
            },
            {
                $Type : 'UI.DataField',
                Value : TRACKN
            },
            {
                $Type : 'UI.DataField',
                Value : LFDAT
            },
            {
                $Type : 'UI.DataField',
                Value : BKTXT
            },
            {
                $Type : 'UI.DataField',
                Value : BEZEI
            },
            {
                $Type : 'UI.DataField',
                Value : PATIENT_ID
            },
            {
                $Type : 'UI.DataField',
                Value : PLANT_NAME
            },
            {
                $Type : 'UI.DataField',
                Value : CURRENT
            },
            {
                $Type : 'UI.DataField',
                Value : VKORG
            }
        ],
    },
){
    NAME1@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'IHCUSTOMER',
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
    REGIO@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'IHPROVINCE',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'REGIO',
                        ValueListProperty : 'REGIO'
                    }
                ]
            },
        } 
        
    );	    
    SHIP_TO@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'IHSHIPTO',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'SHIP_TO',
                        ValueListProperty : 'SHIP_TO'
                    }
                ]
            },
        } 
        
    );    
    BSTKD@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'IHPO',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'BSTKD',
                        ValueListProperty : 'BSTKD'
                    }
                ]
            },
        } 
    );	    
    VBELN@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'IHINVOICE',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'VBELN',
                        ValueListProperty : 'VBELN'
                    }
                ]
            },
        }    
    );    
    ORDER_TYPE@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'IHTYPE',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'ORDER_TYPE',
                        ValueListProperty : 'ORDER_TYPE'
                    }
                ]
            },
        }    
    );
    // --- START: Added Annotation to hide MFRNR based on virtual element ---
    MFRNR@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'IHMFRNR',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'MFRNR',
                        ValueListProperty : 'MFRNR'
                    }
                ]
            },
        },
        // This line links the visibility to the virtual field from your service.js
        
    );
    // --- END: Added Annotation ---
    MFRNR_NAME@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'IHMFRNRNAME',
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
    
    VKORG@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'IHSALESORG',
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
    BEZEI@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'IHBEZEI',
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
    PLANT_NAME@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'IHPLANTNAME',
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