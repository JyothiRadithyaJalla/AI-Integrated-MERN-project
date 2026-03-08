
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD8DtxxDJ1DrGgEjA30vTxe_-B8Bes7hjk",
  authDomain: "ai-ecommerce-mern.firebaseapp.com",
  projectId: "ai-ecommerce-mern",
  storageBucket: "ai-ecommerce-mern.firebasestorage.app",
  messagingSenderId: "243338989346",
  appId: "1:243338989346:web:28bd743942c7975b18df7b"
};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}