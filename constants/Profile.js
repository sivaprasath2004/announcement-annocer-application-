import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "YOUR API KEY",
  authDomain: "YOUR DOMAIN",
  projectId: "YOUR ID",
  storageBucket: "YOUR BUCKET",
  messagingSenderId: "YOUR SEDID",
  appId: "YOUR APPID",
  measurementId: "YOUR MESSID"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
