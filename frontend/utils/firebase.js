import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9ZP-phIXe-XTdN5mZ7KHWRSP2_e6beDc",
  authDomain: "learningmanagementsystem-5880b.firebaseapp.com",
  projectId: "learningmanagementsystem-5880b",
  storageBucket: "learningmanagementsystem-5880b.firebasestorage.app",
  messagingSenderId: "386155582318",
  appId: "1:386155582318:web:f72fb186843c251bd5a77f",
  measurementId: "G-E67E5MVRVP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();