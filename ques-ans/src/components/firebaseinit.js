import firebase from "firebase";
import "firebase/firestore";
import firebaseconfig from "./firebaseConfig";
const firebaseApp = firebase.initializeApp(firebaseconfig);
export default firebaseApp.firestore();
