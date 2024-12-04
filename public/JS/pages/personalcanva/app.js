import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
const main = document.querySelector('main');

export const userInfo = {
    name: null,
    photo: null,
    id: null,
}

// https://us-central1-myprojectdictionary-9cb59.cloudfunctions.net/getApiKey
fetch('http://127.0.0.1:5001/myprojectdictionary-9cb59/us-central1/getApiKey')
    .then(response => response.json())
    .then(data => {
        const firebaseConfig = {
            apiKey: data.apiKey,
            authDomain: data.authDomain,
            projectId: data.projectId,
            storageBucket: data.storageBucket,
            messagingSenderId: data.messagingSenderId,
            appId: data.appId
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        onAuthStateChanged(auth, (user) => {
            if (!user) {
                criarToastAviso();
                console.log('Não está logado');
                setTimeout(() => {
                    window.location.href = 'http://127.0.0.1:5033/pages/login.html';
                }, 2000);
            } else {
                // resgatar as informações do usuário e exportar
                resagatarEArmazenarInfosUsuario(user);
            }
        });
    })

async function resagatarEArmazenarInfosUsuario (user) {
    try {
        userInfo.name = user.displayName;
        userInfo.photo = user.photoURL;
        userInfo.id = user.uid;
    } catch (error) {
        console.error(`Erro ao atualizar informações do usuário:`, error);
    };
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