import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrnNEhCfB3t4OGf56sgi86ttJ1U7Q3IrE",
  authDomain: "paul2-29e63.firebaseapp.com",
  projectId: "paul2-29e63",
  storageBucket: "paul2-29e63.appspot.com",
  messagingSenderId: "612328162617",
  appId: "1:612328162617:web:e5c9877d584504c80cd4e8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();