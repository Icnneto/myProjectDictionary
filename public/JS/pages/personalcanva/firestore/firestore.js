import { app } from "../../../firebaseConfig.js";
import { 
  getFirestore, 
  collection, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  addDoc, 
  onSnapshot, 
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { criarEAcrescentarCard } from "../../../components/cardTermo.js";
import { atualizarCardNaUI } from "../editarTermo.js";

const secaoListaTermos = document.querySelector('#lista-termos');
const user = JSON.parse(sessionStorage.getItem("userInfo"));
const userId = user.userId;

const db = getFirestore(app);

const userCollection = collection(db, "users");
const termosCollectionUserRef = doc(userCollection, userId);

// resgatar dados e mostrar para usuário
onSnapshot(
  collection(termosCollectionUserRef, "termos"),
  { includeMetadataChanges: true },
  (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const ref = change.doc.data();
      const refkeys = change.doc.id;

      if (change.type === "added") {
        criarEAcrescentarCard(ref.termo, ref.descricao, refkeys, ref.favoritado, secaoListaTermos);
      }

      if (change.type === "modified") {
        try {
          atualizarCardNaUI(ref.termo, ref.descricao, refkeys, ref.favoritado, secaoListaTermos);
        } catch (error) {
          console.error("Erro ao atualizar card na UI:", error);
        }
      };
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
    const docRef = await addDoc(collection(termosCollectionUserRef, "termos"), dadosCard);
    const docId = docRef.id;
    
    // indexar termo no Algolia
    // http://127.0.0.1:5001/myprojectdictionary-9cb59/us-central1/addToIndex
    // https://us-central1-myprojectdictionary-9cb59.cloudfunctions.net/addToIndex
    const response = await fetch("https://us-central1-myprojectdictionary-9cb59.cloudfunctions.net/addToIndex", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        cardId: docId,
        termo: listaInputs.termo,
        descricao: listaInputs.descricao,
        favoritado: false
      })
    });

    const result = await response.json();
    
    return { id: docId, ...result };
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

    // http://127.0.0.1:5001/myprojectdictionary-9cb59/us-central1/changeFavoriteIndex
    // https://us-central1-myprojectdictionary-9cb59.cloudfunctions.net/changeFavoriteIndex
    await fetch("https://us-central1-myprojectdictionary-9cb59.cloudfunctions.net/changeFavoriteIndex", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cardId: updatedSnapshot.id,
        favoritado: favoritadoVal
      })
    });

    return favoritadoVal ? 'favoritado' : 'desfavoritado';

  } catch (error) {
    console.error("Erro ao favoritar termo:", error);
    return false;
  }
}

export async function deletarTermoDatabase(cardKey) {
  await deleteDoc(doc(termosCollectionUserRef, 'termos', cardKey));
};

export async function resgatarECriarApenasFavoritos() {
  const filter = query(collection(termosCollectionUserRef, 'termos'), where('favoritado', '==', true));
  try {
    const querySnapshot = await getDocs(filter);

    querySnapshot.forEach((doc) => {
      criarEAcrescentarCard(doc.data().termo, doc.data().descricao, doc.id, doc.data().favoritado, secaoListaTermos);
    });

  } catch (error) {
    console.error("Erro ao filtrar termos:", error);
    return 'Nenhum termo favoritado encontrado';
  }
};