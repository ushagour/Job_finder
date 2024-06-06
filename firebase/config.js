// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

// import { getAnalytics } from "firebase/analytics";
// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmzrHgxvls08CKslC7_sVMqOlevQaezLs",
  authDomain: "job-search-88198.firebaseapp.com",
  projectId: "job-search-88198",
  storageBucket: "job-search-88198.appspot.com",
  messagingSenderId: "644887007501",
  appId: "1:644887007501:web:bde73d87873a1b58bae044",
  measurementId: "G-GETQWQKPY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth };










