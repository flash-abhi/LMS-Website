// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginvirtualcourses-2d12f.firebaseapp.com",
  projectId: "loginvirtualcourses-2d12f",
  storageBucket: "loginvirtualcourses-2d12f.firebasestorage.app",
  messagingSenderId: "586999059448",
  appId: "1:586999059448:web:0915a79c42065d900a7c0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};