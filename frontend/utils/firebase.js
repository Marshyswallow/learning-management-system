// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginecourses.firebaseapp.com",
  projectId: "loginecourses",
  storageBucket: "loginecourses.firebasestorage.app",
  messagingSenderId: "111856022057",
  appId: "1:111856022057:web:1691ecfd9853bcd5952238"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}