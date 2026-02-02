const cds = require('@sap/cds');
const path = require('path');
const cors = require('cors');
const cuid = require('cuid'); // Generates unique IDs



// ✅ Reusable function to update MediaFile after modifying content
async function updateMediaFile(req) {
    const { MediaFile } = cds.entities;
    const LOG = cds.log('media-service');

    if (!req._ || !req._.req || !req._.req.path) {
        console.error("Invalid request object: missing '_', '_.req', or '_.req.path'");
        return;
    }

    const urlPath = req._.req.path;
    LOG.debug('UPDATE handler triggered');
    LOG.debug('Request URL:', urlPath);

    if (!urlPath.includes('content')) return;

    const id = req.data.ID;
    LOG.debug('ID:', id);

    if (!id) {
        req.reject(400, 'ID is required to update content');
        return;
    }

    // Fetch existing record
    const obj = await cds.run(SELECT.one.from(MediaFile).where({ ID: id }));

    if (!obj) {
        req.reject(404, 'No data found!');
        return;
    }

    const generatedUrl = `/media/serve/${id}/${encodeURIComponent(req.headers.slug)}`;

    // Update only necessary fields in the database
    const db = await cds.connect.to('db');
    await db.run(
        UPDATE(MediaFile)
            .set({
                fileName: req.headers.slug,
                mediaType: req.headers['content-type'],
                url: generatedUrl,
                content: req.data.content
            })
            .where({ ID: id })
    );

    LOG.debug(`Updated MediaFile with ID ${id}, URL: ${generatedUrl}`);
}

// ✅ CAP Service Handler
module.exports = cds.service.impl(async function () {
    const { MediaFile } = this.entities;

    // Handle file updates before 'UPDATE' event
    this.before('UPDATE', MediaFile, async (req, next) => {
        await updateMediaFile(req);
        return next();
    });
});

// ✅ Middleware to authenticate users (Optional)
async function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (req.path === '/health') {
        return next();
    }
    if (!authHeader) {
        console.log('No Authorization Header Found');
        console.log('Request URL:', req.originalUrl);
        console.log('Request Path:', req.path);
        return res.status(401).send('Unauthorized');
    } else {
        console.log('User Token:', authHeader);
    }

    next();
}

// ✅ Bootstrap Event
cds.on('bootstrap', async (app) => {
    console.log('CAP is Starting.....');
    app.use(authMiddleware);
    // CORS Configuration
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Authorization', 'Content-Type']
    }));
    app.get('/userInfo', (req, res) => {
        if (!req.user) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
    
        const user = req.user;
        res.json({
          id: user.id,
          email: user.email,
          ManufacturerNumber: user.attr?.ManufacturerNumber || '',
          SalesOrg: user.attr?.SalesOrg || '',
          roles: user.roles || []
        });
        console.log(email)
      });
    // ✅ File Serving Route
    app.get('/media/serve/:id/:fileName', async (req, res) => {
        const { id, fileName } = req.params;

        const db = await cds.connect.to('db');
        const result = await db.run(
            SELECT.one.from('MediaFile').where({ ID: id, fileName: decodeURIComponent(fileName) })
        );

        if (!result) return res.status(404).send('File not found');

        res.setHeader('Content-Type', result.mediaType);
        res.send(result.content);
    });

    // ✅ File Upload Route
    app.put('/media/upload', async (req, res) => {
        const { slug, 'content-type': mediaType } = req.headers;

        if (!slug || !mediaType || !req.body) {
            return res.status(400).send('Missing required headers or file data');
        }

        const db = await cds.connect.to('db');
        const fileId = cuid(); // Generate unique file ID

        // Insert file data into the HANA database
        await db.run(
            INSERT.into('MediaFile').entries({
                ID: fileId,
                fileName: slug,
                mediaType,
                content: req.body,
                url: `/media/serve/${fileId}/${slug}`
            })
        );

        res.status(201).json({ url: `/media/serve/${fileId}/${slug}` });
    });

    // ✅ Invoice Mock API (Reintegrated)
    app.get('/mock-api/invoices/:number', (req, res) => {
        const invoiceNumber = req.params.number;
        const mockImageUrl = "https://via.placeholder.com/600x800.png?text=Invoice+" + invoiceNumber;
        res.status(200).json({ imageUrl: mockImageUrl });
    });

    // ✅ Manual test of file update function
    try {
        const fakeRequest = {
            _: { req: { path: '/odata/v4/media/MediaFile(ID=123)/content' } },
            data: { ID: 123, content: Buffer.from("Fake Image Data") },
            headers: { slug: 'test.png', 'content-type': 'image/png' },
            reject: (code, msg) => console.log(`Rejected: ${code} - ${msg}`)
        };

        await updateMediaFile(fakeRequest);
    } catch (error) {
        console.error("Error calling updateMediaFile in bootstrap:", error);
    }
});
// ✅ Normalize user attributes for CAP @restrict
// cds.on('served', async () => {
//     for (const serviceName in cds.services) {
//       const service = cds.services[serviceName];
  
//       service.before('*', req => {
//         const attr = req.user?.attr;
  
//         if (attr?.ManufacturerNumber?.length) {
//           req.user.ManufacturerNumber = attr.ManufacturerNumber[0];
//         }
  
//         if (attr?.SalesOrg?.length) {
//           req.user.SalesOrg = attr.SalesOrg[0];
//         }
  
//         if (attr?.ProfitCentre?.length) {
//           req.user.ProfitCentre = attr.ProfitCentre[0];
//         }
  
//         if (attr?.SalesOffice?.length) {
//           req.user.SalesOffice = attr.SalesOffice[0];
//         }
  
//         console.log(`[AUTH-NORMALIZER] ${req.user.id} - MFR: ${req.user.ManufacturerNumber}`);
//       });
//     }
//   });
  
// Bootstrapping the CAP service
module.exports = cds.server;
