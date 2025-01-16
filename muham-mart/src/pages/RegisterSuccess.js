import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import theme from '../theme.js';
import { ThemeProvider } from '@emotion/react';

const RegisterSuccess = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Registration Successful!
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            A verification email has been sent to your email address. Please check your inbox and follow the instructions to verify your account.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
            onClick={handleLoginClick}
          >
            Go to Login
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterSuccess;