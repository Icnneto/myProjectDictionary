import { auth } from "../../firebaseconfig.js";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"

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