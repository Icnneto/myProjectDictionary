import { app } from "../../../firebaseConfig.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { criarEAcrescentarCard } from "../formCard.js";
const user = JSON.parse(sessionStorage.getItem("userInfo"));
const userId = user.userId;

const db = getFirestore(app);

const userCollection = collection(db, "users");
const termosCollection = collection(db, "termos");

// const databaseRef = ref(db, `users/${userId}`);

// Adiciona um novo termo ao banco de dados e atualiza a referência no nó do usuário
async function registrarNovoTermo(listaInputs, uId) {
  const dadosCard = {
    termo: listaInputs.termo,
    descricao: listaInputs.descricao,
    favoritado: false,
  };

  try {
    const addTerm = await addDoc(termosCollection, dadosCard);
    const newTermKey = addTerm.id;

    // user terá ID com base no seu Uid,
    // diferentemente do Termo cujo id é criado aleatorimente pelo firestore
    const userKey = uId;

    await setDoc(doc(userCollection, userKey), {
      termos: {
        [newTermKey]: true
      },
    }, { merge: true });

    return newTermKey;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}


export { registrarNovoTermo };
