import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEY,
  authDomain: "cloud-blog-a4ec9.firebaseapp.com",
  projectId: "cloud-blog-a4ec9",
  storageBucket: "cloud-blog-a4ec9.appspot.com",
  messagingSenderId: "820416553159",
  appId: process.env.REACT_APP_ID,
  measurementId: "G-5M9M0NLMC8"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const database = getDatabase(app);
export const provider=new GoogleAuthProvider()