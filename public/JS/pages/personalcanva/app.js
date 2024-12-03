import { auth } from "../../firebaseconfig.js";
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

// não tem como exportar essas variáveis pois estão fora do escopo
export default { displayName, photoURL };