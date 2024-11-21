import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyB0k65ryDXlCgTlnPIhkHLhiozHGVmzUP4",
  authDomain: "myprojectdictionary-9cb59.firebaseapp.com",
  projectId: "myprojectdictionary-9cb59",
  storageBucket: "myprojectdictionary-9cb59.firebasestorage.app",
  messagingSenderId: "293124661241",
  appId: "1:293124661241:web:706708717f94155631e728"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;