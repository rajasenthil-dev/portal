/* ********* Modification Log *****************************************************************
Version CHG#:       INCIDENT#:     DATE:       DEVELOPER:
  1.0   CHG0238269  INC3492677     Jan-12-26  Raja Senthil
DESCRIPTION: App: Inventory Status:- Maintain with "MANUFACTURER_MFRNR" in projection 
Entity: INVSTATUSPRODUCTCODE, INVSTATUSVKBUR in order to filter Value help for External User
based on assigned Manufacturer
  2.0   CHG#        INC#           Jan-26-26  Raja Senthil 
DESCRIPTION: New App: Inventory MB51 Report
***********************************************************************************************/
// Processing Service
using RETURNS as ENTRETURNS from '../db/schema';
using RETCUST as ENTRETCUST from '../db/schema';
using RETCUSTNAME as ENTRETCUSTNAME from '../db/schema';
using RETRGA as ENTRETRGA from '../db/schema';
using RETREASON as ENTRETREASON from '../db/schema';
using RETVKORG as ENTRETVKORG from '../db/schema';
using RETMFRNR as ENTRETMFRNR from '../db/schema';
using RETMFRNRNAME as ENTRETMFRNRNAME from '../db/schema';
using RETVKBUR as ENTRETVKBUR from '../db/schema';

using SHIPPINGHISTORY as ENTSHIPPINGHISTORY from '../db/schema';
using SHINVOICE as ENTSHINVOICE from '../db/schema';
using SHCUSTOMER as ENTSHCUSTOMER from '../db/schema';
using SHCARRIER as ENTSHCARRIER from '../db/schema';
using SHTRACKING as ENTTRACKING from '../db/schema';
using SHSHIPTO as ENTSHSHIPTO from '../db/schema';
using SHSHIPTONAME as ENTSHSHIPTONAME from '../db/schema';
using SHMFRNR as ENTSHMFRNR from '../db/schema';
using SHMFRNRNAME as ENTSHMFRNRNAME from '../db/schema';
using SHVKORG as ENTSHVKORG from '../db/schema';

using BACKORDERS as ENTBACKORDERS from '../db/schema';
using BOPRODUCTDESC as ENTBOPRODUCTDESC from '../db/schema';
using BOPRODUCT as ENTBOPRODUCT from '../db/schema';
using BOSHIPTO as ENTBOSHIPTO from '../db/schema';
using BOSHIPTONAME as ENTBOSHIPTONAME from '../db/schema';
using BOBILLTO as ENTBOBILLTO from '../db/schema';
using BOMFRNR as ENTBOMFRNR from '../db/schema';
using BOMFRNRNAME as ENTBOMFRNRNAME from '../db/schema';
using BOVKORG as ENTBOVKORG from '../db/schema';

using OPENORDERS as ENTOPENORDERS from '../db/schema';
using OOPRODDESC as ENTOOPRODDESC from '../db/schema';
using OOPROD as ENTOOPROD from '../db/schema';
using OOCUST as ENTOOCUST from '../db/schema';
using OOSHIPTO as ENTOOSHIPTO from '../db/schema';
using OOSHIPTONAME as ENTOOSHIPTONAME from '../db/schema';
using OOPROVINCE as ENTOOPROVINCE from '../db/schema';
using OOMFRNR as ENTOOMFRNR from '../db/schema';
using OOVKORG as ENTOOVKORG from '../db/schema';
using OOMFRNRNAME as ENTOOMFRNRNAME from '../db/schema';
using OOVBELN as ENTOOVBELN from '../db/schema';

using SHIPPINGSTATUS as ENTSHIPPINGSTATUS from '../db/schema';
using SHIPSTATUSSKU as ENTSHIPSTATUSSKU from '../db/schema';
using SHIPSTATUSCUSTPO as ENTSHIPSTATUSCUSTPO from '../db/schema';
using SHIPSTATUSPRODDESC as ENTSHIPSTATUSPRODDESC from '../db/schema';
using SHIPSTATUSWHSTATUS as ENTSHIPSTATUSWHSTATUS from '../db/schema';
using SHIPSTATUSVKORG as ENTSHIPSTATUSVKORG from '../db/schema';
using SHIPSTATUSMFRNR as ENTSHIPSTATUSMFRNR from '../db/schema';
using SHIPSTATUSMFRNRNAME as ENTSHIPSTATUSMFRNRNAME from '../db/schema';

service PROCESSING {
    // ℹ️ Returns Related Entities
    // ✅ CDS Authorization Complete
    @requires: 'authenticated-user'
    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity RETURNS as projection on ENTRETURNS;

    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity RETCUST as projection on ENTRETCUST;

    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity RETCUSTNAME as projection on ENTRETCUSTNAME;

    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity RETRGA as projection on ENTRETRGA; 

    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity RETREASON as projection on ENTRETREASON;

    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity RETVKORG as projection on ENTRETVKORG;

    @requires: 'authenticated-user'
    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity RETMFRNR as projection on ENTRETMFRNR;

    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity RETMFRNRNAME as projection on ENTRETMFRNRNAME;

    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity RETVKBUR as projection on ENTRETVKBUR;

    // ℹ️ Shipping History Related Entities
    // ✅ CDS Authorization Complete
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHIPPINGHISTORY as projection on ENTSHIPPINGHISTORY;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHINVOICE as projection on ENTSHINVOICE;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHCUSTOMER as projection on ENTSHCUSTOMER;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHCARRIER as projection on ENTSHCARRIER;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHTRACKING as projection on ENTTRACKING;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHSHIPTO as projection on ENTSHSHIPTO;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHSHIPTONAME as projection on ENTSHSHIPTONAME;
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHMFRNR as projection on ENTSHMFRNR;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHMFRNRNAME as projection on ENTSHMFRNRNAME;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHVKORG as projection on ENTSHVKORG;

    // ℹ️ Open Orders Related Entities
    // ⚠️ CDS Authorization Pending
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OPENORDERS as projection on ENTOPENORDERS;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OOPRODDESC as projection on ENTOOPRODDESC;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OOPROD as projection on ENTOOPROD;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OOSHIPTO as projection on ENTOOSHIPTO;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OOSHIPTONAME as projection on ENTOOSHIPTONAME;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OOCUST as projection on ENTOOCUST;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OOPROVINCE as projection on ENTOOPROVINCE;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OOMFRNR as projection on ENTOOMFRNR;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OOVKORG as projection on ENTOOVKORG;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OOMFRNRNAME as projection on ENTOOMFRNRNAME;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OOVBELN as projection on ENTOOVBELN;

    // ℹ️ Back Orders Related Entities
    // ✅ CDS Authorization Complete
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity BACKORDERS as projection on ENTBACKORDERS;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity BOBILLTO as projection on ENTBOBILLTO;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity BOSHIPTO as projection on ENTBOSHIPTO;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity BOSHIPTONAME as projection on ENTBOSHIPTONAME;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity BOPRODUCTDESC as projection on ENTBOPRODUCTDESC;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity BOPRODUCT as projection on ENTBOPRODUCT;
    // ✅ CDS Authorization Complete    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity BOMFRNR as projection on ENTBOMFRNR;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity BOMFRNRNAME as projection on ENTBOMFRNRNAME;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity BOVKORG as projection on ENTBOVKORG;

    //ℹ️ Shipping Status Related Entities
    //✅ CDS Authorization Complete
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR and $user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHIPPINGSTATUS as projection on ENTSHIPPINGSTATUS;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR and $user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHIPSTATUSSKU as projection on ENTSHIPSTATUSSKU; 

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR and $user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHIPSTATUSCUSTPO as projection on ENTSHIPSTATUSCUSTPO;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR and $user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHIPSTATUSPRODDESC as projection on ENTSHIPSTATUSPRODDESC;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR and $user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHIPSTATUSWHSTATUS as projection on ENTSHIPSTATUSWHSTATUS;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR and $user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHIPSTATUSVKORG as projection on ENTSHIPSTATUSVKORG;
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR and $user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHIPSTATUSMFRNRNAME as projection on ENTSHIPSTATUSMFRNRNAME;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR and $user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SHIPSTATUSMFRNR as projection on ENTSHIPSTATUSMFRNR;
}



// Inventory Audit Trail
using INVENTORYAUDITTRAIL as ENTINVENTORYAUDITTRAIL from '../db/schema';
using IATPRODUCTCODE as ENTIATPRODUCTCODE from '../db/schema';
using IATLOT as ENTIATLOT from '../db/schema';
using IATSALESORG as ENTIATSALESORG from '../db/schema';
using IATWAREHOUSE as ENTIATWAREHOUSE from '../db/schema';
using IATCUSTSUPP as ENTIATCUSTSUPP from '../db/schema';
using IATCUSTSUPPNAME as ENTIATCUSTSUPPNAME from '../db/schema';
using IATMFRNR as ENTIATMFRNR from '../db/schema';
using IATMFRNRNAME as ENTIATMFRNRNAME from '../db/schema';
using IATTRANTYPE as ENTIATTRANTYPE from '../db/schema';
using IATPLANTNAME as ENTIATPLANTNAME from '../db/schema';
// using { InventoryAuditSummary as IAS } from '../db/schema';

// Inventory Status
using INVENTORYSTATUS as ENTINVENTORYSTATUS from '../db/schema';
using INVSTATUSPRODUCTCODE as ENTINVSTATUSPRODUCTCODE from '../db/schema';
using INVSTATUSMFRNR as ENTINVSTATUSMFRNR from '../db/schema';
using INVSTATUSMFRNRNAME as ENTINVSTATUSMFRNRNAME from '../db/schema';
using INVSTATUSVKBUR as ENTINVSTATUSVKBUR from '../db/schema';
using INVSTATUSPLANTNAME as ENTINVSTATUSPLANTNAME from '../db/schema';
//using INVSTATUSWAREHOUSESTATUS as ENTINVSTATUSWAREHOUSESTATUS from '../db/schema';

// Inventory By Lot
using INVENTORYBYLOT as ENTINVENTORYBYLOT from '../db/schema';
using INVBYLOTPRODUCTCODE as ENTINVBYLOTPRODUCTCODE from '../db/schema';
using INVBYLOTLOT as ENTINVBYLOTLOT from '../db/schema';
using INVBYLOTWAREHOUSE as ENTINVBYLOTWAREHOUSE from '../db/schema';
using INVBYLOTMFRNR as ENTINVBYLOTMFRNR from '../db/schema';
using INVBYLOTMFRNRNAME as ENTINVBYLOTMFRNRNAME from '../db/schema';
using INVBYLOTVKBUR as ENTINVBYLOTVKBUR from '../db/schema';
using INVBYLOTPLANTNAME as ENTINVBYLOTPLANTNAME from '../db/schema';

// Inventory Snapshot
using INVENTORYSNAPSHOT as ENTINVENTORYSNAPSHOT from '../db/schema';
using INVSNAPPRODDESC as ENTINVSNAPPRODDESC from '../db/schema';
using INVSNAPPROD as ENTINVSNAPPROD from '../db/schema';
using INVSNAPPRODSKU as ENTINVSNAPPRODSKU from '../db/schema';
using INVSNAPMFRNR as ENTINVSNAPMFRNR from '../db/schema';
using INVSNAPMFRNRNAME as ENTINVSNAPMFRNRNAME from '../db/schema';
using INVSNAPVKORG as ENTINVSNAPVKORG from '../db/schema';
using INVSNAPLOT as ENTINVSNAPLOT from '../db/schema';
using INVSNAPWARESTAT as ENTINVSNAPWARESTAT from '../db/schema';
using INVSNAPPLANTNAME as ENTINVSNAPPLANTNAME from '../db/schema';

// Inventory Valuation
using INVENTORYVALUATION as ENTINVENTORYVALUATION from '../db/schema';
using INVVALPRODDESC as ENTINVVALPRODDESC from '../db/schema';
using INVVALPROD as ENTINVVALPROD from '../db/schema';
using INVVALPRODSKU as ENTINVVALPRODSKU from '../db/schema';
using INVVALMFRNR as ENTINVVALMFRNR from '../db/schema';
using INVVALMFRNRNAME as ENTINVVALMFRNRNAME from '../db/schema';
using INVVALVKBUR as ENTINVVALVKBUR from '../db/schema';
using INVVALPLANTNAME as ENTINVVALPLANTNAME from '../db/schema';

// Item Master
using ITEMMASTER as ENTITEMMASTER from '../db/schema';
using ITEMMASP as ENTITEMMASP from '../db/schema';
using ITEMMASPD as ENTITEMMASPD from '../db/schema';
using ITEMMASPSID as ENTITEMMASPSID from '../db/schema';
using ITEMMASCATEGORY as ENTITEMMASCATEGORY from '../db/schema';
using ITEMMASMFRNR as ENTITEMMASMFRNR from '../db/schema';
using ITEMMASMFRNRNAME as ENTITEMMASMFRNRNAME from '../db/schema';
using ITEMMASSALESORG as ENTITEMMASSALESORG from '../db/schema';
/* Begin of Enhancement - Inventory report: MB51 */
// Inventory MB51 Report
using INVENTORYMB51REP as ENTINVENTORYMB51REP from '../db/schema';
using IMBMATDOC as ENTIMBMATDOC from '../db/schema';
using IMBMATNR as ENTIMBMATNR from '../db/schema';
using IMBMAKTX as ENTIMBMAKTX from '../db/schema';
using IMBBATCH as ENTIMBBATCH from '../db/schema';
using IMBPLANT as ENTIMBPLANT from '../db/schema';
using IMBSORG as ENTIMBSORG from '../db/schema';
using IMBMTYP as ENTIMBMTYP from '../db/schema';
using IMBMFRNR as ENTIMBMFRNR from '../db/schema';
using IMBMFRNM as ENTIMBMFRNM from '../db/schema';
using IMBMVTXT as ENTIMBMVTXT from '../db/schema';
/* End of Enhancement - Inventory report: MB51 */
// Inventory Service
service INVENTORY {
    // ℹ️ Inventory Audit Trail Related Entities
    // ⚠️ CDS Authorization Pending
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVENTORYAUDITTRAIL as projection on ENTINVENTORYAUDITTRAIL;
    
    // @readonly
    // entity InventoryAuditSummary as projection on IAS;
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IATPRODUCTCODE as projection on ENTIATPRODUCTCODE;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IATLOT as projection on ENTIATLOT;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IATWAREHOUSE as projection on ENTIATWAREHOUSE;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IATCUSTSUPP as projection on ENTIATCUSTSUPP;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IATCUSTSUPPNAME as projection on ENTIATCUSTSUPPNAME;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IATMFRNR as projection on ENTIATMFRNR;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IATMFRNRNAME as projection on ENTIATMFRNRNAME;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IATSALESORG as projection on ENTIATSALESORG;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IATTRANTYPE as projection on ENTIATTRANTYPE;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IATPLANTNAME as projection on ENTIATPLANTNAME;

    // ℹ️ Inventory Valuation Related Entities
    // ✅ CDS Authorization Complete
    
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVENTORYVALUATION as projection on ENTINVENTORYVALUATION;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVVALPRODDESC as projection on ENTINVVALPRODDESC;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVVALPROD as projection on ENTINVVALPROD;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVVALPRODSKU as projection on ENTINVVALPRODSKU;
    // ✅ CDS Authorization Complete
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVVALMFRNR as projection on ENTINVVALMFRNR;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVVALMFRNRNAME as projection on ENTINVVALMFRNRNAME;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVVALVKBUR as projection on ENTINVVALVKBUR;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVVALPLANTNAME as projection on ENTINVVALPLANTNAME;

    // ℹ️ Inventory Status Related Entities
    // ✅ CDS Authorization Complete
    @requires: 'authenticated-user'
    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVENTORYSTATUS as projection on ENTINVENTORYSTATUS;
    function calculateInventoryTotals(plant: String, dateFrom: Date, dateTo: Date) returns {
        TotalOpenStock       : Decimal(15,3);
        TotalQuarantine      : Decimal(15,3);
        TotalRetains         : Decimal(15,3);
        TotalQualityHold     : Decimal(15,3);
        TotalReturns         : Decimal(15,3);
        TotalRecalls         : Decimal(15,3);
        TotalInventoryHold   : Decimal(15,3);
        TotalReLabel         : Decimal(15,3);
        TotalDamage          : Decimal(15,3);
        TotalSample          : Decimal(15,3);
    };
    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVSTATUSPRODUCTCODE as projection on ENTINVSTATUSPRODUCTCODE{
        PRODUCT_CODE,
        /* Begin of CHG0238269 - INC3492677, For external User: "MANUFACTURER_MFRNR" to be considered
        as for External user in general data filtered based Manufacturer Number */
        MANUFACTURER_MFRNR
        /* End of CHG0238269 - INC3492677 */    
    }
    group by PRODUCT_CODE;

    // ✅ CDS Authorization Complete
    @requires: 'authenticated-user'
    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVSTATUSMFRNR as projection on ENTINVSTATUSMFRNR;

    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVSTATUSMFRNRNAME as projection on ENTINVSTATUSMFRNRNAME{
        MFRNR_NAME
    }
    group by MFRNR_NAME;
    // @restrict: [
    //     {   
    //         grant: 'READ', 
    //         to: 'Viewer', 
    //         where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR' 
    //     },
    //     { grant: 'READ', to: 'Internal' }
    // ]
    // entity INVSTATUSWAREHOUSESTATUS as projection on ENTINVSTATUSWAREHOUSESTATUS;
    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVSTATUSVKBUR as projection on ENTINVSTATUSVKBUR{
        VKBUR,
        /* Begin of CHG0238269 - INC3492677, For external User: "MANUFACTURER_MFRNR" to be considered,
        as for External user in general data filtered based Manufacturer Number */
        MANUFACTURER_MFRNR
        /* End of CHG0238269 - INC3492677 */
    }
    group by VKBUR;

    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MANUFACTURER_MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVSTATUSPLANTNAME as projection on ENTINVSTATUSPLANTNAME{
        PLANT_NAME
    }
    group by PLANT_NAME;

    // ℹ️ Inventory By Lot Related Entities
    // ✅ CDS Authorization Complete
    @requires: 'authenticated-user'
    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVENTORYBYLOT as projection on ENTINVENTORYBYLOT;

    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVBYLOTPRODUCTCODE as projection on ENTINVBYLOTPRODUCTCODE;

    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVBYLOTLOT as projection on ENTINVBYLOTLOT;

    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVBYLOTWAREHOUSE as projection on ENTINVBYLOTWAREHOUSE;
    // ✅ CDS Authorization Complete
    @requires: 'authenticated-user'
    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVBYLOTMFRNR as projection on ENTINVBYLOTMFRNR;

    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVBYLOTMFRNRNAME as projection on ENTINVBYLOTMFRNRNAME;
    entity INVBYLOTVKBUR as projection on ENTINVBYLOTVKBUR;

    @restrict: [
        {   
            grant: 'READ', 
            to: 'Viewer', 
            where: '$user.ManufacturerNumber = MFRNR' 
        },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVBYLOTPLANTNAME as projection on ENTINVBYLOTPLANTNAME;



    // ℹ️ Item Master Related Entities
    // ⚠️ CDS Authorization Pending
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURERNUMBER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity ITEMMASTER as projection on ENTITEMMASTER;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURERNUMBER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity ITEMMASP as projection on ENTITEMMASP;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURERNUMBER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity ITEMMASPD as projection on ENTITEMMASPD;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURERNUMBER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity ITEMMASPSID as projection on ENTITEMMASPSID;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURERNUMBER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity ITEMMASCATEGORY as projection on ENTITEMMASCATEGORY;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURERNUMBER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity ITEMMASMFRNR as projection on ENTITEMMASMFRNR;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURERNUMBER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity ITEMMASMFRNRNAME as projection on ENTITEMMASMFRNRNAME;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURERNUMBER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity ITEMMASSALESORG as projection on ENTITEMMASSALESORG;


    // ℹ️ Lot Inventory Snapshot Related Entities 
    // ✅ CDS Authorization Complete
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVENTORYSNAPSHOT as projection on ENTINVENTORYSNAPSHOT;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVSNAPPRODDESC as projection on ENTINVSNAPPRODDESC;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVSNAPPROD as projection on ENTINVSNAPPROD;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVSNAPPRODSKU as projection on ENTINVSNAPPRODSKU;
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVSNAPMFRNR as projection on ENTINVSNAPMFRNR;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVSNAPMFRNRNAME as projection on ENTINVSNAPMFRNRNAME;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVSNAPVKORG as projection on ENTINVSNAPVKORG;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVSNAPPLANTNAME as projection on ENTINVSNAPPLANTNAME;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVSNAPLOT as projection on ENTINVSNAPLOT;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVSNAPWARESTAT as projection on ENTINVSNAPWARESTAT;
/* Begin of Enhancement - Inventory report: MB51 */
// Inventory MB51 report
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVENTORYMB51REP as projection on ENTINVENTORYMB51REP;
    
    // Material Document ;
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IMBMATDOC as projection on ENTIMBMATDOC;
    // Material  ;
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IMBMATNR as projection on ENTIMBMATNR;

    // Material Description ;
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IMBMAKTX as projection on ENTIMBMAKTX;

    // Batch  ;
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IMBBATCH as projection on ENTIMBBATCH;

    // Plant  ;
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IMBPLANT as projection on ENTIMBPLANT;

    // Sales Org  ;
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IMBSORG as projection on ENTIMBSORG;

    // Movement Type  ;
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IMBMTYP as projection on ENTIMBMTYP;

    // Manufacturer Number  ;
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IMBMFRNR as projection on ENTIMBMFRNR;

    // Manufacturer Name  ;
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IMBMFRNM as projection on ENTIMBMFRNM;

    // Movement Type Text   ;
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IMBMVTXT as projection on ENTIMBMVTXT;
                                        
/* End of Enhancement - Inventory report: MB51 */
}

using INVOICEHISTORY as ENTINVOICEHISTORY from '../db/schema';
using IHCUSTOMER as ENTIHCUSTOMER from '../db/schema';
using IHSHIPTO as ENTIHSHIPTO from '../db/schema';
using IHINVOICE as ENTIHINVOICE from '../db/schema';
using IHPO as ENTIHPO from '../db/schema';
using IHTYPE as ENTIHTYPE from '../db/schema';
using IHPROVINCE as ENTIHPROVINCE from '../db/schema';
using IHMFRNR as ENTIHMFRNR from '../db/schema';
using IHMFRNRNAME as ENTIHMFRNRNAME from '../db/schema';
using IHSALESORG as ENTIHSALESORG from '../db/schema';
using IHBEZEI as ENTIHBEZEI from '../db/schema';
using IHPLANTNAME as ENTIHPLANTNAME from '../db/schema';

using SALESBYCURRENTWOPID as ENTSALESBYCURRENTWOPID from '../db/schema';
using SALESBYCURRENTAPP as ENTSALESBYCURRENTAPP from '../db/schema';
using SALESBYCURRENT as ENTSALESBYCURRENT from '../db/schema';
using SBCINVOICE as ENTSBCINVOICE from '../db/schema';
using SBCPRODDESC as ENTSBCPRODDESC from '../db/schema';
using SBCTYPE as ENTSBCTYPE from '../db/schema';
using SBCLOT as ENTSBCLOT from '../db/schema';
using SBCWAREHOUSE as ENTSBCWAREHOUSE from '../db/schema';
using SBCBILLTO as ENTSBCBILLTO from '../db/schema';
using SBCSHIPTO as ENTSBCSHIPTO from '../db/schema';
using SBCBILLTOID as ENTSBCBILLTOID from '../db/schema';
using SBCSHIPTOID as ENTSBCSHIPTOID from '../db/schema';
using SBCMFRNR as ENTSBCMFRNR from '../db/schema';
using SBCMFRNRNAME as ENTSBCMFRNRNAME from '../db/schema';
using SBCSALESORG as ENTSBCSALESORG from '../db/schema';
using SBCSALESOFFICE as ENTSBCSALESOFFICE from '../db/schema';
using SBCYEAR as ENTSBCYEAR from '../db/schema';
using SBCBEZEI as ENTSBCBEZEI from '../db/schema';
using SBCBEZEIAUART as ENTSBCBEZEIAUART from '../db/schema';
using SBCPLANTNAME as ENTSBCPLANTNAME from '../db/schema';
using SBCCUSTOMERTYPE as ENTSBCCUSTOMERTYPE from '../db/schema';
using PIVOTTABLE as ENTPIVOTTABLE from '../db/schema';
using PIVOTCALYEAR as ENTPIVOTCALYEAR from '../db/schema';
using PIVOTPROVINCE as ENTPIVOTPROVINCE from '../db/schema';

using SALESSERIALNUMBER as ENTSALESSERIALNUMBER from '../db/schema';
using SSNINVOICE as ENTSSNINVOICE from '../db/schema';
using SSNORDERREASON as ENTSSNORDERREASON from '../db/schema';
using SSNPRODDESC as ENTSSNPRODDESC from '../db/schema';
using SSNDOCTYPE as ENTSSNDOCTYPE from '../db/schema';
using SSNLOT as ENTSSNLOT from '../db/schema';
using SSNBILLTO as ENTSSNBILLTO from '../db/schema';
using SSNSHIPTO as ENTSSNSHIPTO from '../db/schema';
using SSNMFRNR as ENTSSNMFRNR from '../db/schema';
using SSNMFRNRNAME as ENTSSNMFRNRNAME from '../db/schema';
using SSNSALESORG as ENTSSNSALESORG from '../db/schema';


aspect Totals {
    TotalSales                  : Decimal(33, 2);
    TotalUnits                  : Decimal(33, 0);
    TotalLines                  : Integer;
    UniqueInvoices              : Integer;
    PURCHASE_ORDER_BSTKD        : String(35);
    PRODUCT_DESCRIPTION_MAKTX   : String(40); 
    UNITS_PER_CASE              : Integer;
    QUANTITY_FKIMG              : Decimal(13,0);
    AMOUNT_NETWR                : Decimal(20,2);
    LOT_CHARG                   : String(10);
    BILL_TO_KUNRE_ANA           : String(10);
    SHIP_TO_KUNWE_ANA           : String(10);
    BILL_TO_NAME                : String(70);
    SHIP_TO_NAME                : String(70);
    ADDRESS_1                   : String(35);
    ADDRESS_2                   : String(40);
    POSTAL_CODE_PSTLZ           : String(10);
    CITY_ORT01                  : String(35);
    MFRPN                       : String(40);
    PROVINCE_REGIO              : String(3);
    MFRNR                       : String(10);
    UPC_EAN11                   : String(18);
    WAREHOUSE                   : String(12);
    TRACKING_TRACKN             : String(35);
    SKU_MATNR                   : String(7);
    COMMENT                     : String(13);
    CURRENT                     : String(3);
    INVOICE_CREDIT_VBELN        : String(10);
    UNIT_PRICE                  : Decimal(32,2);
    WAERK                       : String(5);
    RBTXT                       : String(20);
    VTEXT_FKART                 : String(40);
    CO_VKORG                    : String(4);
    TBTXT                       : String(60);
    AUGRU_AUFT                  : String(3);
    MWSBP                       : Decimal(18,2);
    VKBUR                       : String(4);
    INVOICE_DATE_FKDAT          : String(8);
    //DELEVERY_DATE_VDATU       : String(8); 
    EXPIRY_DATE_VFDAT           : String(8);
    PATIENT_ID                  : String(20);
    MFRNR_NAME                  : String(35); 
    WERKS                       : String(4);
    PLANT_NAME                  : String(30);
    INV_YEAR                    : String(4);
    AUART                       : String(4);
    BEZEI                       : String(40);
    BEZEI_AUART                 : String(20);
    VBELN_VBAK                  : String(10);
    VGBEL                       : String(10);
    TIME_OFF_DELIVERY           : String(9);
    DELIVERY_DATE               : String(11);
    BILL_TO_TYPE                : String(20);
    KTOKD                       : String(4);
    TXT30                       : String(30);
    KTEXT                       : String(20);
    KZWI1                       : Decimal(34,2);
    KZWI3                       : Decimal(33,2);
    TOTAL_AMOUNT                : Decimal(38,2);
    // OBKNR                    : Integer64     @title : '{i18n>SALESBYCURRENT.OBKNR}';
    SMTP_ADDR                   : String(241);
    TEL_NUMBER                  : String(30);
}
service SALES {
    
    // ℹ️ Ivoice History Related Entities
    // ⚠️ CDS Authorization Pending
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity INVOICEHISTORY as projection on ENTINVOICEHISTORY;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IHCUSTOMER as projection on ENTIHCUSTOMER;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IHSHIPTO as projection on ENTIHSHIPTO;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IHINVOICE as projection on ENTIHINVOICE;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IHPO as projection on ENTIHPO;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IHTYPE as projection on ENTIHTYPE;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IHPROVINCE as projection on ENTIHPROVINCE;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IHMFRNR as projection on ENTIHMFRNR;
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IHMFRNRNAME as projection on ENTIHMFRNRNAME;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IHSALESORG as projection on ENTIHSALESORG;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IHBEZEI as projection on ENTIHBEZEI;

    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity IHPLANTNAME as projection on ENTIHPLANTNAME;



    // ℹ️ Sales By Product/Customer Related Entities
    // ⚠️ CDS Authorization Pending
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    // entity SalesTotals as projection on ENTSalesTotals;
    // @requires: 'authenticated-user'
    // @restrict: [
    //     { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
    //     { grant: 'READ', to: 'Internal' }
    // ]
    entity SALESBYCURRENT as projection on ENTSALESBYCURRENT;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SALESBYCURRENTWOPID as projection on ENTSALESBYCURRENTWOPID;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SALESBYCURRENTAPP as projection on ENTSALESBYCURRENTAPP;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]

    entity SBCINVOICE as projection on ENTSBCINVOICE;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    
    
    entity GlobalTotals : Totals {
        key ID : Integer; 
    };
    
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCPRODDESC as projection on ENTSBCPRODDESC;
    
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCTYPE as projection on ENTSBCTYPE;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCLOT as projection on ENTSBCLOT;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCWAREHOUSE as projection on ENTSBCWAREHOUSE;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCBILLTO as projection on ENTSBCBILLTO;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCSHIPTO as projection on ENTSBCSHIPTO;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCBILLTOID as projection on ENTSBCBILLTOID;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCSHIPTOID as projection on ENTSBCSHIPTOID;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCMFRNR as projection on ENTSBCMFRNR;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCMFRNRNAME as projection on ENTSBCMFRNRNAME;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCSALESORG as projection on ENTSBCSALESORG;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCSALESOFFICE as projection on ENTSBCSALESOFFICE;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCYEAR as projection on ENTSBCYEAR;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCBEZEI as projection on ENTSBCBEZEI;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCBEZEIAUART as projection on ENTSBCBEZEIAUART;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCPLANTNAME as projection on ENTSBCPLANTNAME;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SBCCUSTOMERTYPE as projection on ENTSBCCUSTOMERTYPE;
    
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SALESSERIALNUMBER as projection on ENTSALESSERIALNUMBER;
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SSNINVOICE as projection on ENTSSNINVOICE;

     @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SSNORDERREASON as projection on ENTSSNORDERREASON;

     @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SSNPRODDESC as projection on ENTSSNPRODDESC;
    
     @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SSNDOCTYPE as projection on ENTSSNDOCTYPE;

     @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SSNLOT as projection on ENTSSNLOT;

     @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SSNBILLTO as projection on ENTSSNBILLTO;
    
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SSNSHIPTO as projection on ENTSSNSHIPTO;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SSNMFRNR as projection on ENTSSNMFRNR;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SSNMFRNRNAME as projection on ENTSSNMFRNRNAME;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity SSNSALESORG as projection on ENTSSNSALESORG;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity PIVOTTABLE as projection on ENTPIVOTTABLE;
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity PIVOTCALYEAR as projection on ENTPIVOTCALYEAR;
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity PIVOTPROVINCE as projection on ENTPIVOTPROVINCE;

}

using CUSTOMERMASTER as ENTCUSTOMERMASTER from '../db/schema';
using KUNN2_BILLTO as ENTKUNN2_BILLTO from '../db/schema';
using KUNN2_SHIPTO as ENTKUNN2_SHIPTO from '../db/schema';
using KUNN2_BILLTONAME as ENTKUNN2_BILLTONAME from '../db/schema';
using KUNN2_SHIPTONAME as ENTKUNN2_SHIPTONAME from '../db/schema';
using CAL_CUST_STATUS as ENTCAL_CUST_STATUS from '../db/schema';
using CMSALESORG as ENTCMSALESORG from '../db/schema';

using PRICING as ENTPRICING from '../db/schema';
using PRICINGPRICEDESC as ENTPRICINGPRICEDESC from '../db/schema';
using PRICINGPRODUCTDESC as ENTPRICINGPRODUCTDESC from '../db/schema';
using PRICINGPRODUCT as ENTPRICINGPRODUCT from '../db/schema';
using PRICINGMFRNR as ENTPRICINGMFRNR from '../db/schema';
using PRICINGMFRNRNAME as ENTPRICINGMFRNRNAME from '../db/schema';
using PRICINGSALESORG as ENTPRICINGSALESORG from '../db/schema';

service CUSTOMERS {
    // ℹ️ Customer Listing Related Entities
    // ⚠️ CDS Authorization Pending
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity CUSTOMERMASTER as projection on ENTCUSTOMERMASTER;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity KUNN2_BILLTO as projection on ENTKUNN2_BILLTO;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity KUNN2_SHIPTO as projection on ENTKUNN2_SHIPTO;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity KUNN2_BILLTONAME as projection on ENTKUNN2_BILLTONAME;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity KUNN2_SHIPTONAME as projection on ENTKUNN2_SHIPTONAME;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity CAL_CUST_STATUS as projection on ENTCAL_CUST_STATUS;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.SalesOrg = VKORG' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity CMSALESORG as projection on ENTCMSALESORG;




    // ℹ️ Pricing Related Entities
    // ⚠️ CDS Authorization Pending
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity PRICING as projection on ENTPRICING;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity PRICINGPRICEDESC as projection on ENTPRICINGPRICEDESC;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity PRICINGPRODUCTDESC as projection on ENTPRICINGPRODUCTDESC;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity PRICINGPRODUCT as projection on ENTPRICINGPRODUCT;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity PRICINGMFRNR as projection on ENTPRICINGMFRNR;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity PRICINGMFRNRNAME as projection on ENTPRICINGMFRNRNAME;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity PRICINGSALESORG as projection on ENTPRICINGSALESORG;
}

using CASHJOURNAL as ENTCASHJOURNAL from '../db/schema';
using BILLINGTYPE as ENTBILLINGTYPE from '../db/schema';
using BILL_TOS as ENTBILL_TOS from '../db/schema';
using BILL_TONAME as ENTBILL_TONAME from '../db/schema';
using FINCJMFRNR as ENTFINCJMFRNR from '../db/schema';
using FINCJMFRNRNAME as ENTFINCJMFRNRNAME from '../db/schema';
using FINCJSALESORG as ENTFINCJSALESORG from '../db/schema';
using FINCJPRCTR as ENTFINCJPRCTR from '../db/schema';

using OPENAR as ENTOPENAR from '../db/schema';
using OPENARCUSTOMER as ENTOPENARCUSTOMER from '../db/schema';
using OPENARCUSTOMERID as ENTOPENARCUSTOMERID from '../db/schema';
using OPENARMFRNR as ENTOPENARMFRNR from '../db/schema';
using OPENARMFRNRNAME as ENTOPENARMFRNRNAME from '../db/schema';
using OPENARSALESORG as ENTOPENARSALESORG from '../db/schema';
using OPENARBILLINGTYPE as ENTOPENARBILLINGTYPE from '../db/schema';

service FINANCE {
    // ℹ️ Accounts Receivable Related Entities
    // ⚠️ CDS Authorization Pending
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PROFIT_CENTER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OPENAR as projection on ENTOPENAR;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PROFIT_CENTER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OPENARCUSTOMER as projection on ENTOPENARCUSTOMER;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PROFIT_CENTER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OPENARBILLINGTYPE as projection on ENTOPENARBILLINGTYPE;
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PROFIT_CENTER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OPENARCUSTOMERID as projection on ENTOPENARCUSTOMERID;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PROFIT_CENTER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OPENARMFRNR as projection on ENTOPENARMFRNR;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PROFIT_CENTER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OPENARMFRNRNAME as projection on ENTOPENARMFRNRNAME;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PROFIT_CENTER' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity OPENARSALESORG as projection on ENTOPENARSALESORG;




    // ℹ️ Cash Journal Related Entities
    // ⚠️ CDS Authorization Pending
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PRCTR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity CASHJOURNAL as projection on ENTCASHJOURNAL;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PRCTR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity BILLINGTYPE as projection on ENTBILLINGTYPE;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PRCTR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity BILL_TOS as projection on ENTBILL_TOS;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PRCTR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity BILL_TONAME as projection on ENTBILL_TONAME;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PRCTR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity FINCJMFRNR as projection on ENTFINCJMFRNR;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PRCTR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity FINCJMFRNRNAME as projection on ENTFINCJMFRNRNAME;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PRCTR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity FINCJSALESORG as projection on ENTFINCJSALESORG;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ProfitCentre = PRCTR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity FINCJPRCTR as projection on ENTFINCJPRCTR;
}

using MAINPAGESUMMARY as ENTMAINPAGESUMMARY from '../db/schema';
using MPSYEAR as ENTMPSYEAR from '../db/schema';
using MPSMONTH as ENTMPSMONTH from '../db/schema';
using MPSMFRNR as ENTMPSMFRNR from '../db/schema';
using MAINPAGEINVENTORY as ENTMAINPAGEINVENTORY from '../db/schema';

service MAINPAGE {
    // ⚠️ CDS Authorization Pending
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity MAINPAGESUMMARY as projection on ENTMAINPAGESUMMARY;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity MPSYEAR as projection on ENTMPSYEAR;

    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity MPSMONTH as projection on ENTMPSMONTH;
     @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MFRNR' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity MPSMFRNR as projection on ENTMPSMFRNR;
    // ⚠️ CDS Authorization Pending
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '$user.ManufacturerNumber = MANUFACTURER_MFRPN' },
        { grant: 'READ', to: 'Internal' }
    ]
    entity MAINPAGEINVENTORY as projection on ENTMAINPAGEINVENTORY;


} 


    

service CatalogService {
    @requires: 'authenticated-user'
    @readonly entity Invoices {
        key ID: UUID;
        InvoiceNumber: String;
    }  
}

using MediaFile as ENTMediaFile from '../db/schema';

service Media {
    @requires: 'authenticated-user'
    @restrict: [
        { grant: 'READ', to: 'Viewer', where: '($user.ManufacturerNumber = manufacturerNumber)' },
        { grant: 'READ', to: 'Internal' },
        { grant: ['READ', 'WRITE'], to: 'Admin' }
    ]

    entity MediaFile as projection on ENTMediaFile;
}
annotate Media.MediaFile with @odata.draft.enabled: true;


using LocalUserData as ENTLocalUserData from '../db/schema';


service UserService { // Service name remains the same (Path: /odata/v4/UserService/)
    action createOktaUser(user: UserInput) returns OktaResponse;
    action getOktaGroups(query: String) returns many OktaGroup;
    action createOktaGroup(group: NewOktaGroup) returns OktaGroup;
    action activateUser(userId: String) returns String;
    action deactivateUser(userId: String) returns String;
    action sendActivationEmail(userId: String) returns String;
    action deleteUser(userId: String) returns String;
    // Expose the LocalUserData entity from db (read-only recommended if not edited here)
    @readonly
    entity LocalUserData as projection on ENTLocalUserData;

    // --- Annotations for OKTAUsers Entity ---
    // @UI.LineItem : [ // Defines the table columns
    //     {Value: status, Label: 'Status'},
    //     {Value: firstName, Label: 'First Name'},
    //     {Value: lastName, Label: 'Last Name'},
    //     {Value: email, Label: 'Email'},
    //     {Value: mfgName, Label: 'Manufacturer'},
    //     {Value: salesOrg, Label: 'Sales Org'},
    //     {Value: salesOffice, Label: 'Sales Office'},
    //     {Value: profitCentre, Label: 'Profit Center'},
    //     {Value: groupNames, Label: 'Groups'}
    //     // Note: The "Action" column needs to be added manually in the SmartTable definition in the XML view
    // ]
    // @UI.SelectionFields : [ // Defines the default SmartFilterBar fields
    //     firstName,
    //     lastName,
    //     email,
    //     mfgName,
    //     salesOrg
    // ]
    @cds.persistence.skip
    entity OKTAUsers {
        // Key field
        key id             : String(100) @title: 'User Id';
            // Properties with annotations
            status             : String @title: 'Status';
            firstName          : String @title: 'First Name'; // Already added to SelectionFields above
            lastName           : String @title: 'Last Name'; // Already added to SelectionFields above
            email              : String @title: 'Email'; // Already added to SelectionFields above
            @UI.Hidden             : true // Usually hidden from table/filter
            login              : String @title: 'Login Name';
            salesOffice        : String @title: 'Sales Office';
            profitCentre       : String @title: 'Profit Center';
            salesOrg           : String @title: 'Sales Org'; // Already added to SelectionFields above
            manufacturerNumber : String @title: 'Manufacturer #';
            mfgName            : String @title: 'Manufacturer'; // Already added to SelectionFields above
            @UI.Hidden             : true // Usually hidden from table/filter
            groupIds           : String @title: 'Group Id';
            groupNames         : String @title: 'Group Name';
    }

} // End of service UserService

// service OktaService {
//   action createOktaUser(user: UserInput) returns OktaResponse;
//   action getOktaGroups(query: String) returns many OktaGroup;
//   action createOktaGroup(group: NewOktaGroup) returns OktaGroup;
// }

type OktaGroup {
  id: String;
  profile: GroupProfile;
}

type NewOktaGroup {
  profile: GroupProfile;
}

type GroupProfile {
  name: String;
  description: String;
}

type UserInput {
  profile: Profile;
  groupIds: many String;
}

type Profile {
  firstName: String;
  lastName: String;
  email: String;
  login: String;
  salesOffice: String;
  profitCentre: String;
  salesOrg: String;
  manufacturerNumber: many String;
  mfgName: String;
}

type OktaResponse {
  status: String;
  userId: String;
}

// service UserService {
//   action createOktaUser(user: UserInput) returns OktaResponse;
//   action activateUser(userId: String) returns String;
//   action deactivateUser(userId: String) returns String;

//   // 👇 Add these two:
//   action getOktaGroups(query: String) returns many OktaGroup;
//   action createOktaGroup(group: NewOktaGroup) returns OktaGroup;

//   @cds.persistence.skip
//   entity OKTAUsers {
//     key id: String;
//     firstName: String;
//     lastName: String;
//     email: String;
//     login: String;
//     salesOrg: String;
//     salesOffice: String;
//     profitCentre: String;
//     mfgName: String;
//     manufacturerNumber: String;
//     groupIds: String;
//     groupNames: String;
//   }

//   entity OktaGroups {
//     key id: String;
//     name: String;
//     description: String;
//   }
// }

// type OktaGroup {
//   id: String;
//   profile: GroupProfile;
// }

// type NewOktaGroup {
//   profile: GroupProfile;
// }

// type GroupProfile {
//   name: String;
//   description: String;
// }

// type UserInput {
//   profile: Profile;
//   groupIds: many String;
// }

// type Profile {
//   firstName: String;
//   lastName: String;
//   email: String;
//   login: String;
//   salesOrg: String;
//   salesOffice: String;
//   profitCentre: String;
//   manufacturerNumber: many String;
//   mfgName: String;
// }

// type OktaResponse {
//   status: String;
//   userId: String;
// }