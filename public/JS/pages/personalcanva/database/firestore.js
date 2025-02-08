import { app } from "../../../firebaseConfig.js"
import { getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, onSnapshot, runTransaction } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
const db = getFirestore(app);

async function add () {
    try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
    }
}

add();
