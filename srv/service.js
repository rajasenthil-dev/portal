/* ********* Modification Log ************************************************************
Version CHG#:       INCIDENT#:     DATE:       DEVELOPER:
1.0     CHG0243133  INC3591169     Jan-29-26  Raja Senthil N
DESCRIPTION: Ignore below exclusion logic for Customer Master App so that report
             displays customers belong to "HOSPITAL" ship to type for S.Org: 4000 
*******************************************************************************************/
const cds = require('@sap/cds');
const deduplicateForInternal = require('./utils/deduplication');
const { DateTime } = require('luxon');
// const okta = require('./utils/okta-helper');
/**
** Implementation of ALL services. **
**/
module.exports = cds.service.impl(async function () {
  
  /** Your existing "before('*')" normalization handler and all other logic below 
  this.before('*', async (req) => {
    const mfrnr = req.user?.attr?.ManufacturerNumber;
    if (mfrnr && !Array.isArray(mfrnr)) {
      req.user.attr.ManufacturerNumber = [mfrnr];
      console.log(`Normalized ManufacturerNumber to array:`, req.user.attr.ManufacturerNumber);
    }
  }); */
    /**
     * This 'before' handler runs before any operation on any entity in this service.
     * It's the perfect place to prepare the user object for authorization by ensuring
     * the ManufacturerNumber is always an array.
     */
    this.before('*', async (req) => {
        // Normalization logic 
        const mfrnr = req.user?.attr?.ManufacturerNumber;
        if (mfrnr && !Array.isArray(mfrnr)) {
            req.user.attr.ManufacturerNumber = [mfrnr];
            console.log(`Normalized ManufacturerNumber to array:`, req.user.attr.ManufacturerNumber);
        }
    });
    
    // --- Mappings of entity to filters ---
    /**
     * Entity → Filter map for manufacturer 0001000019
     * (Sales Org 1000 and Plant 1010 excluded)
    */
    const entityFilterMapFor0001000019 = {
      SALESBYCURRENTAPP: `(CO_VKORG <> '1000' AND WERKS <> '1010')`,
      SALESBYCURRENTWOPID: `(CO_VKORG <> '1000' AND WERKS <> '1010')`,
      SBCSALESORG: `(CO_VKORG <> '1000')`,
      RETVKORG: `(CO_VKORG <> '1000')`,
      ITEMMASTER: `(SALESORG <> '1000' AND BWKEY <> '1010')`,
      ITEMMASSALESORG: `(SALESORG <> '1000')`,
      INVENTORYSTATUS: `(VKBUR <> '1000' AND PLANT <> '1010')`,
      INVSTATUSVKBUR: `(VKBUR <> '1000')`,
      INVENTORYBYLOT: `(VKBUR <> '1000' AND PLANT <> '1010')`,
      INVENTORYVALUATION: `(VKBUR <> '1000' AND PLANT <> '1010')`,
      INVENTORYAUDITTRAIL: `(SALES_ORG <> '1000' AND WERKS <> '1010')`,
      INVENTORYMB51REP: `(SALES_ORG <> '1000' AND WERKS <> '1010')`,
      IATSALESORG: `(SALES_ORG <> '1000' AND WERKS <> '1010')`,
      CASHJOURNAL: `(VKORG <> '1000')`,
      INVENTORYSNAPSHOT: `(VKORG <> '1000')`,
      FINCJSALESORG: `(VKORG <> '1000')`,
      IHSALESORG: `(VKORG <> '1000')`,
      OPENAR: `(VKORG <> '1000')`,
      OPENARSALESORG: `(VKORG <> '1000')`,
      CUSTOMERMASTER: `(VKORG <> '1000')`,
      CMSALESORG: `(VKORG <> '1000')`,
      SHIPPINGHISTORY: `(VKORG <> '1000')`,
      SHVKORG: `(VKORG <> '1000')`,
      PRICING: `(VKORG <> '1000')`,
      PRICINGSALESORG: `(VKORG <> '1000')`,
      OOVKORG: `(VKORG <> '1000')`,
      BOVKORG: `(VKORG <> '1000')`,
      INVOICEHISTORY: `(VKORG <> '1000' AND WERKS <> '1010')`,
      OPENORDERS: `(VKORG <> '1000' AND PLANT <> '1010')`,
      BACKORDERS: `(VKORG <> '1000' AND PLANT <> '1010')`,
      RETURNS: `(CO_VKORG <> '1000' AND PLANT <> '1010')`,
      SHIPPINGSTATUS: `(VKORG <> '1000' AND WAREHOUSE_NAME_LNUMT <> '1010')`,
      SHIPSTATUSVKORG: `(VKORG <> '1000')`
  };

  const entityFilterMapFor0001000025 = {
      SALESBYCURRENTAPP: `(CO_VKORG = '2006')`,
      SALESBYCURRENTWOPID: `(CO_VKORG = '2006')`,
      SBCSALESORG: `(CO_VKORG = '2006')`,
      RETVKORG: `(CO_VKORG = '2006')`,
      ITEMMASTER: `(SALESORG = '2006')`,
      ITEMMASSALESORG: `(SALESORG = '2006')`,
      INVENTORYSTATUS: `(VKBUR = '2006')`,
      INVSTATUSVKBUR: `(VKBUR = '2006')`,
      INVENTORYBYLOT: `(VKBUR = '2006')`,
      INVENTORYVALUATION: `(VKBUR = '2006')`,
      INVENTORYAUDITTRAIL: `(SALES_ORG = '2006')`,
      INVENTORYMB51REP: `(SALES_ORG = '2006')`,
      IATSALESORG: `(SALES_ORG = '2006')`,
      CASHJOURNAL: `(VKORG = '2006')`,
      INVENTORYSNAPSHOT: `(VKORG = '2006')`,
      FINCJSALESORG: `(VKORG = '2006')`,
      IHSALESORG: `(VKORG = '2006')`,
      OPENAR: `(VKORG = '2006')`,
      OPENARSALESORG: `(VKORG = '2006')`,
      CUSTOMERMASTER: `(VKORG = '2006')`,
      CMSALESORG: `(VKORG = '2006')`,
      SHIPPINGHISTORY: `(VKORG = '2006')`,
      SHVKORG: `(VKORG = '2006')`,
      PRICING: `(VKORG = '2006')`,
      PRICINGSALESORG: `(VKORG = '2006')`,
      OOVKORG: `(VKORG = '2006')`,
      BOVKORG: `(VKORG = '2006')`,
      INVOICEHISTORY: `(VKORG = '2006')`,
      OPENORDERS: `(VKORG = '2006')`,
      BACKORDERS: `(VKORG = '2006')`,
      RETURNS: `(CO_VKORG = '2006')`,
      SHIPPINGSTATUS: `(VKORG = '2006')`,
      SHIPSTATUSVKORG: `(VKORG = '2006')`
  };
  // --- Mappings of entity to filters ---
    /**
     * Entity → Filter map for manufacturer 0001000002(Novartis)
     * (Sales Org 1000 and Plant 1000 excluded)
    */
    const entityFilterMapFor0001000002 = {
      SALESBYCURRENTAPP: `(CO_VKORG <> '1000' AND WERKS <> '1000')`,
      SALESBYCURRENTWOPID: `(CO_VKORG <> '1000' AND WERKS <> '1000')`,
      SBCSALESORG: `(CO_VKORG <> '1000')`,
      RETVKORG: `(CO_VKORG <> '1000')`,
      ITEMMASTER: `(SALESORG <> '1000')`,
      ITEMMASSALESORG: `(SALESORG <> '1000')`,
      INVENTORYSTATUS: `(VKBUR <> '1000' AND PLANT <> '1000')`,
      INVSTATUSVKBUR: `(VKBUR <> '1000')`,
      INVENTORYBYLOT: `(VKBUR <> '1000' AND PLANT <> '1000')`,
      INVENTORYVALUATION: `(VKBUR <> '1000' AND PLANT <> '1000')`,
      INVENTORYAUDITTRAIL: `(SALES_ORG <> '1000' AND WERKS <> '1000')`,
      INVENTORYMB51REP: `(SALES_ORG <> '1000' AND WERKS <> '1000')`,
      IATSALESORG: `(SALES_ORG <> '1000' AND WERKS <> '1000')`,
      CASHJOURNAL: `(VKORG <> '1000')`,
      INVENTORYSNAPSHOT: `(VKORG <> '1000')`,
      FINCJSALESORG: `(VKORG <> '1000')`,
      IHSALESORG: `(VKORG <> '1000')`,
      OPENAR: `(VKORG <> '1000')`,
      OPENARSALESORG: `(VKORG <> '1000')`,
      CUSTOMERMASTER: `(VKORG <> '1000')`,
      CMSALESORG: `(VKORG <> '1000')`,
      SHIPPINGHISTORY: `(VKORG <> '1000')`,
      SHVKORG: `(VKORG <> '1000')`,
      PRICING: `(VKORG <> '1000')`,
      PRICINGSALESORG: `(VKORG <> '1000')`,
      OOVKORG: `(VKORG <> '1000')`,
      BOVKORG: `(VKORG <> '1000')`,
      INVOICEHISTORY: `(VKORG <> '1000' AND WERKS <> '1000')`,
      OPENORDERS: `(VKORG <> '1000' AND PLANT <> '1000')`,
      BACKORDERS: `(VKORG <> '1000' AND PLANT <> '1000')`,
      RETURNS: `(CO_VKORG <> '1000' AND PLANT <> '1000')`,
      SHIPPINGSTATUS: `(VKORG <> '1000' AND WAREHOUSE_NAME_LNUMT <> '1000')`,
      SHIPSTATUSVKORG: `(VKORG <> '1000')`
  };

  /**
   * Entity → Filter map for manufacturer 0001000005
   * (Sales Org 1000 excluded ONLY, allow Plant 1010)
   */
  const salesOrg1000ExclusionMap = {
      SALESBYCURRENTAPP: `(CO_VKORG <> '1000')`,
      SALESBYCURRENTWOPID: `(CO_VKORG <> '1000')`,
      SBCSALESORG: `(CO_VKORG <> '1000')`,
      RETVKORG: `(CO_VKORG <> '1000')`,
      ITEMMASTER: `(SALESORG <> '1000')`,
      ITEMMASSALESORG: `(SALESORG <> '1000')`,
      INVENTORYSTATUS: `(VKBUR <> '1000')`,
      INVSTATUSVKBUR: `(VKBUR <> '1000')`,
      INVENTORYBYLOT: `(VKBUR <> '1000')`,
      INVENTORYVALUATION: `(VKBUR <> '1000')`,
      INVENTORYAUDITTRAIL: `(SALES_ORG <> '1000')`,
      INVENTORYMB51REP: `(SALES_ORG <> '1000')`,
      IATSALESORG: `(SALES_ORG <> '1000')`,
      CASHJOURNAL: `(VKORG <> '1000')`,
      INVENTORYSNAPSHOT: `(VKORG <> '1000')`,
      FINCJSALESORG: `(VKORG <> '1000')`,
      IHSALESORG: `(VKORG <> '1000')`,
      OPENAR: `(VKORG <> '1000')`,
      OPENARSALESORG: `(VKORG <> '1000')`,
      CUSTOMERMASTER: `(VKORG <> '1000')`,
      CMSALESORG: `(VKORG <> '1000')`,
      SHIPPINGHISTORY: `(VKORG <> '1000')`,
      SHVKORG: `(VKORG <> '1000')`,
      PRICING: `(VKORG <> '1000')`,
      PRICINGSALESORG: `(VKORG <> '1000')`,
      OOVKORG: `(VKORG <> '1000')`,
      BOVKORG: `(VKORG <> '1000')`,
      INVOICEHISTORY: `(VKORG <> '1000')`,
      OPENORDERS: `(VKORG <> '1000')`,
      BACKORDERS: `(VKORG <> '1000')`,
      RETURNS: `(CO_VKORG <> '1000')`,
      SHIPPINGSTATUS: `(VKORG <> '1000')`,
      SHIPSTATUSVKORG: `(VKORG <> '1000')`,
      MAINPAGESUMMARY: `(VKORG <> '1000')`,
      MAINPAGEINVENTORY: `(VKORG <> '1000')`
  };
  
  const excludedSKUsFor0001000005 = {
      SALESBYCURRENTAPP: ['1000025', '1000026', '1000035', '1000036', '1000037', '1000055', '1000056', '1000062'],
      SALESBYCURRENTWOPID: ['1000025', '1000026', '1000035', '1000036', '1000037', '1000055', '1000056', '1000062'],
      ITEMMASTER: ['1000025', '1000026', '1000035', '1000036', '1000037', '1000055', '1000056', '1000062'],
      INVENTORYSTATUS: ['1000025', '1000026', '1000035', '1000036', '1000037', '1000055', '1000056', '1000062'],
      INVENTORYBYLOT: ['1000025', '1000026', '1000035', '1000036', '1000037', '1000055', '1000056', '1000062'],
      INVENTORYVALUATION: ['1000025', '1000026', '1000035', '1000036', '1000037', '1000055', '1000056', '1000062'],
      INVENTORYAUDITTRAIL:['1000025', '1000026', '1000035', '1000036', '1000037', '1000055', '1000056', '1000062'], 
      INVENTORYMB51REP:['1000025', '1000026', '1000035', '1000036', '1000037', '1000055', '1000056', '1000062'], 
      INVENTORYSNAPSHOT: ['1000025', '1000026', '1000035', '1000036', '1000037', '1000055', '1000056', '1000062'],
      PRICING: ['1000025', '1000026', '1000035', '1000036', '1000037', '1000055', '1000056', '1000062'],
      OPENORDERS: ['1000025', '1000026', '1000035', '1000036', '1000037', '1000055', '1000056', '1000062'],
      BACKORDERS: ['1000025', '1000026', '1000035', '1000036', '1000037', '1000055', '1000056', '1000062'],
      SHIPPINGSTATUS: ['1000025', '1000026', '1000035', '1000036', '1000037', '1000055', '1000056', '1000062'],
      MAINPAGEINVENTORY: ['1000025', '1000026', '1000035', '1000036', '1000037', '1000055', '1000056', '1000062']
  };
  const skuFieldMap = {
      SALESBYCURRENTAPP: 'SKU_MATNR',
      SALESBYCURRENTWOPID: 'SKU_MATNR',
      ITEMMASTER: 'PRODUCT',
      INVENTORYSTATUS: 'SKU_MATNR',
      INVENTORYBYLOT: 'MATNR',
      INVENTORYVALUATION: 'MATNR',
      INVENTORYAUDITTRAIL:'MATNR', 
      INVENTORYMB51REP:'MATNR',
      INVENTORYSNAPSHOT: 'MATNR',
      PRICING: 'MATNR',
      OPENORDERS: 'MATNR',
      BACKORDERS: 'MATNR',
      SHIPPINGSTATUS: 'OBD_ITEM_NO_ITEMNO',
      MAINPAGEINVENTORY: 'SKU_MATNR'
  };
  /**
   * Manufacturer → Entity Filter Map
   */
  const manufacturerFilterMap = {
      '0001000019': entityFilterMapFor0001000019,
      '0001000005': salesOrg1000ExclusionMap,
      '0001000002': entityFilterMapFor0001000002,  
      '0001000059': salesOrg1000ExclusionMap,
      '0001000025': entityFilterMapFor0001000025  
      // add more if needed
  };

  const fuzzySearchEntities = new Set([
      'ITEMMASTER',
      'ITEMMASPD',
      'ITEMMASMFRNRNAME',
      'ITEMMASCATEGORY',
      'INVENTORYSTATUS',
      'INVSTATUSPLANTNAME',
      'INVSTATUSMFRNRNAME',
      'INVENTORYAUDITTRAIL',
      'INVENTORYMB51REP',
      'IATPLANTNAME',
      'IATTRANTYPE',
      'IATPRODUCTCODE',
      'IATLOT',
      'IATWAREHOUSE',
      'IATCUSTSUPPNAME',
      'IATMFRNRNAME',
      'BILL_TONAME',
      'FINCJMFRNRNAME',
      'INVENTORYSNAPSHOT',
      'INVSNAPPLANTNAME',
      'INVSNAPPRODDESC',
      'INVSNAPLOT',
      'INVSNAPWARESTAT',
      'INVSNAPMFRNRNAME',
      'INVENTORYBYLOT',
      'INVBYLOTPLANTNAME',
      'INVBYLOTPRODUCTCODE',
      'INVBYLOTLOT',
      'INVBYLOTWAREHOUSE',
      'INVBYLOTMFRNRNAME',
      'OPENAR',
      'OPENARCUSTOMER',
      'OPENARMFRNRNAME',
      'INVENTORYVALUATION',
      'INVVALPLANTNAME',
      'INVVALPRODDESC',
      'INVVALMFRNRNAME',
      'INVOICEHISTORY',
      'IHPLANTNAME',
      'IHCUSTOMER',
      'IHTYPE',
      'IHPROVINCE',
      'IHMFRNRNAME',
      'SALESBYCURRENTAPP',
      'SALESBYCURRENTWOPID',
      'SBCPRODDESC',
      'SBCBILLTO',
      'SBCSHIPTO',
      'SBCMFRNRNAME',
      'CUSTOMERMASTER',
      'KUNN2_BILLTONAME',
      'KUNN2_SHIPTONAME',
      'CAL_CUST_STATUS',
      'SHIPPINGHISTORY',
      'SHSHIPTONAME',
      'SHCARRIER',
      'SHMFRNRNAME',
      'PRICING',
      'PRICINGPRICEDESC',
      'PRICINGPRODUCTDESC',
      'PRICINGMFRNRNAME',
      'RETURNS',
      'RETCUSTNAME',
      'RETREASON',
      'RETMFRNRNAME',
      'BACKORDERS',
      'BOPRODUCTDESC',
      'BOSHIPTONAME',
      'BOMFRNRNAME',
      'SHIPPINGSTATUS',
      'SHIPSTATUSPRODDESC',
      'SHIPSTATUSWHSTATUS',
      'SHIPSTATUSMFRNRNAME',
      'MAINPAGESUMMARY',
      'MPSMONTH',
      'SALESSERIALNUMBER',
      'SSNINVOICE',
      'SSNORDERREASON',
      'SSNPRODDESC',
      'SSNDOCTYPE',
      'SSNLOT',
      'SSNBILLTO',
      'SSNSHIPTO',
      'SSNMFRNR',
      'SSNSALESORG',
      'SSNMFRNRNAME'
    ]);
/* Begin of CHG0243133 INC3591169 - Ignore below exclusion logic for Customer Master App
   so that report displays customers belong to "HOSPITAL" ship to type for S.Org: 4000  
    const dynamicEntityRules = {
      CUSTOMERMASTER: {
        triggerField: 'VKORG',       // field to check in the incoming query
        triggerValue: '4000',        // when this value is matched...
        excludeField: 'KTEXT_SHIPTO',// ...exclude records with this field/value
        excludeValue: 'HOSPITAL'
      }
    };
   End of CHG0243133 INC3591169 */
    // Map of fields to exclude from fuzzy LIKE per entity
    const fuzzyExclusions = {
      SALESBYCURRENTAPP: ['CURRENT'],
      SALESBYCURRENTWOPID: ['CURRENT'],
      INVOICEHISTORY: ['CURRENT'],
      INVENTORYAUDITTRAIL: ['CURRENT'],
      INVENTORYSNAPSHOT: ['CURRENT'],
      RETURNS: ['CURRENT'],
      SHIPPINGHISTORY: ['CURRENT'],
      INVENTORYAUDITTRAIL: ['POSTING_DATE'],
      INVENTORYAUDITTRAIL: ['POSTING_TIME']
      // Add other entity → field exclusions here
    };
    const allowedPivotSKUs = [
      '1000199', // Cystadrops
      '1000207', // LEDAGA
      '1000206', '1000205', '1000204', '1000203', // Signifor
      '1000202', '1000198', '1000201', '1000200' // Signifor
    ];

    // For PIVOTTABLE, SKU field is MATNR (same product #)
    const pivotSKUField = 'SKU_MATNR'; 
    // Helper: is the element a string-ish field we can safely fuzzy on?
    function isStringField(req, field) {
      const el = req.target?.elements?.[field];
      const t = el?.type;
      // Treat these as strings; adjust if you use custom types
      return t === 'cds.String' || t === 'cds.LargeString' || t === 'cds.UUID' || t === 'Edm.String';
    }

    this.before('READ', async (req) => {
      const userManufacturer = req.user?.attr?.ManufacturerNumber?.[0];
      const fullEntityName = req.target?.name;
      const entityName = fullEntityName?.split('.').pop();

      console.log(`📥 READ request on ${entityName}, Manufacturer: ${userManufacturer}`);

      let where = req.query.SELECT.where ? [...req.query.SELECT.where] : [];

      // === 1) SKU-based exclusion for manufacturer 0001000005 ===
      if (userManufacturer === '0001000005') {
        const excludedSKUs = excludedSKUsFor0001000005[entityName];
        const skuField = skuFieldMap[entityName];

        if (excludedSKUs?.length && skuField) {
          const skuFilter = {
            xpr: [
              { ref: [skuField] },
              'not in',
              { val: excludedSKUs }
            ]
          };
          console.log(`🧹 SKU Filter for ${entityName}:`, skuFilter);
          if (where.length > 0) where.push('and');
          where.push(skuFilter);
        }
      }

      // === 2) VKORG/PLANT-based filter per manufacturer/entity ===
      const entityFilters = manufacturerFilterMap[userManufacturer];
      const rawFilter = entityFilters?.[entityName];

      if (rawFilter) {
        try {
          const parsedExpr = cds.parse.expr(rawFilter);
          console.log(`🔒 VKORG Filter for ${entityName}:`, rawFilter);
          if (where.length > 0) where.push('and');
          where.push(parsedExpr);
        } catch (e) {
          console.warn(`⚠️ Failed to parse VKORG filter for ${entityName}: ${e.message}`);
        }
      }
/* Begin of CHG0243133 INC3591169 - Ignore below exclusion logic for Customer Master App
   so that report displays customers belong to "HOSPITAL" ship to type for S.Org: 4000
      // === 3) CUSTOMERMASTER SalesOrg = 4000 exclusion logic via entity map ===
      const dynamicRule = dynamicEntityRules[entityName];

      if (dynamicRule && where.length) {
        const { triggerField, triggerValue, excludeField, excludeValue } = dynamicRule;
        let hasTriggerCondition = false;

        // Scan WHERE clause for the trigger condition
        for (let i = 0; i < where.length; i++) {
          const tok = where[i];
          const op = where[i + 1];
          const rhs = where[i + 2];

          if (tok?.ref?.[0] === triggerField && (op === '=' || op === 'eq') && rhs?.val === triggerValue) {
            hasTriggerCondition = true;
            break;
          }
        }

        // If trigger condition exists → add exclusion filter
        if (hasTriggerCondition) {
          const exclusionFilter = {
            xpr: [
              { ref: [excludeField] },
              '!=',
              { val: excludeValue }
            ]
          };

          console.log(`🏥 Dynamic rule for ${entityName}: ${triggerField}=${triggerValue} → exclude ${excludeField}=${excludeValue}`);

          if (where.length > 0) where.push('and');
          where.push(exclusionFilter);
        }
      }
      End of CHG0243133 INC3591169 */
      // === 4) Fuzzy transformation (data-type-safe + per-field exclusions) ===
      if (fuzzySearchEntities.has(entityName) && where.length) {
        const transformed = [];
        const exclusions = new Set(fuzzyExclusions[entityName] || []);

        for (let i = 0; i < where.length; i++) {
          const tok = where[i];

          // copy logical connectors and parentheses
          if (typeof tok === 'string' && (tok === 'and' || tok === 'or' || tok === '(' || tok === ')')) {
            transformed.push(tok);
            continue;
          }

          // preserve complex/nested expressions as-is
          if (tok?.xpr) {
            transformed.push(tok);
            continue;
          }

          // Handle [ref, operator, value] triples
          if (tok?.ref) {
            const field = tok.ref[0];
            const op = where[i + 1];
            const rhs = where[i + 2];

            // If looks like a proper triple, decide to transform or copy
            if (typeof op === 'string' && rhs !== undefined) {
              const isEq = (op === '=' || op === 'eq');
              const rhsIsVal = typeof rhs === 'object' && rhs !== null && ('val' in rhs);

              // Only transform: equality + string field + not excluded + RHS is a literal value
              if (isEq && rhsIsVal && isStringField(req, field) && !exclusions.has(field)) {
                const upperVal = String(rhs.val).toUpperCase();
                // Use 'upper' which compiles cleanly to SQL UPPER(...)
                transformed.push(
                  { func: 'upper', args: [{ ref: [field] }] },
                  'like',
                  { val: `%${upperVal}%` }
                );
                i += 2; // consumed op + rhs
                continue;
              }

              // ✅ Default: copy the triple untouched
              transformed.push(tok, op, rhs);
              i += 2;
              continue;
            }

            // Not a standard triple → copy token
            transformed.push(tok);
            continue;
          }

          // Fallback: copy anything else verbatim
          transformed.push(tok);
        }

        req.query.SELECT.where = transformed;
        console.log(`🔍 Final WHERE (fuzzy, safe) for ${entityName}:`, JSON.stringify(transformed, null, 2));
      } else if (where.length) {
        req.query.SELECT.where = where;
        console.log(`📄 Final WHERE (no fuzzy) for ${entityName}:`, JSON.stringify(where, null, 2));
      }
      // === 5) Restrict PIVOTTABLE to allowed SKU list ===
      if (entityName === 'PIVOTTABLE') {
        const skuConditions = allowedPivotSKUs.map(sku => [
          { ref: [pivotSKUField] }, '=', { val: sku }
        ]);

        // Insert 'or' between each condition
        const xpr = [];
        skuConditions.forEach((c, i) => {
          if (i > 0) xpr.push('or');
          xpr.push(...c);
        });

        const skuFilter = { xpr };

        console.log(`🎯 Filtering PIVOTTABLE SKUs using OR-based filter`, allowedPivotSKUs);

        if (where.length > 0) where.push('and');
        where.push(skuFilter);
      }
    });

    // --- START: Deduplication for Internal users ---

    // Config: entity name => column to deduplicate on
    const dedupConfig = {
        'ITEMMASPD': 'PRODUCTDESCRIPTION_EN',
        'ITEMMASP': 'PRODUCT',
        'ITEMMASMFRNRNAME': 'MFRNR_NAME',
        'ITEMMASPSID': 'MFRNR_PART_NUMBER', 
        'ITEMMASCATEGORY': 'CATEGORY',
        'ITEMMASSALESORG': 'SALESORG',
        'INVSTATUSMFRNRNAME': 'MFRNR_NAME',
        'INVSTATUSPRODUCTCODE': 'PRODUCT_CODE',
        'INVSTATUSVKBUR': 'VKBUR',
        'INVSTATUSPLANTNAME': 'PLANT_NAME',
        'IATPLANTNAME': 'PLANT_NAME',
        'IATTRANTYPE': 'TRAN_TYPE',
        'IATPRODUCTCODE': 'MFRNR_PROD_CODE',
        'IATLOT': 'CHARG',
        'IATSALESORG': 'SALES_ORG',
        'IATWAREHOUSE': 'WAREHOUSE_STATUS',
        'IATCUSTSUPP': 'KUNNR',
        'IATCUSTSUPPNAME': 'CUSTOMER_NAME',
        'IATMFRNRNAME': 'MFRNR_NAME',
/* Begin of MB51 Enhancement */
        'IMBMATDOC': 'MBLNR',
        'IMBMATNR': 'MATNR',
        'IMBMAKTX': 'MAKTX',
        'IMBBATCH': 'CHARG',
        'IMBPLANT': 'WERKS',
        'IMBSORG': 'VKBUR',
        'IMBMTYP': 'BWART',
        'IMBMFRNR': 'MFRNR',
        'IMBMFRNM': 'MFRNR_NAME',
        'IMBMVTXT': 'BTEXT',        
/* End of MB51 Enhancement */
        'BILLINGTYPE': 'DOC_TYPE',
        'BILL_TOS': 'BILL_TO',
        'BILL_TONAME': 'NAME1',
        'FINCJMFRNRNAME': 'MFRNR_NAME',
        'FINCJPRCTR': 'PRCTR',
        'FINCJSALESORG': 'VKORG',
        'INVSNAPPLANTNAME': 'PLANT_NAME',
        'INVSNAPPROD': 'MFRPN',
        'INVSNAPPRODSKU': 'MATNR',
        'INVSNAPPRODDESC': 'MAKTX',
        'INVSNAPLOT': 'CHARG',
        'INVSNAPWARESTAT': 'WAREHOUSE_STATUS',
        'INVSNAPMFRNRNAME': 'MFRNR_NAME',
        'INVSNAPVKORG': 'VKORG',
        'INVBYLOTPLANTNAME': 'PLANT_NAME',
        'INVBYLOTPRODUCTCODE': 'MFRPN',
        'INVBYLOTLOT': 'CHARG',
        'INVBYLOTWAREHOUSE': 'WAREHOUSE_STATUS',
        'INVBYLOTMFRNRNAME': 'MFRNR_NAME',
        'INVBYLOTVKBUR': 'VKBUR',
        'OPENARCUSTOMER': 'NAME1',
        'OPENARCUSTOMERID': 'BILL_TO',
        'OPENARMFRNRNAME': 'MFRNR_NAME',
        'OPENARSALESORG': 'VKORG',
        'INVVALPLANTNAME': 'PLANT_NAME',
        'INVVALPROD': 'MFRPN',
        'INVVALPRODDESC': 'MAKTX',
        'INVVALPRODSKU': 'MATNR',
        'INVVALMFRNRNAME': 'MFRNR_NAME',
        'INVVALVKBUR': 'VKBUR',
        'IHPLANTNAME': 'PLANT_NAME',
        'IHCUSTOMER': 'NAME1',
        'IHSHIPTO': 'SHIP_TO',
        'IHBEZEI': 'BEZEI',
        'IHINVOICE': 'VBELN',
        'IHPO': 'BSTKD',
        'IHTYPE': 'ORDER_TYPE',
        'IHPROVINCE': 'REGIO',
        'IHMFRNRNAME': 'MFRNR_NAME',
        'IHSALESORG': 'VKORG',
        'SBCINVOICE': 'INVOICE_CREDIT_VBELN',
        'SBCBEZEI': 'BEZEI',
        'SBCBEZEIAUART': 'BEZEI_AUART',
        'SBCPLANTNAME': 'PLANT_NAME',
        'SBCPRODDESC': 'PRODUCT_DESCRIPTION_MAKTX',
        'SBCTYPE': 'VTEXT_FKART',
        'SBCWAREHOUSE': 'WAREHOUSE',
        'SBCLOT': 'LOT_CHARG',
        'SBCBILLTO': 'BILL_TO_NAME',
        'SBCBILLTOID': 'BILL_TO_KUNRE_ANA',
        'SBCSHIPTOID': 'SHIP_TO_KUNWE_ANA',
        'SBCSHIPTO': 'SHIP_TO_NAME',
        'SBCMFRNRNAME': 'MFRNR_NAME',
        'SBCSALESORG': 'CO_VKORG',
        'SBCSALESOFFICE': 'VKBUR',
        'SBCYEAR': 'INV_YEAR',
        'SBCCUSTOMERTYPE': 'BILL_TO_TYPE',
        'KUNN2_BILLTO': 'KUNN2_BILLTO',
        'KUNN2_BILLTONAME': 'NAME1_BILLTO',
        'KUNN2_SHIPTO': 'KUNN2_SHIPTO',
        'KUNN2_SHIPTONAME': 'NAME1_SHIPTO',
        'CAL_CUST_STATUS': 'CAL_CUST_STATUS',
        'CMSALESORG': 'VKORG',
        'SHINVOICE': 'KUNAG',
        'SHSHIPTO': 'KUNNR',
        'SHSHIPTONAME': 'NAME1',
        'SHCARRIER': 'CARRIER',
        'SHTRACKING': 'TRACKN',
        'SHMFRNRNAME': 'MFRNR_NAME',
        'SHVKORG': 'VKORG',
        'PRICINGPRICEDESC': 'VTEXT',
        'PRICINGPRODUCTDESC': 'MAKTX',
        'PRICINGPRODUCT': 'MATNR',
        'PRICINGMFRNRNAME': 'MFRNR_NAME',
        'PRICINGSALESORG': 'VKORG',
        'OOVBELN': 'VBELN',
        'OOPRODDESC': 'MAKTX',
        'OOPROD': 'MATNR',
        'OOCUST': 'KUNNR',
        'OOSHIPTO': 'KUNWE_ANA',
        'OOSHIPTONAME': 'CAL_NAME',
        'OOPROVINCE': 'REGIO',
        'OOVKORG': 'VKORG',
        'OOMFRNRNAME': 'MFRNR_NAME',
        'RETCUST': 'CUSTOMER_KUNNR',
        'RETCUSTNAME': 'CUSTOMER_NAME_NAME1',
        'RETREASON': 'REASON_BEZEI',
        'RETRGA': 'VBELN_VBAK',
        'RETVKORG': 'CO_VKORG',
        'RETMFRNRNAME': 'MFRNR_NAME',
        'RETVKBUR': 'VKBUR',
        'BOPRODUCTDESC': 'MAKTX',
        'BOPRODUCT': 'MATNR',
        'BOBILLTO': 'KUNRE_ANA',
        'BOSHIPTO': 'KUNWE_ANA',
        'BOSHIPTONAME': 'NAME1',
        'BOMFRNRNAME': 'MFRNR_NAME',
        'BOVKORG': 'VKORG',
        'MPSYEAR': 'CALYEAR',
        'MPSMONTH': 'MONTH_NAME',
        "SHIPSTATUSSKU": "OBD_ITEM_NO_ITEMNO",
        "SHIPSTATUSCUSTPO": "CUSTOMER_PO_BSTNK",
        "SHIPSTATUSPRODDESC": "PRODUCT_DESCRIPTION_MAKTX",
        "SHIPSTATUSWHSTATUS": "PICK_AND_PACK_STATUS_SALES_SHIPPING_STATUS",
        "SHIPSTATUSVKORG": "VKORG",
        "SHIPSTATUSMFRNRNAME": "MANUFACTURER_NAME_MC_NAME1",
        "SSNSALESORG": "SALES_ORG",
        "SSNMFRNRNAME": "MFRNRNAME",
        "SSNMFRNR": "MFRNR",
        "SSNSHIPTO": "SHIP_TO_NAME",
        "SSNBILLTO": "BILL_TO_NAME",
        "SSNLOT": "LOT",
        "SSNDOCTYPE": "DOCUMENT_TYPE",
        "SSNPRODDESC": "PRODUCT_DESCRIPTION",
        "SSNORDERREASON": "ORDER_REASON_DESCRIPTION",
        "SSNINVOICE": "INVOICE_CREDIT_NO",
        "PIVOTCALYEAR": "CAL_YEAR",
        "PIVOTPROVINCE": "PROVINCE_REGIO"

        // Add more here easily:
        // 'ANOTHERENTITY': 'ANOTHERCOLUMN'
    };

    // Apply deduplication before READ for configured entities
    this.before('READ', (req) => {
        const fullEntityName = req.target?.name;
        const entityName = fullEntityName?.split('.').pop();
    
        console.log(`[Deduplication] Incoming entity: '${fullEntityName}', stripped to: '${entityName}'`);
    
        const columnName = dedupConfig[entityName];
    
        if (!columnName) {
            console.log(`[Deduplication] No dedup config for entity '${entityName}'`);
            return;
        }
    
        deduplicateForInternal(req, columnName);
    });

    this.before("READ", "MAINPAGESUMMARY", (req) => {
        if (req.data.CALYEAR && typeof req.data.CALYEAR === "string") {
          req.data.CALYEAR = parseInt(req.data.CALYEAR, 10);
        }
    });
    // --- START: Refactored logic for role-based field visibility ---

    // 1. Define the list of entities that need this special visibility logic.
    const entitiesWithRoleBasedMfrnr = ['INVOICEHISTORY', 'SALESBYCURRENT'];
/* Comment out as function: "addRoleBasedVisibilityFlag" not Used - Keeping for future reference */
    // 2. Define the 'after' handler to distinguish between Internal and External users.
    const addRoleBasedVisibilityFlag = function(results, req) {
        // If there are no results (e.g., a read for a non-existent ID), exit.
        if (!results) {
            return;
        }

        // --- New Logic ---
        // Check if the user is an internal user. We assume internal users have a specific role.
        // Replace 'Internal' with the actual role name that identifies your internal users.
        const isInternalUser = req.user.is('Internal'); 
        console.log(`Checking user roles. Is Internal User: ${isInternalUser}`);

        // The MFRNR column should be HIDDEN only for users who are NOT internal.
        const shouldHideMfrnr = !isInternalUser;

        // Ensure 'results' is an array to handle both single-item reads (which return an object)
        // and multi-item reads (which return an array).
        const data = Array.isArray(results) ? results : [results];

        // Iterate over each record to set the virtual field's value.
        data.forEach(record => {
            // The virtual field 'isMfrnrHidden' must be defined in your data-model.cds.
            // It will be true if the user is NOT internal, and false if they ARE internal.
            record.isMfrnrHidden = shouldHideMfrnr;
        });
    };

    this.on('READ', 'MediaFile', async (req, next) => {
        
        const isAdmin = req.user.is('Admin');
        const isInternal = req.user.is('Internal') && !isAdmin;
        // If admin, do not apply fallback logic to avoid breaking UI
        if (isAdmin) {
          return next(); // Return real data only
        }
      
        let results = await next();
      
        if (isInternal) {
          console.log("Internal user detected — injecting fallback record");
      
          if (!Array.isArray(results)) results = [];
      
          results.unshift({
            ID: "be12312c-826f-4249-ab71-0823b1929824",
            MFGName: "McKesson",
            content: "image/jpeg",
            createdAt: new Date().toISOString(),
            createdBy: "system",
            fileName: "MCKCAN1.jpg",
            manufacturerNumber: "0002020000",
            mediaType: "image/jpeg",
            modifiedAt: new Date().toISOString(),
            modifiedBy: "system",
            url: "/fallback.jpg", // Or use static hosting
            IsActiveEntity: true,
            isFallbackStub: true
          });
        }
      
        return results;
      });
    

    this.on("READ", "PIVOTTABLE", async (req, next) => {

      let rows = await next();
      if (!rows || rows.length === 0) return rows;

      rows = rows.filter(r =>
        !String(r.MAKTX || "").toUpperCase().includes("BROCHURE")
      );

      const allowedInvoiceTypes = [
        "Invoice",
        "FFS Invoice",
        "Final Invoice",
        "Tax Invoice"
      ];

      rows = rows.filter(r =>
        allowedInvoiceTypes.includes(String(r.VTEXT_FKART || "").trim())
      );

      const aggregated = {};
      for (const row of rows) {
        const key = `${row.PROVINCE_REGIO}::${row.SHIP_TO_NAME}`;

        if (!aggregated[key]) {
          aggregated[key] = { ...row };
        } else {
          const target = aggregated[key];
          [
            "JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE",
            "JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"
          ].forEach(month => {
            target[month] = Number(target[month] || 0) + Number(row[month] || 0);
          });
        }
      }

      const result = Object.values(aggregated).map(r => {
        r.TOTAL =
          Number(r.JANUARY) + Number(r.FEBRUARY) + Number(r.MARCH) + Number(r.APRIL) +
          Number(r.MAY) + Number(r.JUNE) + Number(r.JULY) + Number(r.AUGUST) +
          Number(r.SEPTEMBER) + Number(r.OCTOBER) + Number(r.NOVEMBER) + Number(r.DECEMBER);
        return r;
      });

      // 🔥 NEW: Ensure whole numbers for export & display
      [
        "JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE",
        "JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER",
        "TOTAL"
      ].forEach(field => {
        result.forEach(r => {
          if (r[field] !== null && r[field] !== undefined) {
            r[field] = Math.trunc(r[field]); // drop decimals completely
          }
        });
      });

      return result; 
    });
    // // ⏳ BEFORE READ → rewrite Posting Date filters to CONFIRMED_AT date

    // this.before("READ", "INVENTORYAUDITTRAIL", (req) => {
    //     const where = req.query?.SELECT?.where;
    //     if (!where || !Array.isArray(where)) return;

    //     console.log("📌 RAW WHERE before rewrite:", where);

    //     for (let i = 0; i < where.length; i++) {
    //         let lhs = where[i];
    //         const op = where[i + 1];
    //         let rhs = where[i + 2];

    //         const lhsField = typeof lhs === "string" 
    //             ? lhs.replace(/['"]/g, "")
    //             : lhs?.ref?.[0];

    //         if (lhsField !== "POSTING_DATE") continue;
    //         if (!rhs) continue;

    //         let value = rhs.val ?? rhs;

    //         // Convert YYYYMMDD → YYYY-MM-DD
    //         if (typeof value === "string" && /^\d{8}$/.test(value)) {
    //             value = `${value.slice(0,4)}-${value.slice(4,6)}-${value.slice(6)}`;
    //         }

    //         // Replace LEFT side with date(CONFIRMED_AT)
    //         where[i] = {
    //             func: "date",
    //             args: [{ ref: ["CONFIRMED_AT"] }]
    //         };

    //         // Replace RHS literal
    //         where[i + 2] = { val: value };

    //         console.log(`🔁 Rewrote filter: POSTING_DATE ${op} ${value}`);
    //     }

    //     console.log("📌 RAW WHERE after rewrite:", where);
    // });


    this.on("READ", "INVENTORYAUDITTRAIL", async (req, next) => {
        console.log("🔥 INVENTORYAUDITTRAIL handler STARTED");
        let rows = await next();     // 1) SmartTable filtered rows
        if (!rows.length) return rows;

        // rows.forEach(r => {
        //   if (!r.CONFIRMED_AT) return;

        //   let ts;

        //   if (r.CONFIRMED_AT instanceof Date) {
        //     ts = DateTime.fromJSDate(r.CONFIRMED_AT, { zone: "utc" });
        //   } else if (typeof r.CONFIRMED_AT === "string") {
        //     ts = DateTime.fromISO(r.CONFIRMED_AT.replace(" ", "T"), { zone: "utc" });
        //   } else {
        //     console.warn("⚠️ Unknown CONFIRMED_AT type:", typeof r.CONFIRMED_AT);
        //     return;
        //   }

        //   if (!ts.isValid) {
        //     console.warn("⚠️ Invalid timestamp:", r.CONFIRMED_AT);
        //     return;
        //   }
        //   const local = ts.setZone("America/Toronto");

        //   r.POSTING_DATE = local.toISODate("LLL. d yyyy");        // YYYY-MM-DD
        //   r.POSTING_TIME = local.toFormat("hh:mm:ss a");

        // });

        // 2) Clone query WITHOUT $top, $skip for full aggregation
        const fullQuery = JSON.parse(JSON.stringify(req.query));

        if (fullQuery.SELECT.limit) delete fullQuery.SELECT.limit;  // remove paging
        if (fullQuery.SELECT.orderBy) delete fullQuery.SELECT.orderBy; // remove sorting

        // 3) Fetch all matching rows for real totals
        const all = await cds.run(fullQuery);

        // 4) Aggregate
        const totals = {
            GrandTotal: 0,
            OrderTotal: 0,
            ReceiptTotal: 0,
            AdjustmentsTotal: 0,
            ReturnsTotal: 0,
            PhysicalCountTotal: 0,
            GoodsReceiptPostingTotal: 0,
            GoodsIssuePostingTotal: 0,
            InternalWarehouseMovementTotal: 0,
            PostingChangeTotal: 0,
            PutawayTotal: 0,
            StockRemovalTotal: 0
        };

        for (const r of all) {
            const qty = Number(r.STOCK_QTY || 0);
            totals.GrandTotal += qty;
            const type = (r.TRAN_TYPE || "").normalize("NFKC").replace(/\p{White_Space}+/gu, " ").trim();
            switch (type) {
                case "Order": totals.OrderTotal += qty; break;
                case "Receipt": totals.ReceiptTotal += qty; break;
                case "Adjustment": totals.AdjustmentsTotal += qty; break;
                case "Return": totals.ReturnsTotal += qty; break;
                case "Physical Inventory": totals.PhysicalCountTotal += qty; break;
                case "Goods Receipt Posting": totals.GoodsReceiptPostingTotal += qty; break;
                case "Goods Issue Posting": totals.GoodsIssuePostingTotal += qty; break;
                case "Internal Warehouse Movement": totals.InternalWarehouseMovementTotal += qty; break;
                case "Posting Change": totals.PostingChangeTotal += qty; break;
                case "Putaway": totals.PutawayTotal += qty; break;
                case "Stock Removal": totals.StockRemovalTotal += qty; break;
            }
        }

        // 5) Attach totals to every row
        rows.forEach(r => r._Totals = totals);

        return rows;
    });
    // Handler for Server-Side Aggregation
    this.on('READ', 'GlobalTotals', async (req) => {
        
        // 1. Extract filters applied by the Smart Filter Bar
        const filter = req.query.SELECT.where; 

        // 2. Execute the aggregation query on the main entity.
        // Use the underlying database view name if 'SALESBYCURRENTAPP' is a projection on a view.
        // We use the CDS entity name here:
        const totals = await this.run(
            SELECT.one
                .columns(
                    'sum(TOTAL_AMOUNT) as TotalSales', 
                    'sum(QUANTITY_FKIMG) as TotalUnits', 
                    'count(*) as TotalLines',
                    'count(distinct case when VTEXT_FKART = \'Invoice\' then INVOICE_CREDIT_VBELN end) as UniqueInvoices'
                )
                .from('SALESBYCURRENTAPP') 
                .where(filter) // Apply the filters
        );
        
        // 3. Return the result in the expected singleton structure
        return {
            ID: 1, // Key for the singleton
            TotalSales: totals.TotalSales || 0,
            TotalUnits: totals.TotalUnits || 0,
            TotalLines: totals.TotalLines || 0,
            UniqueInvoices: totals.UniqueInvoices || 0,
        };
    });
  
  //   const { InventoryAuditSummary } = this.entities;

  //   this.on("READ", "InventoryAuditSummary", async (req, next) => {
  //       const tx = cds.tx(req);

  //       // Clone filters sent by SmartFilterBar
  //       const sfbFilters = req.query.SELECT.where || [];

  //       // Build the summary query dynamically
  //       const baseQuery = SELECT.from("INVENTORYAUDITTRAIL")
  //           .columns("TRAN_TYPE", "SUM(STOCK_QTY) AS TOTAL_QTY")
  //           .groupBy("TRAN_TYPE");

  //       // Apply SmartFilterBar filters (date, material, plant, etc)
  //       if (sfbFilters.length > 0) {
  //           baseQuery.where(sfbFilters);
  //       }

  //       return await tx.run(baseQuery);
  //   });
  //   this.on("READ", "InventoryAuditSummary", async (req) => {

  //     const tx = cds.transaction(req);

  //     // Pass SmartFilterBar filters to DB query
  //     const where = req.query.SELECT.where || [];

  //     const invRows = await tx.run(
  //         SELECT.from("INVENTORYAUDITTRAIL")
  //               .columns(
  //                     "TRAN_TYPE",
  //                     "STOCK_QTY"
  //               )
  //               .where(where)
  //     );

  //     // Initialize totals
  //     let summary = {
  //         id: cds.utils.uuid(),
  //         totalQuantity: 0,
  //         orderQuantity: 0,
  //         receiptQuantity: 0,
  //         adjustmentsQuantity: 0,
  //         returnsQuantity: 0,
  //         physicalCountQty: 0
  //     };

  //     // Aggregate rows
  //     for (const row of invRows) {
  //         const qty = Number(row.STOCK_QTY || 0);

  //         summary.totalQuantity += qty;

  //         switch (row.TRAN_TYPE) {
  //             case "Order":
  //                 summary.orderQuantity += qty;
  //                 break;
  //             case "Receipt":
  //                 summary.receiptQuantity += qty;
  //                 break;
  //             case "Adjustments":
  //                 summary.adjustmentsQuantity += qty;
  //                 break;
  //             case "Returns":
  //                 summary.returnsQuantity += qty;
  //                 break;
  //             case "PhysicalCount":
  //                 summary.physicalCountQty += qty;
  //                 break;
  //         }
  //     }

  //     return [summary];
  // });
  await require('./handlers/okta-handlers')(this);
  
});

