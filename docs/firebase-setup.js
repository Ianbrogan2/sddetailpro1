// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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
const auth = getAuth(app); // Initialize Firebase Auth
const db = getFirestore(app); // Initialize Firestore

// Expose Firestore and Auth globally
window.auth = auth;
window.db = db;

// Function to check if the user is an admin
export async function checkAdmin() {
    const user = auth.currentUser;
    if (user) {
        const userRef = collection(db, "users");
        const q = query(userRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            return userData.isAdmin; // Ensure you have a field `isAdmin` in your user documents
        }
    }
    return false;
}

// Function to handle user state changes and set admin status
export function setupAuthStateListener(onAdminCallback) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const isAdmin = await checkAdmin();
            onAdminCallback(user, isAdmin);
        } else {
            onAdminCallback(null, false);
        }
    });
}
