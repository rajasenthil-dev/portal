using INVENTORY as service from '../../srv/service';

annotate INVENTORY.INVENTORYMB51REP with @(
    Search.defaultSearchElement: true,
    odata                      : {filterable: {
        MBLNR        : true,
        MATNR        : true,
        MAKTX        : true,
        CHARG        : true,
        WERKS        : true,
        MFRNR_NAME   : true,
        VKBUR        : true,
        BWART        : true,
        MFRNR        : true,
        BTEXT        : true,
        POSTING_YEAR : true,
        BUDAT        : true,
        POSTING_MONTH: true
    }},
    UI                         : {
        SelectionFields: [
            MATNR,
            MAKTX,
            WERKS,
            MFRNR_NAME,
            VKBUR,
            POSTING_YEAR,
            BUDAT
            // POSTING_MONTH
        ],
        LineItem       : [
            {
                $Type                : 'UI.DataField',
                Value                : MBLNR,
                Label                : '{i18n>INVENTORYMB51REP.MBLNR}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : ZEILE,
                Label                : '{i18n>INVENTORYMB51REP.ZEILE}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : WERKS,
                Label                : '{i18n>INVENTORYMB51REP.WERKS}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : LGORT_SID,
                Label                : '{i18n>INVENTORYMB51REP.LGORT_SID}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : VKBUR,
                Label                : '{i18n>INVENTORYMB51REP.VKBUR}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : MATNR,
                Label                : '{i18n>INVENTORYMB51REP.MATNR}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : MAKTX,
                Label                : '{i18n>INVENTORYMB51REP.MAKTX}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : CHARG,
                Label                : '{i18n>INVENTORYMB51REP.CHARG}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : STOCK_QTY,
                Label                : '{i18n>INVENTORYMB51REP.STOCK_QTY}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : MEINS,
                Label                : '{i18n>INVENTORYMB51REP.MEINS}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : BWART,
                Label                : '{i18n>INVENTORYMB51REP.BWART}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : BTEXT,
                Label                : '{i18n>INVENTORYMB51REP.BTEXT}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : POSTING_YEAR,
                Label                : '{i18n>INVENTORYMB51REP.POSTING_YEAR}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : BUDAT,
                Label                : '{i18n>INVENTORYMB51REP.BUDAT}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : POSTING_MONTH,
                Label                : '{i18n>INVENTORYMB51REP.POSTING_MONTH}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            {
                $Type                : 'UI.DataField',
                Value                : MFRNR_NAME,
                Label                : '{i18n>INVENTORYMB51REP.MFRNR_NAME}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            },
            // {
            //     $Type : 'UI.DataField',
            //     Value : MAKTG,
            //     Label : '{i18n>INVENTORYMB51REP.MAKTG}',
            //     ![@HTML5.CssDefaults] : {width : '10rem'}

            // },
            {
                $Type                : 'UI.DataField',
                Value                : MFRNR,
                Label                : '{i18n>INVENTORYMB51REP.MFRNR}',
                ![@HTML5.CssDefaults]: {width: '10rem'}

            }

        ]
    }
)
// Value Help
{
    MBLNR
    @(Common: {ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'IMBMATDOC',
        Parameters    : [{
            $Type            : 'Common.ValueListParameterOut',
            LocalDataProperty: 'MBLNR',
            ValueListProperty: 'MBLNR'
        }]
    }});
    MATNR
    @(Common: {ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'IMBMATNR',
        Parameters    : [{
            $Type            : 'Common.ValueListParameterOut',
            LocalDataProperty: 'MATNR',
            ValueListProperty: 'MATNR'
        }]
    }});

    MAKTX
    @(Common: {ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'IMBMAKTX',
        Parameters    : [{
            $Type            : 'Common.ValueListParameterOut',
            LocalDataProperty: 'MAKTX',
            ValueListProperty: 'MAKTX'
        }]
    }});

    CHARG
    @(Common: {ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'IMBBATCH',
        Parameters    : [{
            $Type            : 'Common.ValueListParameterOut',
            LocalDataProperty: 'CHARG',
            ValueListProperty: 'CHARG'
        }]
    }});
    WERKS
    @(Common: {
        ValueListWithFixedValues,
        ValueList: {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'IMBPLANT',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterOut',
                LocalDataProperty: 'WERKS',
                ValueListProperty: 'WERKS'
            }]
        },
    });
    VKBUR
    @(Common: {
        ValueListWithFixedValues,
        ValueList: {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'IMBSORG',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterOut',
                LocalDataProperty: 'VKBUR',
                ValueListProperty: 'VKBUR'
            }]
        },
    });
    BWART
    @(Common: {ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'IMBMTYP',
        Parameters    : [{
            $Type            : 'Common.ValueListParameterOut',
            LocalDataProperty: 'BWART',
            ValueListProperty: 'BWART'
        }]
    }});
    MFRNR
    @(Common: {
        ValueListWithFixedValues,
        ValueList: {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'IMBMFRNR',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterOut',
                LocalDataProperty: 'MFRNR',
                ValueListProperty: 'MFRNR'
            }]
        },
    });
    MFRNR_NAME
    @(Common: {
        ValueListWithFixedValues,
        ValueList: {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'IMBMFRNM',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterOut',
                LocalDataProperty: 'MFRNR_NAME',
                ValueListProperty: 'MFRNR_NAME'
            }]
        },
    });
    BTEXT
    @(Common: {ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'IMBMVTXT',
        Parameters    : [{
            $Type            : 'Common.ValueListParameterOut',
            LocalDataProperty: 'BTEXT',
            ValueListProperty: 'BTEXT'
        }]
    }});
};
