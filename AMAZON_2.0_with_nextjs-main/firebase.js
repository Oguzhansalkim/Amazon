import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP7b73qqCb7E-2aEu3OE29CqhhSI18hsI",
  authDomain: "next-js-6a5b4.firebaseapp.com",
  projectId: "next-js-6a5b4",
  storageBucket: "next-js-6a5b4.appspot.com",
  messagingSenderId: "367786643109",
  appId: "1:367786643109:web:bc0f2f91ef59c6c0a0c74c",
  measurementId: "G-K8D0F45KLF",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
