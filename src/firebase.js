// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6M0HPAnlW5WrIsc_AdssbSSeanY_2ZTw",
  authDomain: "music-player-react-6ef87.firebaseapp.com",
  projectId: "music-player-react-6ef87",
  storageBucket: "music-player-react-6ef87.appspot.com",
  messagingSenderId: "396699242474",
  appId: "1:396699242474:web:1346de1f3e6f1f1e48ac93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
