import * as React from 'react';
import { Container, Grid2, Card, CardContent, CardMedia, Typography, TextField, Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { useFirestore } from '../contexts/FirestoreContext';
import { doc, getDoc, updateDoc, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EditIcon from '@mui/icons-material/Edit';

export default function ProductDetail() {
    //get the data from firestore
    const [product, setProduct] = useState({});
    const { itemsCollection } = useFirestore();
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({});
    const { id } = useParams();
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const productDoc = await getDoc(doc(itemsCollection, id));
            if (productDoc.exists()) {
                setProduct(productDoc.data());
                setEditedProduct(productDoc.data());
            }
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
        };
    
        fetchProducts();
    }, [id, itemsCollection]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
      };
    
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        await updateDoc(doc(itemsCollection, id), editedProduct);
        setProduct(editedProduct);
        setIsEditing(false);
    } catch (error) {
        console.error("Error updating product: ", error);
    }
    };
    return (
    <>
        <Header />
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 6,
                pb: 0,
            }}
        ></Box>
        <Container>
            <Grid2 container spacing={2} justifyContent="center">
                <Grid2 item xs={12} sm={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="300"
                            image={product.url ? product.url : process.env.PUBLIC_URL +  '/assets/images/' +product.image}
                            alt={product.name}
                        />
                    </Card>
                </Grid2>
                <Grid2 item xs={12} sm={6}>
                    <Card>
                        <CardContent sx = {{display: 'flex', flexDirection: 'column', maxWidth: '400px'}}>
                            {isEditing ? (
                                <form onSubmit={handleFormSubmit}>
                                <TextField
                                  label="Product Name"
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                  name="name"
                                  value={editedProduct.name || ''}
                                  onChange={handleInputChange}
                                  required
                                />
                                <TextField
                                  label="Product Description"
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                  multiline
                                  rows={4}
                                  name="description"
                                  value={editedProduct.description || ''}
                                  onChange={handleInputChange}
                                  required
                                />
                                <TextField
                                  label="Product Price"
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                  type="number"
                                  name="price"
                                  value={editedProduct.price || ''}
                                  onChange={handleInputChange}
                                  required
                                />
                                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                  Save
                                </Button>
                              </form>) : (
                                <>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <IconButton color="inherit" onClick={handleEditToggle}>
                                            <EditIcon />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="h6" color="text.secondary">
                                        Description: {product.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0 }}>
                                        <Typography variant="h6" color="text.secondary">
                                            Price: {product.price}
                                        </Typography>
                                        <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                                            <ConfirmationNumberIcon />
                                        </Box>
                                    </Box>                 
                                    <Box
                                        sx={{
                                            bgcolor: 'background.paper',
                                            pt: 2
                                        }}
                                    ></Box>
                                    <Button variant="contained" color="primary" >
                                        Add to cart
                                    </Button>
                                </>
                              )}      
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </Container>
    </>
    );
}