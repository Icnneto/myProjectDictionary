import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { app } from "../../firebaseConfig.js";
const main = document.querySelector('main');

const auth = getAuth(app);

export const userInfo = {
    userName: null,
    userPhoto: null,
    userId: null,
};

onAuthStateChanged(auth, (user) => {
    if (!user) {
        criarToastAviso();
        setTimeout(() => {
            window.location.href = 'http://127.0.0.1:5033/pages/login.html';
        }, 2000);
    } else {
        // resgatar as informações do usuário e exportar
        resgatarEArmazenarInfosUsuario(user);
    }
});


function resgatarEArmazenarInfosUsuario (user) {
    
    userInfo.userName = user.displayName,
    userInfo.userPhoto = user.photoURL,
    userInfo.userId = user.uid

};

function criarToastAviso () {
    let mensagem = 'Necessário fazer login novamente!'

    const toastAviso = document.createElement('div');
    toastAviso.classList.add(
        'toast',
        'toast-top',
        'toast-center'
    );

    toastAviso.innerHTML = `
        <div class="alert font-quicksand text-preto-padrao border-laranja-medio bg-branco-fundo">
            <span>${mensagem}</span>
        </div>
    `

    main.append(toastAviso);

    setTimeout(() => {
        toastAviso.remove();
    }, 2000);

};