
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8yvATM9j4UXqJPkOHKkZrWoTfutuUTd8",
  authDomain: "lab-notes-156fc.firebaseapp.com",
  projectId: "lab-notes-156fc",
  storageBucket: "lab-notes-156fc.appspot.com",
  messagingSenderId: "1090788170577",
  appId: "1:1090788170577:web:2359187a721f8ce22f9170"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth};