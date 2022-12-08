// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
const firebaseConfig = {
  apiKey: "AIzaSyCZAXTWHffiYgo4quvccJuxFPs69VfnCOw",
  authDomain: "ecommerce-finalterm.firebaseapp.com",
  projectId: "ecommerce-finalterm",
  storageBucket: "ecommerce-finalterm.appspot.com",
  messagingSenderId: "492787033587",
  appId: "1:492787033587:web:f4c0e3c235e2da762a9e86",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
