import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcVtLWY-fcdIIhzXcMdMyFrWhQhqUz2Rk",
  authDomain: "projectdommychat.firebaseapp.com",
  projectId: "projectdommychat",
  storageBucket: "projectdommychat.firebasestorage.app",
  messagingSenderId: "518584332878",
  appId: "1:518584332878:web:58ad8361d67625b0adc91f"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

signInAnonymously(auth).catch(console.error);
