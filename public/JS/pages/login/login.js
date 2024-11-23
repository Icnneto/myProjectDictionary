import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"

fetch('https://us-central1-myprojectdictionary-9cb59.cloudfunctions.net/getApiKey')
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

        signInGoogle.addEventListener('click', async (e) => {
            const provider = await new GoogleAuthProvider();
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // user contém as infos do usuário (nome, foto ...)
                    const user = result.user;
                    window.location.href = 'https://myprojectdictionary-9cb59.web.app/';

                    //window.location.href = "";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    // e-mail do usuário que deu erro
                    const email = error.customData.email;
                    const credential = GoogleAuthProvider.credentialFromError(error);
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

                    window.location.href = 'https://myprojectdictionary-9cb59.web.app/';

                    //window.location.href = "";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    // e-mail do usuário que deu erro
                    const email = error.customData.email;
                    const credential = GithubAuthProvider.credentialFromError(error);
                });
        });
    });