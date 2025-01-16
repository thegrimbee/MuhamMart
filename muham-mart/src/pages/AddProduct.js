import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { useUser } from '../contexts/UserContext.js';
import { useFirestore } from '../contexts/FirestoreContext.js';
import theme from '../theme.js';
import { ThemeProvider } from '@emotion/react';
import Header from '../components/Header.js';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [message, setMessage] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const { user } = useUser();
  const { db } = useFirestore();
  const [warningColor, setWarningColor] = useState('error');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.roleRank <= 0) {
      navigate('/'); // Redirect to home page if user is not authorized
    }
  }, [user, navigate]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };

  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'MuhamMart'); // Replace with your upload preset

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/denifdt5c/upload`, { // Replace with your cloud name
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = '';
      if (productImage) {
        imageUrl = await uploadImageToCloudinary(productImage);
      }
      await addDoc(collection(db, 'Items'), {
        name: productName,
        description: productDescription,
        price: productPrice,
        url: imageUrl,
        createdAt: new Date(),
      });
      setWarningColor('success');
      setMessage('Product added successfully!');
      setProductName('');
      setProductDescription('');
      setProductPrice(0);
      
    } catch (error) {
      console.error('Error adding product:', error);
      setWarningColor('error');
      setMessage('Error adding product. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add a New Product
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
              label="Product Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
            <Box sx={{ display: 'flex'}}>
              <Typography variant="body1" sx={{ mt: 2, mr: 2 }}>
                Product Image:
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginTop: '16px' }}
              />
            </Box>
            {message && (
              <Typography color={warningColor} variant="body2" sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Add Product
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddProduct;