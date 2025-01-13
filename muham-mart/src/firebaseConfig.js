// filepath: /c:/Users/gabri/MuhamMart/muham-mart/src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA7H4n2eJNeR4LOK31yZj5IsBARekQiIz0",
  authDomain: "muhamart-8dc82.firebaseapp.com",
  projectId: "muhamart-8dc82",
  storageBucket: "muhamart-8dc82.firebasestorage.app",
  messagingSenderId: "843390560848",
  appId: "1:843390560848:web:56d8a932cf8409d0d97f55",
  measurementId: "G-RZH7SRTWML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db, firebaseConfig };