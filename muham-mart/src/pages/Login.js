import React, { useEffect, useState } from 'react';
import { useFirestore } from '../contexts/FirestoreContext';
import { getDocs } from 'firebase/firestore';

const Login = () => {
  const { usersCollection } = useFirestore();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(usersCollection);
      const usersList = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setUsers(usersList);
    };

    fetchUsers();
  }, [usersCollection]);

  return (
    <div>
      <h1>Current Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Login;