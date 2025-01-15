import * as React from 'react';
import { Container, Grid2, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useFirestore } from '../contexts/FirestoreContext';
import { getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';


function AddButton() {
    const [quantity, setQuantity] = useState(0);

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
                    <Button variant="contained" color="primary" onClick={() => alert('Submitted!')}>
                        Submit
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
                            
                            <AddButton/>                          
                        </CardContent>
                        
                    </Card>
                </Grid2>
            </Grid2>
        </Container>
    </>
    );
}