import { initializeApp } from "firebase/app";
import{ getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCDB3rnzdn6mglFg7QR_C_G9XRuaiN3pFg",
  authDomain: "undercode-96be2.firebaseapp.com",
  projectId: "undercode-96be2",
  storageBucket: "undercode-96be2.appspot.com",
  messagingSenderId: "995477928658",
  appId: "1:995477928658:web:26be16649bacd405e70b0b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export{db}