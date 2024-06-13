// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBRjcxoBo2ezaS89SwsrFAuEJ-4pd0sU6k",
  authDomain: "chatrealtime-cb6a0.firebaseapp.com",
  projectId: "chatrealtime-cb6a0",
  storageBucket: "chatrealtime-cb6a0.appspot.com",
  messagingSenderId: "156500470716",
  appId: "1:156500470716:web:1a180086bd4e4e056a19b9",
  measurementId: "G-DY06R8Q9NC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };
