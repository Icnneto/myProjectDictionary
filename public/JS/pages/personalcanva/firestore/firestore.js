import { app } from "../../../firebaseConfig.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  setDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

import { criarEAcrescentarCard } from "../formCard.js";
const user = JSON.parse(sessionStorage.getItem("userInfo"));
const userId = user.userId;

const db = getFirestore(app);

const userCollection = collection(db, "users");
const termosCollectionUserRef = doc(userCollection, userId);

// resgatar dados e mostrar para usuário
onSnapshot(collection(termosCollectionUserRef, "termos"), (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      const ref = change.doc.data();
      const refkeys = change.doc.id;

      criarEAcrescentarCard(ref.termo, ref.descricao, refkeys, ref.favoritado);
    }
  });
});


// Adiciona um novo termo ao banco de dados e atualiza a referência no nó do usuário
export async function registrarNovoTermo(listaInputs, uId) {
  const dadosCard = {
    termo: listaInputs.termo,
    descricao: listaInputs.descricao,
    favoritado: false,
  };

  try {
    await addDoc(collection(termosCollectionUserRef, "termos"), dadosCard);
    
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}