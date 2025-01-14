import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, where, getDocs } from 'firebase/firestore';
import { useFirestore } from './FirestoreContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const { usersCollection } = useFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const q = query(usersCollection, where('uid', '==', authUser.uid));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const authUserDoc = querySnapshot.docs[0];
          const authUserData = authUserDoc.data();
          setUser({ ...authUser, ...authUserData });
        } else {
          console.error('No such user document!');
        }
      } else {
        // User is signed out, set the user state to null
        setUser(null);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [auth, usersCollection]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);