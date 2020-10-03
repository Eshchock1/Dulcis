import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBVV0W4KaG8zMmHCxaZ1QXHTko_aHrgnlI",
    authDomain: "dulcis-67e8d.firebaseapp.com",
    databaseURL: "https://dulcis-67e8d.firebaseio.com",
    projectId: "dulcis-67e8d",
    storageBucket: "dulcis-67e8d.appspot.com",
  };
 
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
