
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHaVl9zZG3RkdoaKxolL6hV5q91wo6dPI",
  authDomain: "property-listing-app-f1d4b.firebaseapp.com",
  projectId: "property-listing-app-f1d4b",
  storageBucket: "property-listing-app-f1d4b.firebasestorage.app",
  messagingSenderId: "1037026518307",
  appId: "1:1037026518307:web:137a29705b9fbe0d515896",
  measurementId: "G-FR962HP7H2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
