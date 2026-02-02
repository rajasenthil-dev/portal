using CUSTOMERS as service from '../../srv/service';

annotate CUSTOMERS.PRICING with @(
Search.defaultSearchElement: true,
    odata: {
        filterable: {
            VKORG: true,
            KBETR: true,
            KSCHL: true,
            VTEXT: true,
            MATNR: true,
            MAKTX: true,
            MFRNR: true,
            KONWA: true,
            MFRNR_NAME: true
        }
    },
    UI : {
        SelectionFields  : [
            MATNR, MAKTX, VTEXT, VKORG

        ],
        LineItem  : [
            {
                $Type : 'UI.DataField',
                Value : MATNR,

            },
            {
                $Type : 'UI.DataField',
                Value : MAKTX,
            },
            {
                $Type : 'UI.DataField',
                Value : KSCHL,
            },
            {
                $Type : 'UI.DataField',
                Value : VTEXT,
            },
            {
                $Type : 'UI.DataField',
                Value : REGIO,
            },
            {
                $Type : 'UI.DataField',
                Value : KBETR,
            },
            {
                $Type : 'UI.DataField',
                Value : KONWA,
            },
            {
                $Type : 'UI.DataField',
                Value : DATAB,
            },
            {
                $Type : 'UI.DataField',
                Value : VKORG,
            }
        ],
    },   
){
    VTEXT@(
        Common: {
            ValueListWithFixedValues,
            ValueList : {
                $Type : 'Common.ValueListType',
                CollectionPath : 'PRICINGPRICEDESC',
                Label : 'Price Level',
                Parameters : [
                    {
                        $Type : 'Common.ValueListParameterOut',
                        LocalDataProperty : 'VTEXT',
                        ValueListProperty : 'VTEXT'
                    }
                ]
            },
        }
    );
    MATNR@(
        Common: {
                ValueList : {
                    $Type : 'Common.ValueListType',
                    CollectionPath : 'PRICINGPRODUCT',
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
        MAKTX@(
        Common: {
                ValueList : {
                    $Type : 'Common.ValueListType',
                    CollectionPath : 'PRICINGPRODUCTDESC',
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
        MFRNR@(
        Common: {
                ValueListWithFixedValues,
                ValueList : {
                    $Type : 'Common.ValueListType',
                    CollectionPath : 'PRICINGMFRNR',
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
                    CollectionPath : 'PRICINGMFRNRNAME',
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
                    CollectionPath : 'PRICINGSALESORG',
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
}