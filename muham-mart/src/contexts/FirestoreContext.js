import React, { createContext, useContext } from 'react';
import{getDocs, collection} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const FirestoreContext = createContext();

const FirestoreProvider = ({ children }) => {
  const itemsCollection = collection(db, 'Items');
  const usersCollection = collection(db, 'Users');
  const cartsCollection = collection(db, 'Carts');
  getDocs(itemsCollection).then((Snapshot) => {
    let items = [];
    Snapshot.forEach((doc) => {
      items.push({...doc.data(), id: doc.id});
    });
    console.log(items);
  });
  return (
    <FirestoreContext.Provider value={{ db, itemsCollection, usersCollection, cartsCollection }}>
      {children}
    </FirestoreContext.Provider>
  );
};

const useFirestore = () => useContext(FirestoreContext);

export { FirestoreProvider, useFirestore };