import * as React from 'react';
import { Container, Grid2, Card, CardContent, CardMedia, Typography, TextField, Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { useFirestore } from '../contexts/FirestoreContext';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddToCart from '../utils/AddToCart';
import Header from '../components/Header';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EditIcon from '@mui/icons-material/Edit';
import { useUser } from '../contexts/UserContext';
import DeleteIcon from '@mui/icons-material/Delete';

function AddButton({ product }) {
    const [quantity, setQuantity] = useState(0);
    const { user } = useUser();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        setQuantity(1);
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            setQuantity(0);
        }
    };

    const handleAddingToCart = async () => {
        await AddToCart(user ? user.uid : null, product, quantity);
        navigate('/products'); // Redirect to the products page
    };

    return (
        <>
            {quantity === 0 ? (
                <Button id="addToCartButton" variant="contained" color="primary" onClick={handleAddToCart}>
                    Add to cart
                </Button>
            ) : (
                <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                        <Button variant="contained" color="primary" onClick={handleDecrement}>
                            -
                        </Button>
                        <Typography variant="h6" component="div">
                            {quantity}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleIncrement}>
                            +
                        </Button>
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleAddingToCart}>
                        Add to cart
                    </Button>
                </Box>
            )}
        </>
    );
}

export default function ProductDetail() {
    //get the data from firestore
    const [product, setProduct] = useState({});
    const { itemsCollection } = useFirestore();
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({});
    const { user } = useUser();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const productDoc = await getDoc(doc(itemsCollection, id));
            if (productDoc.exists()) {
                setProduct({id: id, ...productDoc.data() });
                setEditedProduct({id: id, ...productDoc.data() });
            }
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
        };
    
        fetchProducts();
    }, [id, itemsCollection]);

    const handleEditToggle = () => {
        if (user && user.roleRank > 0) {
            setIsEditing(!isEditing);
        } else {
        console.warn("You do not have permission to edit this item.");
        }
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

    const handleDelete = async () => {
        try {
          await deleteDoc(doc(itemsCollection, id));
          navigate('/products'); // Redirect to products page after deletion
        } catch (error) {
          console.error("Error deleting product: ", error);
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
                            {isEditing && user && user.roleRank > 0 ? (
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
                                        {user && user.roleRank > 0 && (
                                            <IconButton color="inherit" onClick={handleEditToggle}>
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                        {user && user.roleRank > 0 && (
                                            <IconButton color="inherit" onClick={handleDelete}>
                                                <DeleteIcon />
                                            </IconButton>
                                        )}
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
                                    <AddButton product={product}/>  
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