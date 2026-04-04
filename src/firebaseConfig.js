import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACXubj-uantVa7klufSKCjDLy2N2xajKQ",
  authDomain: "auto-dom.firebaseapp.com",
  projectId: "auto-dom",
  storageBucket: "auto-dom.firebasestorage.app",
  messagingSenderId: "323398983938",
  appId: "1:323398983938:web:19aaea46a3290af657621b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
