import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { app } from "../../firebaseConfig.js";
import { criarExibirToast } from "../../components/toast.js";
const main = document.querySelector('main');

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        const mensagem = 'Necessário fazer login novamente!';
        const funcionalidade = 'aviso'
        criarExibirToast(mensagem, funcionalidade, main);
        
        setTimeout(() => {
            window.location.href = 'http://127.0.0.1:5033/pages/login.html';
        }, 2000);
    };
});
