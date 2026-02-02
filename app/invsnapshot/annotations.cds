using INVENTORY.INVENTORYSNAPSHOT as service from '../../srv/service';

annotate INVENTORY.INVENTORYSNAPSHOT with @(
Search.defaultSearchElement: true,
    odata: {
        filterable: {
            MATNR: true,
            MFRPN: true, 
            MAKTX: true, 
            SIZE:true,
            CHARG:true,
            WAREHOUSE_STATUS:true,
            VKORG:true,
            MFRNR:true,
            LGNUM: true,
            EAN11: true,
            CURRENT: true
        }
    },
    UI : {
        SelectionFields  : [
            MFRPN,
            MATNR,
            MAKTX, 
            CHARG,
            WAREHOUSE_STATUS, 
            REPORT_DATE,
            CURRENT,
            VKORG
            
        ],
        
        LineItem  : [
            {
                $Type : 'UI.DataField',
                Value : CURRENT,
                Label : '{i18n>INVENTORYSNAPSHOT.MATNR}CURRENT'
            },
            {
                $Type : 'UI.DataField',
                Value : MATNR,
                Label : '{i18n>INVENTORYSNAPSHOT.MATNR}'

            },
            {
                $Type : 'UI.DataField',
                Value : MFRPN,
                Label : '{i18n>INVENTORYSNAPSHOT.MFRPN}'

            },
            {
                $Type : 'UI.DataField',
                Value : MAKTX,
                Label : '{i18n>INVENTORYSNAPSHOT.MAKTX}'
                
            },
            {
                $Type : 'UI.DataField',
                Value : SIZE,
                Label : '{i18n>INVENTORYSNAPSHOT.SIZE}',
                ![@HTML5.CssDefaults] : {width : '5rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : CHARG,
                Label : '{i18n>INVENTORYSNAPSHOT.CHARG}'
            },
            {
                $Type : 'UI.DataField',
                Value : VFDAT,
                Label : 'VFDAT'  
            },
            {
                $Type : 'UI.DataField',
                Value : REPORT_DATE,
                Label : '{i18n>INVENTORYSNAPSHOT.REPORT_DATE}'
            },
            {
                $Type : 'UI.DataField',
                Value : DAYS_UNTIL_EXPIRY,
                Label : '{i18n>INVENTORYSNAPSHOT.DAYS_UNTIL_EXPIRY}'
            },
            {
                $Type : 'UI.DataField',
                Value : LGNUM,
                Label : '{i18n>INVENTORYSNAPSHOT.LGNUM}',
                ![@HTML5.CssDefaults] : {width : '15rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : WAREHOUSE_STATUS,
                Label : '{i18n>INVENTORYSNAPSHOT.WAREHOUSE_STATUS}'
            },
            {
                $Type : 'UI.DataField',
                Value : ON_HAND,
                Label : '{i18n>INVENTORYSNAPSHOT.ON_HAND}'
            },
            {
                $Type : 'UI.DataField',
                Value : UNIT,
                Label : '{i18n>INVENTORYSNAPSHOT.UNIT}',
                ![@HTML5.CssDefaults] : {width : '10rem'}
            },
            {
                $Type : 'UI.DataField',
                Value : EAN11,
                Label : '{i18n>INVENTORYSNAPSHOT.EAN11}'
            },
            {
                $Type : 'UI.DataField',
                Value : DIN,
                Label : '{i18n>INVENTORYSNAPSHOT.DIN}'
            },
            {
                $Type : 'UI.DataField',
                Value : RBTXT,
                Label : '{i18n>INVENTORYSNAPSHOT.RBTXT}'
            },
            {
                $Type : 'UI.DataField',
                Value : TBTXT,
                Label : '{i18n>INVENTORYSNAPSHOT.TBTXT}'
            },
             {
                $Type : 'UI.DataField',
                Value : WERKS,
            },
             {
                $Type : 'UI.DataField',
                Value : PLANT_NAME,
                
            },
            {
                $Type : 'UI.DataField',
                Value : VKORG,
                Label : '{i18n>INVENTORYSNAPSHOT.VKORG}'
            }
        ],
    },
    
    
)

{   
    MATNR@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVSNAPPRODSKU',
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
                CollectionPath : 'INVSNAPPROD',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'MFRPN',
                        ValueListProperty : 'MFRPN'
                    }
                ]
            },
        }      
    );
    MAKTX@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVSNAPPRODDESC',
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
    CHARG@(
        Common: {
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVSNAPLOT',
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
                CollectionPath : 'INVSNAPWARESTAT',
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
                CollectionPath : 'INVSNAPPLANTNAME',
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

    
    VKORG@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'INVSNAPVKORG',
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
                CollectionPath : 'INVSNAPMFRNR',
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
                CollectionPath : 'INVSNAPMFRNRNAME',
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