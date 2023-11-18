// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYljVMyCc5yn3iMp2rGuJqHmU-Ts3tYko",
  authDomain: "the-purple-mango.firebaseapp.com",
  projectId: "the-purple-mango",
  storageBucket: "the-purple-mango.appspot.com",
  messagingSenderId: "123944697249",
  appId: "1:123944697249:web:01b5a2892e9510f4cd1fe0",
  measurementId: "G-XSJNW549CQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
