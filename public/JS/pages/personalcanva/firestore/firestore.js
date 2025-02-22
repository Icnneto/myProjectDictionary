import { app } from "../../../firebaseConfig.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { criarEAcrescentarCard } from "../formCard.js";
const user = JSON.parse(sessionStorage.getItem("userInfo"));
const userId = user.userId;

const db = getFirestore(app);

const userCollection = collection(db, "users");
const termosCollection = collection(db, "termos");
// const databaseRef = doc(db, "users", userId);

// resgatar dados e mostrar para usuário
// onSnapshot(userCollection, (snapshot) => {
//   snapshot.docChanges().forEach((change) => {
//     if (change.type === "added") {
//       const ref = change.doc.data();
//       // estou acessando os termos
//       // preciso resgatar os ids para poder chamar o formCard
//       console.log(ref.termos)
//     }
//   })
// });


// Adiciona um novo termo ao banco de dados e atualiza a referência no nó do usuário
export async function registrarNovoTermo(listaInputs, uId) {
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

    await setDoc(
      doc(userCollection, userKey),
      {
        termos: {
          [newTermKey]: true,
        },
      },
      { merge: true }
    );

    return newTermKey;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

console.log('Estou aqui')