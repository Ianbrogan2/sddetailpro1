// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Auth

// Sign-up function
function signUp() {
  const email = document.getElementById("email-signup").value;
  const password = document.getElementById("password-signup").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      console.log("User signed up:", userCredential.user);
      alert("Sign-up successful!");
      window.location.href = "index.html"; // Redirect after sign-up
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
      alert("Error signing up: " + error.message);
    });
}

// Sign-in function
function signIn() {
  const email = document.getElementById("email-signin").value;
  const password = document.getElementById("password-signin").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log("User signed in:", userCredential.user);
      alert("Sign-in successful!");
      window.location.href = "index.html"; // Redirect after sign-in
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
      alert("Error signing in: " + error.message);
    });
}
