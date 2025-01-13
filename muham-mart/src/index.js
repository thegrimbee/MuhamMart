import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {initializeApp} from 'firebase/app';
import{getDocs, collection, getFirestore} from 'firebase/firestore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

//collection reference
const products = collection(db, 'Products');
const users = collection(db, 'Users');
const carts = collection(db, 'Carts');

//get documents
getDocs(products).then((Snapshot) => {
  let products = [];
  Snapshot.forEach((doc) => {
    products.push({...doc.data(), id: doc.id});
  });
  console.log(products);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
