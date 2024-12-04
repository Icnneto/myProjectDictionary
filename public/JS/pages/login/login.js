import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"

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

        const signInGoogle = document.querySelector('#signInGoogle');
        const signInGithub = document.querySelector('#signInGithub');

        auth.useDeviceLanguage();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // resgatar as informações do usuário e exportar
                userInfo.name = user.displayName;
                userInfo.photo = user.photoURL;
                userInfo.id = user.uid;

                window.location.href = 'http://127.0.0.1:5033/pages/dashboard.html';
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
                    // user contém as infos do usuário (nome, foto ...)
                    const user = result.user;

                    userInfo.name = user.displayName;
                    userInfo.photo = user.photoURL;
                    userInfo.id = user.uid;

                    window.location.href = 'http://127.0.0.1:5033/pages/dashboard.html';
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
                    // user contém as infos do usuário (nome, foto ...)
                    const user = result.user;

                    userInfo.name = user.displayName;
                    userInfo.photo = user.photoURL;
                    userInfo.id = user.uid;

                    window.location.href = 'https://myprojectdictionary-9cb59.web.app/pages/dashboard.html';
                })
                .catch((error) => {
                    console.error('Erro ao realizar o login: ', error);
                });
        });
    });