import { app } from "../../../firebaseConfig.js";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
  addDoc,
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
    const ref = change.doc.data();
    const refkeys = change.doc.id;

    if (change.type === "added") { 
      console.log("Novo termo adicionado:", ref);
      criarEAcrescentarCard(ref.termo, ref.descricao, refkeys, ref.favoritado);
    } 
    
    if (change.type === "modified") {
      console.log("Termo modificado:", ref);
      atualizarCardNaUI(ref.termo, ref.descricao, refkeys, ref.favoritado);
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

export async function favoritarTermoDatabase(cardKey) {
  const dbRef = doc(termosCollectionUserRef, 'termos', cardKey);
  try {
    const snapshot = await getDoc(dbRef)
    await updateDoc(dbRef, {
      favoritado: !(snapshot.data().favoritado)
    });

    const updatedSnapshot = await getDoc(dbRef);
    const favoritadoVal = updatedSnapshot.data().favoritado;
    return favoritadoVal ? 'favoritado' : 'desfavoritado';

  } catch (error) {
    console.error("Erro ao favoritar termo:", error);
    return false;
  }
}

export async function deletarTermoDatabase(cardKey) {
  await deleteDoc(doc(termosCollectionUserRef, 'termos', cardKey));
};

export async function editarTermoDatabase(novoTermo, novaDescricao, cardKey) {
  const dbRef = doc(termosCollectionUserRef, 'termos', cardKey);

  try {
    await updateDoc(dbRef, {
      termo: novoTermo,
      descricao: novaDescricao
    });
  } catch (error) {
    console.error("Erro ao favoritar termo:", error);
    throw error;
  }
}

// export async function editarTermoDatabase(novoTermo, novaDescricao, cardKey) {
//   const dbRef = doc(termosCollectionUserRef, 'termos', cardKey);
//   console.log(getDoc(dbRef));
//   console.log("Editando termo:", { novoTermo, novaDescricao, cardKey });

//   try {
//     // Await the setDoc operation
//     await updateDoc(dbRef, {
//       termo: novoTermo
//     });

//     await new Promise(resolve => setTimeout(resolve, 100));

//     // Explicitly await getDoc
//     const updatedSnapshot = await getDoc(dbRef);
//     console.log("Documento atualizado:", updatedSnapshot.data());

//     // Return the updated data if needed
//     return updatedSnapshot.data();

//   } catch (error) {
//     console.error("Erro ao favoritar termo:", error);
//     throw error; // Re-throw to allow handling in the calling function
//   }