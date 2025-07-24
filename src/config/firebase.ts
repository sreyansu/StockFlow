// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFY_yT0teDF0QJvFLcZ6bvDwmgbVeo21k",
  authDomain: "stockflow-pro-98e77.firebaseapp.com",
  projectId: "stockflow-pro-98e77",
  storageBucket: "stockflow-pro-98e77.firebasestorage.app",
  messagingSenderId: "661288441505",
  appId: "1:661288441505:web:b8efdc7869730c0b4d02e0",
  measurementId: "G-RTNBFLJY8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Export the app instance
export default app;
