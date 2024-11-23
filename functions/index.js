// configurando o firebase.config
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccountKey = 'serviceAccountKey.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    // databaseURL: `https://${process.env.PROJECT_ID}.firebaseapp.com`
})