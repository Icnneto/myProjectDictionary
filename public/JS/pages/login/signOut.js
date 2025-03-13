import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { app } from "../../firebaseConfig.js"

const auth = getAuth(app);

const logOff = document.querySelectorAll('[data-signOut]');

logOff.forEach(element => {
    
    element.addEventListener('click', () => {
        signOut(auth).then(() => {
            sessionStorage.removeItem('userInfo');
            window.location.href = 'https://myprojectdictionary-9cb59.web.app/'
        }).catch((error) => {
            console.log(error)
        });
    })
});




