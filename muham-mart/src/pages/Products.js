import * as React from 'react';
import { Container, Grid2, Card, CardContent, CardMedia, Typography, IconButton, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { useFirestore } from '../contexts/FirestoreContext';
import { getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AddIcon from '@mui/icons-material/Add';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Products() {

    //get the data from firestore
    const [products, setProducts] = useState([]);
    const { itemsCollection } = useFirestore();
    const { user } = useUser();
    const navigate = useNavigate();

    const handleAddProductClick = () => {
        navigate('/add-product');
    };
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const snapshot = await getDocs(itemsCollection);
          const items = [];
          snapshot.forEach((doc) => {
            items.push(doc.data());
          });
          setProducts(items);
        } catch (error) {
          console.error("Error fetching products: ", error);
        }
      };
  
      fetchProducts();
    }, [itemsCollection]);
    //render the data
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
            {user && user.roleRank > 0 && (
                <>
                    <Grid2 container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <Grid2 item>
                        <Typography variant="h6">
                            Add a new product
                        </Typography>
                        </Grid2>
                        <Grid2 item>
                        <IconButton
                            color="primary"
                            onClick={handleAddProductClick}
                        >
                            <AddIcon />
                        </IconButton>
                        </Grid2>
                    </Grid2>
                    <Divider sx={{ my: 4 }} />
                </>
                )}
                <Grid2 container spacing={4}>
                    {products.map((product) => (
                        <Grid2 item key={product.id} xs={12} sm={6} md={4}>
                            <Card sx={{width: '250px'}}>
                                <CardMedia
                                    component="img"
                                    image={product.url ? product.url : process.env.PUBLIC_URL +  '/assets/images/' +product.image}
                                    alt={product.name}
                                />
                                <CardContent>
                                    <a href={`/products/${product.name}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                        <Typography gutterBottom variant="h5" component="div" color="inherit">
                                            {product.name}
                                        </Typography>        
                                    </a>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0 }}>
                                        <Typography variant="body2" color="inherit">
                                            {product.price}
                                        </Typography>
                                        <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                                            <ConfirmationNumberIcon />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
                <Box sx={{ mt: 4 }}>
                <Typography variant="body2">
                    <Link to="/product-request">I can't find the product I need</Link>.
                </Typography>
                </Box>
            </Container>
            <Footer />
        </>
        
    );
}