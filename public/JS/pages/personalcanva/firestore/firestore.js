import { app } from "../../../firebaseConfig.js";
import { getFirestore, collection, doc, updateDoc, deleteDoc, getDoc, addDoc, onSnapshot, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
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
        console.log("Termo modificado:", ref);
        console.log("Valores recebidos:", {
          termo: ref.termo,
          descricao: ref.descricao,
          refkeys: refkeys,
          favoritado: ref.favoritado,
          secao: secaoListaTermos
        });
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
  console.log("📌 Iniciando edição...");
  console.log("🔑 Chave do documento:", cardKey);

  try {
    const dbRef = doc(termosCollectionUserRef, 'termos', cardKey);
    console.log('Referência do firestore: ', dbRef.path)

    const snapshot = await getDoc(dbRef);
    await updateDoc(dbRef, {
      termo: novoTermo,
      descricao: novaDescricao
    });

  } catch (error) {
    console.error("Erro ao editar termo:", error);
  }
  return false;
}