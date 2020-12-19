import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyAqy_4F-_Fk18uKm1X6tzAY2IuLSRx_bsQ",
    authDomain: "quiz-marvel-c52db.firebaseapp.com",
    projectId: "quiz-marvel-c52db",
    storageBucket: "quiz-marvel-c52db.appspot.com",
    messagingSenderId: "874024742103",
    appId: "1:874024742103:web:5476105b66b1aeede15492"
  };

class Firebase {
  constructor() {
    if( app.apps.length === 0 ){
   app.initializeApp(config); }
    this.auth = app.auth();
    this.db = app.firestore();
  }
  //inscription
  signupUser = (email, password) =>
       this.auth.createUserWithEmailAndPassword(email, password)
  //connexion
  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  
  //connexion
  signoutUser = () =>
    this.auth.signOut();
  
  //recuperer mot de passe
  passwordReset = email => this.auth.sendPasswordResetEmail(email);

  user = (uid)=> this.db.doc(`users/${uid}` );
}

export default Firebase;
