import * as config from './firebase';

// New For Firebase 9
import { initializeApp } from 'firebase/app';
import { getFirestore,
    collection, doc,
    getDocs,
    addDoc,
    deleteDoc,
    onSnapshot,//Real Time listener
    query,where, 
    orderBy, serverTimestamp,
    getDoc,
    updateDoc

} from "firebase/firestore";//service name


import{
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,updateProfile,//Signup
    onAuthStateChanged,
    signOut,signInWithEmailAndPassword,
}from'firebase/auth'



const firebaseConfig=config.firebaseConfig()

// New For Firebase 9
//init firebase app
const app = initializeApp(firebaseConfig);
//init services
const auth = getAuth(app);
//New ##########################################################################
//#############################################################################


  /**
   * This is a method that creates account with credentials provided.
   * 
   * @param {Object} param0      This is an object containing strings labelled as name, email and password.
   * @param {Function} onSuccess This is a function triggered when it is successful.
   * @param {Function} onError   This is a function triggered when it is unsuccessful.
   * @returns 
   */
   export const createAccount = async ({ name, email, password }, onSuccess, onError) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth,email, password);
      const user=userCredential.user;
      if (user) {
        await updateProfile(user,{ displayName: name });
        await sendEmailVerification(user);
        return onSuccess(user);
      }
    } catch (error) {
      return onError(error);
    }
  }

  /**
  * This is a general method to obtain the user's uid.
  * 
  * @returns  A string representing uid of the user's account or null.
  */
  export const getCurrentUserId = () => auth.currentUser ? auth.currentUser.uid : null;
  
  
  /**
  * This is a general method to obtain the user's display name.
  * 
  * @returns  A string representing display name of the user's account or null.
  */
  export const getCurrentUserName = () => auth.currentUser ? auth.currentUser.displayName : null;
     
  /**
   * This is a method to change the authentication state of the user.
   * 
   * @param {Function} onUserAuthenticated 
   * @param {Function} onUserNotFound 
   * @returns 
   */
   export const setOnAuthStateChanged = (onUserAuthenticated, onUserNotFound) =>{
    const unsubscribe=onAuthStateChanged(auth,(user) => {
    if (user) {
        return onUserAuthenticated(user);
    } else {
        return onUserNotFound(user);
    }
    })
    };

 /**
   * This is a sign out function.
   * 
   * @param {Function} onSuccess This is a function triggered when it is successful.
   * @param {Function} onError   This is a function triggered when it is unsuccessful.
   * @returns 
   */
  export const signOutUser = async (onSuccess, onError) => {
    try {
      await signOut(auth);
      return onSuccess();
    } catch (error) {
      return onError(error);
    }
  }

  /**
 * This is a method to allow users of the app to sign in.
 * 
 * @param {Object} param0      This is an object containing strings labelled as email and password.
 * @param {Function} onSuccess This is a function triggered when sign in is successful.
 * @param {Function} onError   This is a function triggered when sign in is unsuccessful.
 * @returns 
 */
 export const signInUser = async ({ email, password }, onSuccess, onError) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth,email, password);
      return onSuccess(user); 
    } catch (error) {
      return onError(error);
    }
  }

//OLD##########################################################################
//#############################################################################

  
  
  
  
 
  
  

  

  
  
//   /**
//    * This method changes the password for the user's account.
//    * 
//    * @param {String} currentPassword  A String representing the current password.
//    * @param {String} newPassword      A String representing the new password.
//    * @returns                         A boolean to indicate change of password outcome.
//    */
//   export const changePassword = async (currentPassword, newPassword) => {
//       const user = auth.currentUser;
//       try {
//           //re-authenticate for PW change
//           const credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
//           await user.reauthenticateWithCredential(credentials);
  
//           //Change PW after re-authentication
//           await user.updatePassword(newPassword);
  
//           // console.log("Password changed");
  
//           return true; //successful
//       } catch (error) {
//           if (error.code == "auth/wrong-password") {
//             Alert.alert(
//               "Current Password Wrong",
//               "Please ensure that the current password you've entered is correct.",
//               [ { text:"Understood", onPress: () => {} } ]
//             )
//           }
  
//           if (error.code === 'auth/weak-password') {
//             Alert.alert(
//             "Weak New Password",
//             "Please ensure that the new password you've entered meets the minimum requirement of 6 characters.",
//             [ { text:"Understood", onPress: () => {} } ]
//             )
//           };
          
//           return false;
//       }
//   }
  
  
//   /**
//    * This method resets the password of the user's account by sending an email to their email.
//    * 
//    * @param {String} email   The email that the user use to register their account.
//    * @returns                A boolean to represent outcome of reseting password.
//    */
//   export const resetPassword = async (email) => {
//       try {
//           await auth.sendPasswordResetEmail(email);
  
//           Alert.alert(
//             "Email Sent",
//             "The link to reset your password has been sent to your email.",
//             [{ text: 'Understood', onPress: ()=>{} }],
//           );
//           return true;
//       } catch (error) {
//           if (error.code == "auth/invalid-email") {
//             Alert.alert(
//               "Invalid Email",
//               "Please ensure that the email you've entered is valid.",
//               [ { text:"Understood", onPress: () => {} } ]
//               )
//           }
//           if (error.code == "auth/user-not-found") {
//             Alert.alert(
//               "User Not Found",
//               "There are no accounts with the email address. Please ensure the email address is associated to your account.",
//               [{ text: 'Ok', onPress: ()=>{} }],
//             );
//           }
//           console.log(error)
          
//           return false;
//       }
//   }