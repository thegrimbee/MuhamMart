import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Header from '../components/Header.js';
import theme from '../theme.js';
import { ThemeProvider } from '@emotion/react';
const Store = () => {
    return (
        <ThemeProvider theme={theme}>
        <Header></Header>
        <Container maxWidth="md">
          <Box sx={{ mt: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Store
            </Typography>
            <Typography variant="body1">
              Welcome to the Muham Mart Store! Our store is currently under construction. Please check back later for an amazing shopping experience.
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
  };
  
  export default Store;