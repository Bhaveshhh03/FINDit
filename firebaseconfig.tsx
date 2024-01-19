// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {ref as storageRef} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcSAc7lMfprsmLTFN14x-3Vovhr1sAPuE",
  authDomain: "lostitem-66b75.firebaseapp.com",
  projectId: "lostitem-66b75",
  storageBucket: "lostitem-66b75.appspot.com",
  messagingSenderId: "294830399348",
  appId: "1:294830399348:web:b88f487cc1375a92259621"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const db = getFirestore(app);
export const storage=getStorage(app);
export {storageRef};