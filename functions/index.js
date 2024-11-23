// configurando o firebase.config
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccountKey = 'serviceAccountKey.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    // databaseURL: `https://${process.env.PROJECT_ID}.firebaseapp.com`
});

const cors = require('cors')({origin: 'https://myprojectdictionary-9cb59.web.app'});

exports.getApiKey = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        res.json({
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID
        });
    });
})