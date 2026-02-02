using INVENTORY as service from '../../srv/service';

annotate INVENTORY.INVENTORYBYLOT with @(
    odata: {
        filterable: {
            MATNR: true,
            WAREHOUSE_STATUS: true,
            EAN11: true,
            ON_HAND: true,
            MFRPN: true,
            DAYS_UNTIL_EXPIRY : true,
            LGNUM: true,
            UNIT: true,
            MFRNR: true,
            MFRNR_NAME: true,
            SIZE: true,
            MAKTX: true,
            CHARG: true,
            VFDAT: true,
            DIN: true,
            PLANT: true,
            PLANT_NAME: true,
            VKBUR: true 
        }
    },
    UI : {
        SelectionFields  : [
            MFRPN, 
            CHARG,
            WAREHOUSE_STATUS,
            VKBUR
            
        ],
        
        LineItem  : [
            {
                $Type : 'UI.DataField',
                Value : MATNR
            },
            {
                $Type : 'UI.DataField',
                Value : MFRPN

            },
            {
                $Type : 'UI.DataField',
                Value : MAKTX,
                ![@HTML5.CssDefaults] : {width : '10rem'}
                
            },
            {
                $Type : 'UI.DataField',
                Value : SIZE
            },
            {
                $Type : 'UI.DataField',
                Value : CHARG
            },
            {
                $Type : 'UI.DataField',
                Value : VFDAT
                
            },
            {
                $Type : 'UI.DataField',
                Value : WAREHOUSE_STATUS,
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : EAN11
            },
            {
                $Type : 'UI.DataField',
                Value : ON_HAND
            },
            {
                $Type : 'UI.DataField',
                Value : UNIT
            },
            {
                $Type : 'UI.DataField',
                Value : DAYS_UNTIL_EXPIRY
            },
            {
                $Type : 'UI.DataField',
                Value : LGNUM
            },
            {
                $Type : 'UI.DataField',
                Value : DIN
            },
            {
                $Type : 'UI.DataField',
                Value : PLANT
            },
            {
                $Type : 'UI.DataField',
                Value : PLANT_NAME
            },
            {
                $Type : 'UI.DataField',
                Value : VKBUR
            }
        ],
    },
    
    
)

{   
    
    MFRPN@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVBYLOTPRODUCTCODE',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterInOut',
                        LocalDataProperty : 'MFRPN',
                        ValueListProperty : 'MFRPN'
                    }
                    
                ]
            },
        } 
    
    );
    
    CHARG@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVBYLOTLOT',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'CHARG',
                        ValueListProperty : 'CHARG'
                    }
                ]
            },
        } 
    
    );
    
    WAREHOUSE_STATUS@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVBYLOTWAREHOUSE',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'WAREHOUSE_STATUS',
                        ValueListProperty : 'WAREHOUSE_STATUS'
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
                CollectionPath : 'INVBYLOTPLANTNAME',
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
                CollectionPath : 'INVBYLOTVKBUR',
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
                CollectionPath : 'INVBYLOTMFRNR',
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
                CollectionPath : 'INVBYLOTMFRNRNAME',
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