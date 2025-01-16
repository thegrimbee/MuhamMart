import * as React from 'react';
import { useUser } from '../contexts/UserContext';
import { useFirestore } from '../contexts/FirestoreContext';
import { getDocs } from 'firebase/firestore';
import { Card, CardContent, CardMedia, Typography, Grid2, Box } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
const MyCart =  () => {
    const { user } = useUser();
    const { cartsCollection } = useFirestore();
    const [cartItems, setCartItems] = React.useState([]);
    const { itemsCollection } = useFirestore();
    React.useEffect(() => {
        const fetchCartItems = async () => {
            if (user) {
                const cartSnapshot = await getDocs(cartsCollection);
                const itemsSnapshot = await getDocs(itemsCollection);
                const carts = cartSnapshot.docs.map(doc => ({ ...doc.data() }));
                const items = {};
                for (const doc of itemsSnapshot.docs) {
                    items[doc.id] = doc.data();
                }
                const cartItems = [];
                carts.forEach(cart => {
                        if (cart.user === user.uid) {
                            const itemIds = Object.keys(cart);
                            itemIds.forEach(itemId => {
                                if (itemId !== 'user') {
                                    cartItems.push({ ...items[itemId], id: itemId, quantity: cart[itemId] });
                                }
                            });
                            
                        }
                    });
                setCartItems(cartItems);
            }
        };

        fetchCartItems();
    }, [user, cartsCollection]);
    

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
            ))}
        </Grid2>
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
                <b>Total Cost: {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</b>
            </Typography>
            <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                <ConfirmationNumberIcon sx={{ fontSize: 40 }}/>
            </Box>
        </Box>
        <Footer />
    </>
    );
};

export default MyCart;