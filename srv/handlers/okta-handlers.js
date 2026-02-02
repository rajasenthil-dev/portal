// const axios = require('axios');
// const okta = require('../utils/okta-helper');
// const { activateUser, deactivateUser } = require('../utils/okta-helper');
// const cds = require('@sap/cds');

// module.exports = function (srv) {
//     const OKTAUsers = srv.entities.OKTAUsers || srv.entities['UserService.OKTAUsers'];
//     const LocalUserData = srv.entities.LocalUserData || srv.entities['UserService.LocalUserData'];

//     if (!OKTAUsers) {
//         console.warn('⚠️ OKTAUsers entity not found. Skipping Okta handlers.');
//         return;
//     }

//     const ensureString = (val) => Array.isArray(val) ? val.join(', ') : String(val || '');
//     const parseToArray = (val) => Array.isArray(val) ? val : (val || '').split(',').map(s => s.trim()).filter(Boolean);

//     // CREATE Okta User
//     srv.on('createOktaUser', async (req) => {
//         const user = req.data?.user || {};
//         const OKTA_API_TOKEN = process.env.OKTA_API_TOKEN;
//         const OKTA_API_URL = process.env.OKTA_API_URL;

//         if (!OKTA_API_TOKEN || !OKTA_API_URL) {
//             console.error('❌ Missing Okta environment variables.');
//             return req.error(500, 'Okta API configuration is missing.');
//         }

//         const payload = {
//             profile: {
//                 firstName: user.profile?.firstName,
//                 lastName: user.profile?.lastName,
//                 email: user.profile?.email,
//                 login: user.profile?.email,
//                 salesOffice: user.profile?.salesOffice,
//                 profitCentre: user.profile?.profitCentre,
//                 salesOrg: user.profile?.salesOrg,
//                 manufacturerNumber: user.profile?.manufacturerNumber,
//                 mfgName: user.profile?.mfgName
//             },
//             groupIds: parseToArray(user.groupIds)
//         };

//         try {
//             const response = await axios.post(
//                 `${OKTA_API_URL}users?activate=true`,
//                 payload,
//                 {
//                 headers: {
//                     'Authorization': `SSWS ${OKTA_API_TOKEN}`,
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json'
//                 }
//                 }
//             );

//             console.log(`✅ Created Okta user: ${response.data?.id}`);
//             return {
//                 status: 'success',
//                 userId: response.data?.id
//             };

//         } catch (error) {
//             console.error('❌ Error creating Okta user:', {
//                 message: error.message,
//                 status: error.response?.status,
//                 data: error.response?.data
//             });
//             return req.error(500, 'Failed to create user in Okta.');
//         }
//     });

//     // READ Okta Users
//     srv.on('READ', OKTAUsers, async (req) => {
//         console.log('📡 Reading users from Okta + local DB');

//         try {
//             const oktaUsers = await okta.listMFGUsers();
//             let local = [];

//             if (cds.db) {
//                 try {
//                 local = await SELECT.from(LocalUserData);
//                 } catch (dbErr) {
//                 console.warn('⚠️ Local DB query failed:', dbErr.message);
//                 }
//             }

//             const merged = oktaUsers.map(u => {
//                 const localRow = local.find(r => r.id === u.id);
//                 return {
//                     ...u,
//                     ...localRow,
//                     manufacturerNumber: ensureString(localRow?.manufacturerNumber || u.manufacturerNumber),
//                     groupNames: ensureString(localRow?.groupNames || u.groupNames),
//                     groupIds: ensureString(localRow?.groupIds || u.groupIds),
//                     mfgName: localRow?.manufacturerName || u.mfgName,
//                     salesOrg: localRow?.salesOrg || u.salesOrg,
//                     salesOffice: localRow?.salesOffice || u.salesOffice,
//                     profitCentre: localRow?.profitCentre || u.profitCentre,
//                 };
//             });

//             const top = req.query?.SELECT?.limit?.rows?.val || 50;
//             const skip = req.query?.SELECT?.limit?.offset?.val || 0;
//             req._.count = merged.length;

//             const paginated = merged.slice(skip, skip + top);
//             console.log(`✅ Returned ${paginated.length} of ${merged.length} users`);

//             return paginated;

//         } catch (err) {
//             console.error('❌ Failed to fetch Okta users:', err.message);
//             return req.error(500, 'Failed to read users from Okta.');
//         }
//     });

//     srv.on('UPDATE', OKTAUsers, async (req) => {
//         let id = req.params?.[0]?.id || req.data.id;
//         if (typeof id === 'object') id = id.id;

//         if (!id || typeof id !== 'string') {
//             console.error(`[ERROR] Invalid user ID: ${JSON.stringify(req.params)}`);
//             return req.error(400, `Invalid ID: ${JSON.stringify(req.params)}`);
//         }

//         const payload = req.data || {};
//         const oktaProfile = {};
//         const oktaPayload = { profile: oktaProfile };

//         // Map user fields to Okta profile
//         if (payload.firstName) oktaProfile.firstName = payload.firstName;
//         if (payload.lastName) oktaProfile.lastName = payload.lastName;
//         if (payload.email) {
//             oktaProfile.email = payload.email;
//             oktaProfile.login = payload.email;
//         }

//         ['salesOrg', 'salesOffice', 'profitCentre', 'mfgName'].forEach((field) => {
//             if (payload[field]) oktaProfile[field] = payload[field];
//         });

//         if (payload.manufacturerNumber) {
//             oktaPayload.profile.manufacturerNumber = payload.manufacturerNumber.split(',').map(s => s.trim());
//         }

//         try {
//             console.log(`[INFO] Updating Okta user ${id} with payload:`, JSON.stringify(oktaPayload, null, 2));

//             // Call Okta helper (assumes you have a function for this)
//             await okta.updateUser(id, oktaPayload);

//             req.info(`✅ Successfully updated Okta user ${id}`);
//             return req.reply();
//         } catch (err) {
//             console.error(`[ERROR] Failed to update Okta user ${id}:`, err?.response?.data || err.message);
//             return req.error(500, 'Failed to update Okta user.');
//         }
//     });
    
//     // GET Okta Groups
//     // In your handler
//     srv.on('getOktaGroups', async (req) => {
//         try {
//             const OKTA_API_TOKEN = process.env.OKTA_API_TOKEN;
//             const OKTA_API_URL = process.env.OKTA_API_URL;

//             const response = await axios.get(`${OKTA_API_URL}groups?q=MFG`, {
//                 headers: {
//                     'Authorization': `SSWS ${OKTA_API_TOKEN}`,
//                     'Accept': 'application/json'
//                 }
//             });

//             console.log(`✅ Retrieved ${response.data.length} Okta groups.`);

//             return response.data.map(group => ({
//                 id: group.id,
//                 name: group.profile?.name || '',
//                 description: group.profile?.description || ''
//             }));
//         } catch (err) {
//             console.error('❌ Error fetching Okta groups:', err?.response?.data || err.message);
//             return req.error(500, 'Failed to fetch Okta groups.');
//         }
//     });
//     // srv.on('getOktaGroups', async (req) => {
//     //     const OKTA_API_TOKEN = process.env.OKTA_API_TOKEN;
//     //     const OKTA_API_URL = process.env.OKTA_API_URL;

//     //     if (!OKTA_API_TOKEN || !OKTA_API_URL) {
//     //         return req.error(500, 'Okta API credentials not configured.');
//     //     }

//     //     try {
//     //         const response = await axios.get(
//     //             `${OKTA_API_URL}groups?q=MFG`,
//     //             {
//     //             headers: {
//     //                 'Authorization': `SSWS ${OKTA_API_TOKEN}`,
//     //                 'Accept': 'application/json'
//     //             }
//     //             }
//     //         );

//     //         console.log(`✅ Retrieved ${response.data.length} Okta groups.`);
//     //         return response.data.map(group => ({
//     //             id: group.id,
//     //             profile: {
//     //             name: group.profile.name,
//     //             description: group.profile.description
//     //             }
//     //         }));

//     //     } catch (err) {
//     //         console.error('❌ Error fetching Okta groups:', err?.response?.data || err.message);
//     //         return req.error(500, 'Failed to fetch Okta groups.');
//     //     }
//     // });

//     // CREATE Okta Group
//     srv.on('createOktaGroup', async (req) => {
//         const OKTA_API_TOKEN = process.env.OKTA_API_TOKEN;
//         const OKTA_API_URL = process.env.OKTA_API_URL;
//         const groupData = req.data?.group;

//         if (!OKTA_API_TOKEN || !OKTA_API_URL) {
//             return req.error(500, 'Okta API credentials not configured.');
//         }

//         try {
//             const response = await axios.post(
//                 `${OKTA_API_URL}groups`,
//                 { profile: groupData?.profile },
//                 {
//                 headers: {
//                     'Authorization': `SSWS ${OKTA_API_TOKEN}`,
//                     'Content-Type': 'application/json'
//                 }
//                 }
//             );

//             console.log(`✅ Created Okta group: ${response.data?.id}`);
//             console.log("🔍 Raw Okta group response:", JSON.stringify(response.data, null, 2));
//             return {
//                 id: response.data.id,
//                 profile: {
//                 name: response.data.profile.name,
//                 description: response.data.profile.description
//                 }
                

//             };
            

//         } catch (err) {
//             console.error('❌ Error creating Okta group:', err?.response?.data || err.message);
//             return req.error(500, 'Failed to create Okta group.');
//         }
//     });

//     // READ all Okta Groups (for UI drop-down etc.)
//     srv.on('READ', 'OktaGroups', async () => {
//         try {
//             const groups = await okta.listGroups({ limit: 1000 });
//             return (groups || []).map(g => ({
//                 id: g.id,
//                 name: g.profile?.name || g.name,
//             }));
//         } catch (err) {
//             console.error('❌ Error reading OktaGroups:', err.message);
//             return [];
//         }
//     });
    
//     srv.on('activateUser', async (req) => {
//         const { userId } = req.data;
//         if (!userId) return req.error(400, 'Missing userId');

//         try {
//             const result = await activateUser(userId);
//             req.info(`✅ Activated user ${userId}`);
//             return { status: 'activated', data: result };
//         } catch (error) {
//             console.error(`[ActivateUser] Error activating user ${userId}:`, error?.response?.data || error.message);
//             return req.error(500, `Failed to activate user ${userId}`);
//         }
//     });

//     srv.on('deactivateUser', async (req) => {
//         const { userId } = req.data;
//         if (!userId) return req.error(400, 'Missing userId');

//         try {
//             const result = await deactivateUser(userId);
//             req.info(`✅ Deactivated user ${userId}`);
//             return { status: 'deactivated', data: result };
//         } catch (error) {
//             console.error(`[DeactivateUser] Error deactivating user ${userId}:`, error?.response?.data || error.message);
//             return req.error(500, `Failed to deactivate user ${userId}`);
//         }
//     });
// };
const okta = require('../utils/okta-helper');

module.exports = async function (srv) {
    console.log('✅ [okta-handlers] File loaded');

  const OKTAUsers = srv.entities.OKTAUsers || srv.entities['UserService.OKTAUsers'];

  /** --------------------
   *  READ Okta Users (virtual entity)
   *  ------------------- */
  srv.on('READ', 'OKTAUsers', async (req) => {
    try {
      const users = await okta.listUsersInMFGGroups();
      return users;
    } catch (err) {
      console.error('❌ [READ OKTAUsers] Failed:', err.message);
      return req.error(500, 'Failed to fetch users from Okta.');
    }
  });

  /** --------------------
   *  READ Okta Groups (for dropdowns or config)
   *  ------------------- */
  srv.on('READ', 'OktaGroups', async (req) => {
    try {
      const groups = await okta.listGroups('MFG');
      return groups;
    } catch (err) {
      console.error('❌ [READ OktaGroups] Failed:', err.message);
      return req.error(500, 'Failed to fetch Okta groups.');
    }
  });

  /** --------------------
   *  CREATE Okta User
   *  ------------------- */
  srv.on('createOktaUser', async (req) => {
    const user = req.data.user;

    if (!user?.profile?.email) {
      return req.error(400, 'Missing user email.');
    }

    try {
      const result = await okta.createUser(user.profile, user.groupIds || []);
      return { status: 'success', userId: result.id };
    } catch (err) {
      console.error('❌ [createOktaUser] Failed:', err.message);
      return req.error(500, 'User creation failed.');
    }
  });

  /** --------------------
   *  UPDATE Okta User
   *  ------------------- */
  srv.on('UPDATE', 'OKTAUsers', async (req) => {
    const id = req.data.id;

    if (!id) return req.error(400, 'Missing user ID.');

    try {
      const groupIds = req.data.groupIds?.split(',').map(s => s.trim()) || [];
      const manufacturerNumber = req.data.manufacturerNumber?.split(',').map(s => s.trim()) || [];
      console.log(groupIds)
      console.log(manufacturerNumber)

      const profile = {
        firstName: req.data.firstName,
        lastName: req.data.lastName,
        email: req.data.email,
        salesOrg: req.data.salesOrg,
        salesOffice: req.data.salesOffice,
        profitCentre: req.data.profitCentre,
        mfgName: req.data.mfgName,
        manufacturerNumber
      };
      console.log(profile)

      await okta.updateUser(id, profile, groupIds);

      return req.reply();
    } catch (err) {
      console.error('❌ [UPDATE OKTAUsers] Failed:', err.message);
      return req.error(500, 'User update failed.');
    }
  });

  /** --------------------
   *  Activate User
   *  ------------------- */
  srv.on('activateUser', async (req) => {
    const { userId } = req.data;

    if (!userId) return req.error(400, 'Missing userId.');

    try {
      await okta.activateUser(userId);
      return { status: 'activated' };
    } catch (err) {
      console.error('❌ [activateUser] Failed:', err.message);
      return req.error(500, `Activation failed: ${err.message}`);
    }
  });

  /** --------------------
   *  Deactivate User
   *  ------------------- */
  srv.on('deactivateUser', async (req) => {
    const { userId } = req.data;

    if (!userId) return req.error(400, 'Missing userId.');

    try {
      await okta.deactivateUser(userId);
      return { status: 'deactivated' };
    } catch (err) {
      console.error('❌ [deactivateUser] Failed:', err.message);
      return req.error(500, `Deactivation failed: ${err.message}`);
    }
  });

  /** --------------------
   *  getOktaGroups (action)
   *  ------------------- */
  srv.on('getOktaGroups', async (req) => {
    console.log('📥 [getOktaGroups] Handler triggered');
    console.log("🔍 OKTA_API_URL =", process.env.OKTA_API_URL);
    console.log("🔍 OKTA_API_TOKEN =", process.env.OKTA_API_TOKEN);
    const query = req.data?.query || 'MFG';

    try {
      const groups = await okta.listGroups(query);

      // Return group list in expected shape (with profile object)
      return groups.map(g => ({
        id: g.id,
        profile: {
          name: g.name,
          description: g.description
        }
      }));
    } catch (err) {
      console.error('❌ [getOktaGroups] Failed:', err.message);
      return req.error(500, 'Failed to fetch Okta groups.');
    }
  });

  /** --------------------
   *  createOktaGroup (action)
   *  ------------------- */
  srv.on('createOktaGroup', async (req) => {
    const group = req.data?.group;

    if (!group?.profile?.name) {
      return req.error(400, 'Group profile name is required.');
    }

    try {
      // Reuse listGroups API to validate uniqueness (optional enhancement)
      const okta = require('../utils/okta-helper');
      const api = require('axios').create({
        baseURL: `${process.env.OKTA_BASE_URL}/api/v1`,
        headers: {
          Authorization: `SSWS ${process.env.OKTA_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      const response = await api.post('/groups', { profile: group.profile });

      return {
        id: response.data.id,
        profile: {
          name: response.data.profile.name,
          description: response.data.profile.description
        }
      };
    } catch (err) {
      console.error('❌ [createOktaGroup] Failed:', err.message);
      return req.error(500, 'Failed to create Okta group.');
    }
  });

  
  srv.on('sendActivationEmail', async (req) => {
    const { userId } = req.data;

    if (!userId) return req.error(400, 'Missing user ID');

    try {
      await okta.reactivateUser(userId);
      return 'Activation email sent via reactivation.';
    } catch (err) {
      console.error('❌ Failed to send activation email:', err.message);
      return req.error(500, 'Failed to send activation email.');
    }
  });
  srv.on('deleteUser', async (req) => {
  const { userId } = req.data;

  if (!userId) return req.error(400, 'Missing userId.');

  try {
    const result = await okta.deleteUser(userId);
    return result;
  } catch (err) {
    console.error('❌ [deleteUser] Failed:', err.message);
    return req.error(500, 'Failed to delete user.');
  }
});
};

