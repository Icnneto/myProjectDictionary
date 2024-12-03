import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


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
        }

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        const logOff = document.querySelector('#signOut');
        
        logOff.addEventListener('click', () => {
            signOut(auth).then(() => {
                window.location.href = 'https://myprojectdictionary-9cb59.web.app/'
            }).catch((error) => {
                console.log(error)
            });
        })
    })
    

