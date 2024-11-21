import { auth } from "../../../../firebase/firebaseconfig";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        // resgatar as informações do usuário e exportar
        const displayName = user.displayName;
        const photoURL = user.photoURL;
        const uid = user.uid;
    } else {
        // redirecionar para tela de logIn
        window.location.href = "/";
    }
});

export default { displayName, photoURL };