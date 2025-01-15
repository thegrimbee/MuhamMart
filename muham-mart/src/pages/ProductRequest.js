import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { useFirestore } from '../contexts/FirestoreContext';
import theme from '../theme.js';
import { ThemeProvider } from '@emotion/react';
import Header from '../components/Header';

const ProductRequest = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const { db } = useFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'Product Requests'), {
        productName,
        description,
        createdAt: new Date(),
      });
      setMessage('Product request submitted successfully!');
      setProductName('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting product request:', error);
      setMessage('Error submitting product request. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Request a Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            {message && (
              <Typography color="success" variant="body2" sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Submit Request
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProductRequest;