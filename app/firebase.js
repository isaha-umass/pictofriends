// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR-API-KEY-HERE",
  authDomain: "pictofriends.firebaseapp.com",
  projectId: "pictofriends",
  storageBucket: "pictofriends.firebasestorage.app",
  messagingSenderId: "692045231748",
  appId: "1:692045231748:web:ad14020623050b5f9d34d1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const auth = getAuth(app)
export const db = getFirestore(app);
