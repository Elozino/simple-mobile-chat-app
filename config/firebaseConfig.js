import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import {
//   apiKey,
//   authDomain,
//   projectId,
//   storageBucket,
//   messagingSenderId,
//   appId,
//   measurementId,
// } from "@env";

const firebaseConfig = {
  apiKey: "AIzaSyAMmJb8s480zWdT1tFra_uJzNaG0Su46s4",
  authDomain: "fp-news-c3cbf.firebaseapp.com",
  projectId: "fp-news-c3cbf",
  storageBucket: "fp-news-c3cbf.appspot.com",
  messagingSenderId: "751970636669",
  appId: "1:751970636669:web:facd87188ec787aaf9b214",
  measurementId: "G-GRGK93G6F6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
