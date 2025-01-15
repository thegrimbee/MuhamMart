import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Card, CardContent, Avatar, Grid2 } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import { useUser } from '../contexts/UserContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const Profile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const auth = getAuth();

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
        </Box>
      </Container>
    </>
  );
};

export default Profile;