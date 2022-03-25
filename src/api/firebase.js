// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/storage';
import "firebase/compat/firestore";


// // New For Firebase 9
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore"; 


// import{
//     getAuth
// }from 'firebase/auth'

/**
 * This is the firebase configuration file for the project.
 * This file contains confidential information and should not be leaked.
 * 
 * @author DeepSeeds
 */
//Old Config

// //Config 24 Mar 2022
export const firebaseConfig= ()=>{ return{
    apiKey: "AIzaSyCKkpQpAIH2YUrkzHLbPW5uNm1zk9BfgPg",
    authDomain: "deepseeds-a4bfa.firebaseapp.com",
    projectId: "deepseeds-a4bfa",
    storageBucket: "deepseeds-a4bfa.appspot.com",
    messagingSenderId: "278371473929",
    appId: "1:278371473929:web:98cce49a0b9d118da476d8",
    measurementId: "G-Z891W0VHXE"
  }};



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig()) : firebase.app();
firebase.firestore().settings({ experimentalForceLongPolling: true });
firebase.storage();

export default firebase;






















// import firebase from "firebase/app";
// import "firebase/auth";
// import 'firebase/storage';
// import "firebase/firestore";

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// /**
//  * This is the firebase configuration file for the project.
//  * This file contains confidential information and should not be leaked.
//  * 
//  * @author NTU CZ2006 Team Alpha
//  */
// //Old Config
// // const firebaseConfig = {
// //     apiKey: "AIzaSyAFPFtvRciT4lqP_1MvI8ga5x9NMFYgOW0",
// //     authDomain: "beatstride.firebaseapp.com",
// //     databaseURL: "https://beatstride-default-rtdb.asia-southeast1.firebasedatabase.app/",
// //     projectId: "beatstride",
// //     storageBucket: "beatstride.appspot.com",
// //     messagingSenderId: "721799742828",
// //     appId: "1:721799742828:web:42d0086c9e26ab37275f49",
// //     measurementId: "G-HK604GWN0B"
// //   };
// //Config 1 Oct 2021
// const firebaseConfig = {
//     apiKey: "AIzaSyDBRjQrbX62NaICit5a3ki4MB0BIr1uZkg",
//     authDomain: "alpha-5d420.firebaseapp.com",
//     databaseURL: "https://alpha-5d420.firebaseio.com",
//     projectId: "alpha-5d420",
//     storageBucket: "alpha-5d420.appspot.com",
//     messagingSenderId: "209381214346",
//     appId: "1:209381214346:web:322b05ced4fc78c28f8573",
//     measurementId: "G-MTH5X21B6P"
//   };

// const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// firebase.firestore().settings({ experimentalForceLongPolling: true });
// firebase.storage();

// export default firebase;