import firebase from "firebase"

//This is my personal API Key for Firebase
//This information is not super-sensitive but at the same time not that useful to you since you cannot view the database at all.
//Create your own Firebase API key to save your own time and prevent headaches down the road.

const firebaseConfig = {
  apiKey: "AIzaSyChW2Y8P4A9-g_8g3wGY5R20pJAfoAtYlo",
  authDomain: "actioneditor-dd44f.firebaseapp.com",
  databaseURL: "https://actioneditor-dd44f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "actioneditor-dd44f",
  storageBucket: "actioneditor-dd44f.appspot.com",
  messagingSenderId: "493404571168",
  appId: "1:493404571168:web:deaab406a20179e2659e45"
};



firebase.initializeApp(firebaseConfig);

    
    export default firebase;
