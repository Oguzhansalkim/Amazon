import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCS7UsHFmx4IIHZRIO_lNn2JmmOw5lkV18",
  authDomain: "clone-718c0.firebaseapp.com",
  projectId: "clone-718c0",
  storageBucket: "clone-718c0.appspot.com",
  messagingSenderId: "983852716557",
  appId: "1:983852716557:web:5e69736a0030cbe942bb44",
  measurementId: "G-V6GHDZBNG3",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
export default db;
