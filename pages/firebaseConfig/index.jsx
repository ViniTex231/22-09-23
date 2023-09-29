import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCyxhoixE99x5YxeOR5U7RGzxsy0pgwXGs",
  authDomain: "ds-mb-2-2023.firebaseapp.com",
  projectId: "ds-mb-2-2023",
  storageBucket: "ds-mb-2-2023.appspot.com",
  messagingSenderId: "1025628656087",
  appId: "1:1025628656087:web:b856fe4500aac0588c3b92"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app)

export {auth, db, storage}