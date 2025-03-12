// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-IHG1qPcZcfPzieuNc_Mz4hyC3p9o-OY",
  authDomain: "trip-planner-5e2c7.firebaseapp.com",
  projectId: "trip-planner-5e2c7",
  storageBucket: "trip-planner-5e2c7.firebasestorage.app",
  messagingSenderId: "439707132035",
  appId: "1:439707132035:web:4878fa8e7d5e175208fbb6",
  measurementId: "G-NRFVWTJ6FZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);