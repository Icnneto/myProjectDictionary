import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import { app } from "../../firebaseConfig.js";

const auth = getAuth(app);

const signInGoogle = document.querySelector('#signInGoogle');
const signInGithub = document.querySelector('#signInGithub');

auth.useDeviceLanguage();

onAuthStateChanged(auth, (user) => {
    if (user) {
        armazenarDadosUsuario(user);
        window.location.href = 'https://myprojectdictionary-9cb59.web.app/pages/dashboard.html';
    } else {
        console.log('Realizar login')
    }
})

signInGoogle.addEventListener('click', async (e) => {
    const provider = await new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            armazenarDadosUsuario(user);
            // http://127.0.0.1:5033/pages/dashboard.html
            window.location.href = 'https://myprojectdictionary-9cb59.web.app/pages/dashboard.html';
        })
        .catch((error) => {
            console.error('Erro ao realizar o login: ', error);
        });
});

signInGithub.addEventListener('click', async (e) => {
    const provider = await new GithubAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            armazenarDadosUsuario(user);

            window.location.href = 'https://myprojectdictionary-9cb59.web.app/pages/dashboard.html';
        })
        .catch((error) => {
            console.error('Erro ao realizar o login: ', error);
        });
});

function armazenarDadosUsuario (usuario) {
    const userInfo = {
        userName: usuario.displayName,
        userEmail: usuario.email,
        userId: usuario.uid,
        userImage: usuario.photoURL
    }
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
}