import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
require('firebase/database');
const firebaseConfig = {
  apiKey: "AIzaSyCBREdJ7OpG-bk1-rRPsN_sk7ooydr5HXg",
  authDomain: "rvision-ac95f.firebaseapp.com",
  projectId: "rvision-ac95f",
  storageBucket: "rvision-ac95f.appspot.com",
  messagingSenderId: "626051467438",
  appId: "1:626051467438:web:7198bbabf28916aa9d853f",
  measurementId: "G-M2RBT85WKS"
};
  // Initialize Firebase
  
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;