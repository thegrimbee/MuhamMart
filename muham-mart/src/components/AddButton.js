import * as React from 'react';
import { Container, Grid2, Card, CardContent, CardMedia, Typography, TextField, Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { useFirestore } from '../contexts/FirestoreContext';
import { doc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddToCart from '../utils/AddToCart';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EditIcon from '@mui/icons-material/Edit';
import { useUser } from '../contexts/UserContext';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AddButton({ product }) {
    const [quantity, setQuantity] = useState(0);
    const { user } = useUser();
    const { cartsCollection } = useFirestore();
    const navigate = useNavigate();
    console.log(user);
    const userId = user ? user.uid : null;
    
    const initialQuantity = async () => {
        console.log(userId);
        if(userId) {    
            console.log("sadf");
            const getCart = async (userId) => {
                const Snapshot = await getDocs(cartsCollection);
                console.log(Snapshot.docs.map(doc => doc.data()));
                console.log(userId);
                const cartDoc = Snapshot.docs.find(doc => doc.data().user === userId);
                if (cartDoc) {
                    console.log(cartDoc.data());
                    return cartDoc.data();
                } else {
                    return null;
                }
            }
            const cart = await getCart(userId);
            
            if (cart) {
                const quantity = cart[product.id];
                if (quantity === undefined) {
                    setQuantity(1);
                } else {
                    setQuantity(quantity);
                }
                console.log(quantity);
            } else {
                setQuantity(0);
            }
        }
    }

    React.useEffect(() => {
        initialQuantity();
    }, [userId, product.id, cartsCollection]);
    
    const handleAddToCart = async () => {
        if (quantity === 0) {
            setQuantity(1);
        }
    } 

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