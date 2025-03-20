const admin = require('firebase-admin');
const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');
const { onDocumentWritten, Change, FirestoreEvent } = require('firebase-functions/v2/firestore');

const serviceAccountKey = 'serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://myprojectdictionary-9cb59-default-rtdb.firebaseio.com"
});

// https://myprojectdictionary-9cb59.web.app
const cors = require('cors')({ origin: 'http://127.0.0.1:5033' });

exports.getApiKey = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.json({
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    });
  });
});

exports.editarTermo = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { userId, cardKey, novoTermo, novaDescricao } = req.body;

  if (!userId || !cardKey || !novoTermo || !novaDescricao) {
    return res.status(400).json({ error: "Parâmetros inválidos" });
  }

  try {
    // Referência ao documento no Firestore
    const termoRef = admin.firestore()
      .collection("users")
      .doc(userId)
      .collection("termos")
      .doc(cardKey);

    // Verificar se o documento existe antes de atualizar
    const docSnap = await termoRef.get();
    if (!docSnap.exists) {
      return res.status(404).json({ error: "Termo não encontrado" });
    }

    // Atualizar o documento
    await termoRef.update({
      termo: novoTermo,
      descricao: novaDescricao,
    });

    console.log(`✅ Termo ${cardKey} atualizado com sucesso`);
    return res.status(200).json({ success: true, message: "Termo atualizado com sucesso" });

  } catch (error) {
    console.error("🔥 Erro ao atualizar termo:", error);
    return res.status(500).json({ error: "Erro ao atualizar termo", details: error.message });
  }
});

// Algolia
const appId = process.env.ALGOLIA_ID;
const apiKey = process.env.ALGOLIA_API;

const client = algoliasearch(appId, apiKey);
const index = client.initIndex('cards');

exports.addToIndex = onDocumentWritten('users/{userId}/termos/{termoId}', (event) => {
    const snapshot = event.data;

    if (!snapshot) {
      console.log("Nenhum dado encontrado");
      return;
    }

    const data = snapshot.data();
    const userId = event.params['userId'];
    const objectId = event.params.termoId;

    try {
      index.saveObject({
        termo: data.termo,
        descricao: data.descricao,
        favoritado: false,
        userId: userId,
        objectID: objectId
      });
      return console.log(`Termo ${objectId} indexado com sucesso!`)
    } catch (error) {
      console.error(`Erro ao indexar termo ${objectId}:`, error);
    };
});

