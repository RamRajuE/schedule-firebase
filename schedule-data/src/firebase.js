import { initializeApp } from "firebase/app";   
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBZ00qiTu6DH7yiTEBXtT8YiUn378V_KtE",
  authDomain: "schedule-data-7418e.firebaseapp.com",
  projectId: "schedule-data-7418e",
  storageBucket: "schedule-data-7418e.appspot.com",
  messagingSenderId: "225955946171",
  appId: "1:225955946171:web:ce441cf8098d8f0a88939e"
};

const app = initializeApp(firebaseConfig); // intialize firebase app

export const firestore = getFirestore(app); // initialize firestore


