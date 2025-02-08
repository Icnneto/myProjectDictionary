import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

// http://127.0.0.1:5001/myprojectdictionary-9cb59/us-central1/getApiKey
// https://us-central1-myprojectdictionary-9cb59.cloudfunctions.net/getApiKey
export async function initializeFirebase () {
    try {
        const response = await fetch('http://127.0.0.1:5001/myprojectdictionary-9cb59/us-central1/getApiKey');
        const data = await response.json();
        
        const firebaseConfig = {
            apiKey: data.apiKey,
            authDomain: data.authDomain,
            databaseURL: data.databaseURL,
            projectId: data.projectId,
            storageBucket: data.storageBucket,
            messagingSenderId: data.messagingSenderId,
            appId: data.appId
        };

        return firebaseConfig;

    } catch (error) {
        console.error('Erro ao coletar os dados do Firebase:', error);
        throw error;
    }    
};

const firebaseConfig = await initializeFirebase()

export const app = await initializeApp(firebaseConfig);