import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useUser } from '../contexts/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      // Redirect to dashboard or home page
      navigate('/store');
    } catch (error) {
      // Check for specific error codes
      switch (error.code) {
        case 'auth/invalid-email':
          setWarning('Invalid email address');
          break;
        case 'auth/user-disabled':
          setWarning('User account is disabled');
          break;
        case 'auth/user-not-found':
          setWarning('User not found');
          break;
        case 'auth/wrong-password':
          setWarning('Incorrect password');
          break;
        default:
          console.error('Error logging in:', error.message);
          setWarning('Error logging in');
          break;
      }
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
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
              Login
            </Button>
          </form>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              Don't have an account? <Link to="/register">Register here</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;