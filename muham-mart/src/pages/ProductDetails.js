import * as React from 'react';
import { Container, Grid2, Card, CardContent, CardMedia, Typography } from '@mui/material';
import muhammadiyahLogo from '../assets/images/muhammadiyah_logo.png';
import Box from '@mui/material/Box';
import { useFirestore } from '../contexts/FirestoreContext';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

export default function ProductDetail() {
    //get the data from firestore
        const [product, setProduct] = useState({});
        const { itemsCollection } = useFirestore();
        const { id } = useParams();
        useEffect(() => {
          const fetchProducts = async () => {
            try {
              const snapshot = await getDocs(itemsCollection);
              snapshot.forEach((doc) => {
                if(doc.id===id){
                  setProduct(doc.data());
                }
              });
            } catch (error) {
              console.error("Error fetching products: ", error);
            }
          };
      
          fetchProducts();
        }, [itemsCollection]);

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
            <Grid2 container spacing={2} justifyContent="center">
                <Grid2 item xs={12} sm={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="300"
                            image={process.env.PUBLIC_URL + '/assets/images/' + product.image}
                            alt={product.name}
                        />
                    </Card>
                </Grid2>
                <Grid2 item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Description: {product.description}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Price: ${product.price}
                            </Typography>

                            <Box
                                sx={{
                                    bgcolor: 'background.paper',
                                    pt: 2
                                }}
                            ></Box>

                            <Button variant="contained" color="primary" >
                                Add to cart
                            </Button>
                        </CardContent>
                        
                    </Card>
                </Grid2>
            </Grid2>
        </Container>
    </>
    );
}