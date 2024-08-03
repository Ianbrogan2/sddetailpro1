// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1dRaAh9mTnHTcAu03ZDyr4sc_dS0yBt0",
    authDomain: "sd-detail-pro.firebaseapp.com",
    projectId: "sd-detail-pro",
    storageBucket: "sd-detail-pro.appspot.com",
    messagingSenderId: "950327198258",
    appId: "1:950327198258:web:1c5c749232c07783fef22b",
    measurementId: "G-DQ1MX7K35F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
