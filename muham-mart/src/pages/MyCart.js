import * as React from 'react';
import { useUser } from '../contexts/UserContext';
import { useFirestore } from '../contexts/FirestoreContext';
import { getDocs, addDoc, deleteDoc, updateDoc, collection, doc } from 'firebase/firestore';
import { Card, CardContent, CardMedia, Typography, Grid2, Box, Modal, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Header from '../components/Header';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ChangeQuantity from '../components/ChangeQuantity.js';
import { useNavigate } from 'react-router-dom';
const MyCart =  () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const { usersCollection, cartsCollection, itemsCollection, db } = useFirestore();
    const [cartItems, setCartItems] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const firestore = useFirestore().firestore
    const [cartId, setCartId] = React.useState(0);
    const handleOpen = (item) => {
      setSelectedItem(item);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedItem(null);
    };

    React.useEffect(() => {
        const fetchCartItems = async () => {
            if (user) {
                const cartSnapshot = await getDocs(cartsCollection);
                const itemsSnapshot = await getDocs(itemsCollection);
                const carts = cartSnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
                const items = {};
                for (const doc of itemsSnapshot.docs) {
                    items[doc.id] = doc.data();
                }
                const cartItems = [];
                carts.forEach(cart => {
                        if (cart.user === user.uid) {
                            setCartId(cart.id);
                            const itemIds = Object.keys(cart);
                            itemIds.forEach(itemId => {
                                if (itemId !== 'user' && itemId !== 'id') {
                                    cartItems.push({ ...items[itemId], id: itemId, quantity: cart[itemId] });
                                }
                            });
                            
                        }
                    });
                setCartItems(cartItems);
            }
        };

        fetchCartItems();
    }, [user, cartsCollection, itemsCollection]);
    
    const handlePurchaseClick = () => {
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const handleConfirmPurchase = async () => {
        try {
            const transaction = {
                time: new Date(),
                items: cartItems.reduce((acc, item) => {
                acc[item.id] = item.quantity;
                return acc;
                }, {}),
                user: user.uid
            };
            await addDoc(collection(db, 'Transactions'), transaction);
            // Optionally, clear the cart or provide feedback to the user
            // Delete the cart document to clear the cart
            const userCartDoc = doc(cartsCollection, cartId);
            await deleteDoc(userCartDoc);
            const userDoc = doc(usersCollection, user.id);
            await updateDoc(userDoc, {
                vouchers: user.vouchers - totalPrice
            });
            navigate('/products');
        } catch (error) {
          console.error("Error processing transaction: ", error);
        }
      };
    return (
        <>
        <Header/>
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 6,
                pb: 0,
            }}
            ></Box>
        <Grid2 container spacing={2} direction="column" alignItems="center">
            {cartItems.map((item) => (
                <a onClick={() => handleOpen(item)} style={{textDecoration: 'none', color: 'inherit'}}>
                    <Grid2 item key={item.id} xs={12} sm={8} md={6}>
                    <Card sx="width: 400px">
                        <Grid2 container>
                            <Grid2 item xs={4}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.url ? item.url : process.env.PUBLIC_URL + '/assets/images/' + item.image}
                                    alt={item.name}
                                />
                            </Grid2>
                            <Grid2 item xs={8}>
                                <CardContent>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Quantity: {item.quantity}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Price: {item.price}
                                        </Typography>
                                        <Box sx={{ ml: 0.5, display: 'flex', alignItems: 'center' }}>
                                            <ConfirmationNumberIcon/>
                                        </Box>
                                    </Box> 
                                </CardContent>
                            </Grid2>
                        </Grid2>
                    </Card>
                </Grid2>
                </a>
                
            ))}
        </Grid2>
        <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedItem && (
            <>
                <ChangeQuantity id={selectedItem.id} />
              <Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 2 }}>
                Close
              </Button>
            </>
          )}
        </Box>
        </Modal>
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 6,
                pb: 0,
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Typography variant="h4" align='center' >
                <b>Total Cost: {totalPrice}</b>
            </Typography>
            <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                <ConfirmationNumberIcon sx={{ fontSize: 40 }}/>
            </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handlePurchaseClick}>
              Purchase
            </Button>
        </Box>
        <Dialog open={confirmOpen} onClose={handleConfirmClose}>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Please recheck your items before proceeding with the purchase.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleConfirmClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleConfirmPurchase} color="primary">
                Continue
            </Button>
            </DialogActions>
        </Dialog>
    </>
    );
};

export default MyCart;