using INVENTORY as service from '../../srv/service';

annotate INVENTORY.INVENTORYVALUATION with @(
Search.defaultSearchElement: true,
    odata: {
        filterable: {
            PLANT: true,
            LGNUM: true,
            MATNR: true,            
            MAKTX: true,
            MFRPN: true,
            MFRNR: true,
            VKBUR: true
        }
    },
    UI : {
        SelectionFields  : [
            MFRPN,
            MATNR,
            MAKTX,
            VKBUR
        ],
        LineItem  : [
            {
                $Type : 'UI.DataField',
                Value : MATNR,

            },
            {
                $Type : 'UI.DataField',
                Value : MFRPN,
                
            },
            {
                $Type : 'UI.DataField',
                Value : MAKTX,
                ![@HTML5.CssDefaults] : {width : '20rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : PLANT,
            },
            {
                $Type : 'UI.DataField',
                Value : PLANT_NAME,
            },
            {
                $Type : 'UI.DataField',
                Value : UNIT_PRICE,
            },
            {
                $Type : 'UI.DataField',
                Value : TOTAL_COST,
            },
            {
                $Type : 'UI.DataField',
                Value : AVAILABLE_COST,
            },
            {
                $Type : 'UI.DataField',
                Value : QUARANTINE_COST,
            },
            {
                $Type : 'UI.DataField',
                Value : DAMAGE_DESTRUCTION_COST,
            },
            {
                $Type : 'UI.DataField',
                Value : RETAINS_COST,
            },
            {
                $Type : 'UI.DataField',
                Value : QUALITY_HOLD_COST,
            },
            {
                $Type : 'UI.DataField',
                Value : RETURNS_COST,
            },
            {
                $Type : 'UI.DataField',
                Value : RECALL_COST,
            },
            {
                $Type : 'UI.DataField',
                Value : INVENTORY_HOLD_COST,
            },
            {
                $Type : 'UI.DataField',
                Value : RELABEL_COST,
            },
            {
                $Type : 'UI.DataField',
                Value : SAMPLE_COST,
            },
            {
                $Type : 'UI.DataField',
                Value : VKBUR,
            }
        ],
    },
){
    MATNR@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVVALPRODSKU',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'MATNR',
                        ValueListProperty : 'MATNR'
                    }
                ]
            },
        } 
    );
    MFRPN@( 
        
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVVALPROD',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'MFRPN',
                        ValueListProperty : 'MFRPN'
                    }
                ]
            },
        } );
    MAKTX@(
        
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVVALPRODDESC',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'MAKTX',
                        ValueListProperty : 'MAKTX'
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
                CollectionPath : 'INVVALPLANTNAME',
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
                CollectionPath : 'INVVALVKBUR',
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
                CollectionPath : 'INVVALMFRNR',
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
                CollectionPath : 'INVVALMFRNRNAME',
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