import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Card, CardContent, Avatar, Grid2 } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useUser } from '../contexts/UserContext';
import { useFirestore } from '../contexts/FirestoreContext';
import { getDocs, collection, query, where } from 'firebase/firestore'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ProductDetails from './ProductDetails.js'
import Header from '../components/Header.js';
const Profile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const auth = getAuth();
  const { transactionsCollection } = useFirestore();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user) {
        const q = query(transactionsCollection, where('user', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const transactionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTransactions(transactionsList);
      }
    };
    fetchTransactions();
  }, [user, transactionsCollection]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <>
      <Header/>
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Card>
            <CardContent>
              <Grid2 container spacing={2} alignItems="center">
                <Grid2 item>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                    <AccountCircleIcon fontSize="large" />
                  </Avatar>
                </Grid2>
                <Grid2 item xs>
                  <Typography variant="h5" component="div">
                    {user ? user.name || user.email : 'Guest'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {user ? user.email : (
                      <>
                        Please <Link to="/login">log in</Link> to see your profile information.
                      </>
                    )}
                  </Typography>
                </Grid2>
              </Grid2>
              {user && (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body1" color="inherit" sx={{ ml: 1 }}>
                      {user ? user.vouchers : 0}
                    </Typography>
                    <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                      <ConfirmationNumberIcon />
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Role:</strong> {user.role || 'User'}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
          <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Transaction History</Typography>
                {transactions.length > 0 ? (
                  <Box sx={{ mt: 2 }}>
                    {transactions.map(transaction => (
                      <Card key={transaction.id} sx={{ mb: 2 }}>
                        <CardContent>
                          <Typography variant="body1">
                            <b>Date:</b> {new Date(transaction.time.seconds * 1000).toLocaleString()}
                          </Typography>
                          <Typography variant="body1">
                            <b>Items:</b>
                          </Typography>
                          <ul>
                            {Object.entries(transaction.items).map(([itemId, quantity]) => (
                              <li key={itemId}>
                                <ProductDetails id={itemId} haveAddToCart={false} imageSize={"190"} quantity={quantity}/>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2">No transactions found.</Typography>
                )}
              </Box>
        </Box>
      </Container>
    </>
  );
};

export default Profile;