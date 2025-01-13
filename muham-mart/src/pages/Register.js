import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useFirestore } from '../contexts/FirestoreContext';
import { addDoc } from 'firebase/firestore';
import theme from '../theme.js';
import { ThemeProvider } from '@emotion/react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { usersCollection } = useFirestore();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add additional user information to Firestore
      await addDoc(usersCollection, {
        uid: user.uid,
        name,
        email,
        vouchers: 0,
      });

      // Redirect to login page or dashboard
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Box>
    </Container>
    </ThemeProvider>
  );
};

export default Register;