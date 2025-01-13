import * as React from 'react';
import { Container, Grid2, Card, CardContent, CardMedia, Typography } from '@mui/material';
import muhammadiyahLogo from '../assets/images/muhammadiyah_logo.png';

const products = [
    { id: 1, name: 'Product 1', description: 'Description of Product 1', image: 'image1.jpg' },
    { id: 2, name: 'Product 2', description: 'Description of Product 2', image: 'image2.jpg' },
    // Add more products as needed
];

export default function Products() {
    return (
        <Container>
            <Grid2 container spacing={4}>
                {products.map((product) => (
                    <Grid2 item key={product.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.image}
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
    );
}