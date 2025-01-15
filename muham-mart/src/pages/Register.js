import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useFirestore } from '../contexts/FirestoreContext';
import { addDoc } from 'firebase/firestore';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const navigate = useNavigate();
  const { usersCollection } = useFirestore();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
        setWarning('Password must be at least 6 characters long');
        return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      
      // Add additional user information to Firestore
      await addDoc(usersCollection, {
        uid: user.uid,
        name,
        email,
        vouchers: 0,
        role: 'User',
        roleRank: 0,
      });

      // Redirect to login page or dashboard
      navigate('/login');
    } catch (error) {
      // Check for specific error codes
      if (error.code === 'auth/email-already-in-use') {
        setWarning('Email is already in use');
      } else if (error.code === 'auth/invalid-email'){
        setWarning('Invalid email address');
      } else {
        console.error('Error registering user:', error.message);
        setWarning('Error registering user');
      }
    }
  };

  return (
    <Container maxWidth="sm" t>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {warning && (
            <Typography color="error" variant="body2">
            {warning}
            </Typography>
         )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;