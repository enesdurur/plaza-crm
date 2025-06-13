// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSmmqOOKjgbTkeUn_cX9jp76Azv-e2D7k",
  authDomain: "plaza-crm-v3.firebaseapp.com",
  projectId: "plaza-crm-v3",
  storageBucket: "plaza-crm-v3.firebasestorage.app",
  messagingSenderId: "530289073677",
  appId: "1:530289073677:web:08a573885e2ec15a17ff44",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
