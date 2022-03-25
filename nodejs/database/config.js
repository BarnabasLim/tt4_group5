// Import the functions you need from the SDKs you need
var firebase = require("firebase/app");
var firestore = require('firebase/firestore/lite');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKkpQpAIH2YUrkzHLbPW5uNm1zk9BfgPg",
  authDomain: "deepseeds-a4bfa.firebaseapp.com",
  projectId: "deepseeds-a4bfa",
  storageBucket: "deepseeds-a4bfa.appspot.com",
  messagingSenderId: "278371473929",
  appId: "1:278371473929:web:98cce49a0b9d118da476d8",
  measurementId: "G-Z891W0VHXE"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);

module.exports = db;