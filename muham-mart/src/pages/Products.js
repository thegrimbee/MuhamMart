import * as React from 'react';
import { Container, Grid2, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useFirestore } from '../contexts/FirestoreContext';
import { getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Products() {

    //get the data from firestore
    const [products, setProducts] = useState([]);
    const { itemsCollection } = useFirestore();
  
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
  
    console.log(products);
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
                <Grid2 container spacing={4}>
                    {products.map((product) => (
                        <Grid2 item key={product.id} xs={12} sm={6} md={4}>
                            <Card sx={{width: '250px'}}>
                                <CardMedia
                                    component="img"
                                    image={process.env.PUBLIC_URL +  '/assets/images/' +product.image}
                                    alt={product.name}
                                />
                                <CardContent>
                                    <a href={`/products/${product.name}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                        <Typography gutterBottom variant="h5" component="div" color="inherit">
                                            {product.name}
                                        </Typography>        
                                    </a>
                                    <Typography variant="body2" color="inherit">
                                        {product.description}
                                    </Typography>
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