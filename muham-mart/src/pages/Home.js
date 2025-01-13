// App.js
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid2 from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme.js'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import muhammadiyahLogo from '../assets/images/muhammadiyah_logo.png';
import Footer from '../components/Footer.js';

const cards = [
  {
    title: 'Shop Products',
    description: 'Browse our collection of items available in the minimart.',
    image: '/api/placeholder/345/140'
  },
  {
    title: 'Earn Vouchers',
    description: 'Complete tasks and earn vouchers to spend in our store.',
    image: '/api/placeholder/345/140'
  },
  {
    title: 'Track Orders',
    description: 'View your order history and current order status.',
    image: '/api/placeholder/345/140'
  },
];

const Home = () => {
    const navigate = useNavigate();
    const handleSignInClick = () => {
        navigate('/login');
    };
    const handleLearnMoreClick = () => {
        navigate('/about');
    };
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
            {/* Hero unit */}
            <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
            >
            <Container maxWidth="sm">
                <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                >
                Welcome to MuhamMart
                </Typography>
                <CardMedia
                    component="img"
                    image={muhammadiyahLogo} // Use imported logo
                    alt="Muhammadiyah Logo"
                    sx={{ width: '200px', margin: '0 auto', pt: 2 }}
                />
                <Typography variant="h5" align="center" color="text.secondary">
                Your one-stop shop for all your needs. Earn vouchers, shop products,
                and track your orders - all in one place.
                </Typography>
                <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
                >
                <Button variant="contained" onClick={handleSignInClick}>Sign In</Button>
                <Button variant="outlined" onClick={handleLearnMoreClick}>Learn More</Button>
                </Stack>
            </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
            <Grid2 container spacing={4}>
                {cards.map((card, index) => (
                <Grid2 item key={index} size={{ xs: 12, sm: 6, md: 4}}>
                    <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                        </Typography>
                        <Typography>
                        {card.description}
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid2>
                ))}
            </Grid2>
            </Container>
        </main>
        <Footer />
        </ThemeProvider>
    );
}

export default Home;