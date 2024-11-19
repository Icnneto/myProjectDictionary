import { auth } from "../../../../firebase/firebaseconfig.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"

const signInGoogle = document.querySelector('#signInGoogle');
const signInGithub = document.querySelector('#signInGithub');
const signInMicrosoft = document.querySelector('#signInMicrosoft');

signInGoogle.addEventListener('click', async (e) => {
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
})