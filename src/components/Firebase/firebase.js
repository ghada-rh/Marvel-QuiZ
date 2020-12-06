import app from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyA2ps_L6m0-kr6vP-CEZzFtT3aOPWHJ_R8",
    authDomain: "marvel-quiz-c6480.firebaseapp.com",
    projectId: "marvel-quiz-c6480",
    storageBucket: "marvel-quiz-c6480.appspot.com",
    messagingSenderId: "904217297559",
    appId: "1:904217297559:web:83bdf182265908e5f71fd2"
  };

class Firebase {
  constructor() {
    if( app.apps.length === 0 ){
   app.initializeApp(config); }
    this.auth = app.auth();
  }
  //inscription
  signupUser = (email, password) =>
       this.auth.createUserWithEmailAndPassword(email, password)
  //connexion
  loginUser = (email, password) =>{
    this.auth.signInWithEmailAndPassword(email, password);
  }
  //connexion
  signoutUser = () =>{
    this.auth.signOut();
  }
}

export default Firebase;
