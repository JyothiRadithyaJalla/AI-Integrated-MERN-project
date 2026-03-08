
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDS7f2JLjuR-ZAHYS5yko9D8mBCAngPgJg",
  authDomain: "exam-helper-68289.firebaseapp.com",
  projectId: "exam-helper-68289",
  storageBucket: "exam-helper-68289.firebasestorage.app",
  messagingSenderId: "198091553006",
  appId: "1:198091553006:web:cd719d4ee1ebf391139bff"
};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}