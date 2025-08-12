// firebase.ts or firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfw7Kg0oakuxy3ql6PnVIAfT0sg6SeTyI",
  authDomain: "mariamman-2ba69.firebaseapp.com",
  projectId: "mariamman-2ba69",
  storageBucket: "mariamman-2ba69.appspot.com", // ✅ FIXED
  messagingSenderId: "413267999433",
  appId: "1:413267999433:web:0dcfa5420bf816a769ab18",
  measurementId: "G-9QTYHQQPZP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
