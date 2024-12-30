import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { app } from "../../firebaseConfig.js";

const auth = getAuth(app);

const logOff = document.querySelectorAll('[data-sign_out]');

logOff.forEach((btn) => {
    btn.addEventListener('click', () => {
        signOut(auth).then(() => {
            sessionStorage.removeItem('userInfo');
            window.location.href = 'https://myprojectdictionary-9cb59.web.app/'
        }).catch((error) => {
            console.log(error)
        });
    })
})





