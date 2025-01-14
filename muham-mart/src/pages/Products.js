import * as React from 'react';
import { Container, Grid2, Card, CardContent, CardMedia, Typography } from '@mui/material';
import muhammadiyahLogo from '../assets/images/muhammadiyah_logo.png';
import Box from '@mui/material/Box';
import { useFirestore } from '../contexts/FirestoreContext';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

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
          console.log(items);
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
                                    <Typography gutterBottom variant="h5" component="div" color="inherit">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="inherit">
                                        {product.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            </Container>
        </>
        
    );
}