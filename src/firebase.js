// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgvOJ4G-ryyJpHiK4u8hI1UsQpiPLty8w",
  authDomain: "assignment-3a9c3.firebaseapp.com",
  projectId: "assignment-3a9c3",
  storageBucket: "assignment-3a9c3.appspot.com",
  messagingSenderId: "965229438633",
  appId: "1:965229438633:web:57e805ea26f4a62f9a6bb8",
  measurementId: "G-NBQ835YSP0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

const analytics = getAnalytics(app);
