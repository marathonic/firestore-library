// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi0uZYMsIlVW4Z63-xATB4ND-GVn6qK2Y",
  authDomain: "firestore-library-2c320.firebaseapp.com",
  projectId: "firestore-library-2c320",
  storageBucket: "firestore-library-2c320.appspot.com",
  messagingSenderId: "841881491848",
  appId: "1:841881491848:web:792a1163a11a70b871c23d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();
