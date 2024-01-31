import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "ALLzaSyAbGbkFXsjSDAuXLVQTU7iFxNa-du74MbA",
  authDomain: "initial-21c67.firebaseapp.com",
  projectId: "initial-21c67",
  storageBucket: "initial-21c67.appspot.com",
  messagingSenderId: "908404905074",
  appId: "1:908404905074:web:e0a7354b3e05ec644a1eeb",
  measurementId: "G-Z12DLGMMQC"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
