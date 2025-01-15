import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useUser } from '../contexts/UserContext';
import { useFirestore } from '../contexts/FirestoreContext';
import { query, where, getDocs } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const [warningColor, setWarningColor] = useState('error');
  const [showResend, setShowResend] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const { setUser } = useUser();
  const { usersCollection } = useFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setWarning('Please verify your email before logging in.');
        setWarningColor('error');
        setShowResend(true);
        return;
      }

      // Fetch additional user information from Firestore
      const q = query(usersCollection, where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        setUser({ ...user, ...userData });
      } else {
        console.error('No such user document!');
      }

      // Redirect to dashboard or home page
      navigate('/products');
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
          setWarningColor('error');
          setWarning('Error logging in');
          break;
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        setWarning('Verification email sent. Please check your inbox.');
        setWarningColor('success');
        setShowResend(false);
      }
    } catch (error) {
      console.error('Error sending verification email:', error.message);
      setWarningColor('error');
      setWarning('Error sending verification email. Please try again.');
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
              <Typography color={warningColor} variant="body2">
                {warning}
              </Typography>
            )}
            {showResend && (
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleResendVerification}
              >
                Resend Verification Email
              </Button>
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