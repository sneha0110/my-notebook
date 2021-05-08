import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6BrWn5ypJ9lWGuswfExvIDR0b8qhzi-0",
  authDomain: "sneha-1.firebaseapp.com",
  projectId: "sneha-1",
  storageBucket: "sneha-1.appspot.com",
  messagingSenderId: "461446585776",
  appId: "1:461446585776:web:5ce7cca1137cbf41f84a75",
  measurementId: "G-P3QR877RT9"
};
firebase.initializeApp(firebaseConfig);