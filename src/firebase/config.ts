
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcwQ2pT2tmz9Vi8B1WUrU9lS2E1cwQOEo",
  authDomain: "disneysheild-ai.firebaseapp.com",
  projectId: "disneysheild-ai",
  storageBucket: "disneysheild-ai.appspot.com",
  messagingSenderId: "1093938142944",
  appId: "1:1093938142944:web:fdba245d382919757668e5", // Added a valid app ID format
};

// Initialize Firebase - use a different variable name to avoid conflicting with existing instances
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export { firebaseApp as app, auth, db, functions, googleProvider };
