import * as React from 'react';
import { Container, Grid2, Card, CardContent, CardMedia, Typography } from '@mui/material';
import muhammadiyahLogo from '../assets/images/muhammadiyah_logo.png';
import Daedalus from '../assets/images/Daedalus.jpg';
import AghanimScepter from '../assets/images/Aghanim-Scepter.jpg';
import Box from '@mui/material/Box';
const products = [
    { id: 1, name: 'Daedalus', description: '+69420 Damage', image: Daedalus },
    { id: 2, name: 'Aghanim Scepter', description: '+1 Skill', image: AghanimScepter },
    // Add more products as needed
];

export default function Products() {
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
                            <Card>
                                <CardMedia
                                    component="img"
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
        </>
        
    );
}