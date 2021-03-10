import firebase from'firebase/app'
import 'firebase/auth';


// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCJSFwft4F1wSMjlUrJRbsP0uUQzDoFNwk",
    authDomain: "lms-projet.firebaseapp.com",
    projectId: "lms-projet",
    storageBucket: "lms-projet.appspot.com",
    messagingSenderId: "474257517913",
    appId: "1:474257517913:web:7607e00e9962609c20f048",
    measurementId: "G-3MKMWQBGJ5"
  };
  // Initialize Firebase
  const app=firebase.initializeApp(firebaseConfig);

  //export notre base de données
  export default fireDB;
  //export the auth app
  export const auth=app.auth();
  