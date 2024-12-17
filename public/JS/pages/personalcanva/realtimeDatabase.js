import { getDatabase, ref, child, push, update, onValue, onChildAdded, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"
import { app } from "../../firebaseConfig.js";
import { criarEAcrescentarCard } from "./formCard.js"
const user = JSON.parse(sessionStorage.getItem('userInfo'));
const userId = user.userId;
const db = getDatabase(app);

const databaseRef = ref(db, `users-termos/${userId}`);

function referenceToTermInDb(key) {
    return ref(db, `termos/${key}`);
};

onChildAdded(databaseRef, async (snapshot) => {
    const termoKey = snapshot.key;
    const dbTermos = referenceToTermInDb(termoKey);
    onValue(dbTermos, async (snapshot) => {
        criarEAcrescentarCard(snapshot.val().termo, snapshot.val().descricao, termoKey, snapshot.val().favoritado);
    }, {
        onlyOnce: true
    })
});

function registrarNovoTermo(listaInputs, uId) {
    const dadosCard = {
        termo: listaInputs.termo,
        descricao: listaInputs.descricao,
        favoritado: false,
    };

    const newTermKey = push(child(ref(db), 'termos/')).key;

    const updates = {};
    updates['termos/' + newTermKey] = dadosCard;
    updates['users-termos/' + uId + '/' + newTermKey] = true;

    return update(ref(db), updates);
};

function deletarTermoDatabase(cardKey) {
    const key = cardKey;
    const updates = {}
    updates[`termos/${key}`] = null;
    updates[`users-termos/${userId}/${key}`] = null;

    return update(ref(db), updates);
};

async function favoritarTermoDatabase(cardKey) {
    const key = cardKey;
    const dbRef = referenceToTermInDb(key);
  
    try {
      const snapshot = await get(child(dbRef, 'favoritado'));
      await update(dbRef, { favoritado: !(snapshot.val()) });

      const updatedSnapshot = await get(child(dbRef, 'favoritado'));
      const favoritadoVal = updatedSnapshot.val();
      return favoritadoVal ? 'favoritado' : 'desfavoritado';

    } catch (error) {
      console.error("Erro ao favoritar termo:", error);
      return false;
    }
}

export { registrarNovoTermo, deletarTermoDatabase, favoritarTermoDatabase };