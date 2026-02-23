// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {collection, getFirestore, addDoc} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkKloBRkev68I5bJlEDq0kzTPCuH9wEBg",
  authDomain: "expence-tracker-6c92c.firebaseapp.com",
  projectId: "expence-tracker-6c92c",
  storageBucket: "expence-tracker-6c92c.firebasestorage.app",
  messagingSenderId: "33372771617",
  appId: "1:33372771617:web:ccf114af67768daeee1a60",
  measurementId: "G-9LPP29DM71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore (app)