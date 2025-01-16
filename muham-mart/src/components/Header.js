import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/profile');
  };
  const handleManageUsersClick = () => {
    navigate('/users');
  }
  const handleStoreClick = () => {
    navigate('/products');
  }
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <IconButton color="inherit" sx={{ mr: 2 }} onClick={handleStoreClick}>
            <StorefrontIcon />
          </IconButton>
          <a href="/products" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" color="inherit" noWrap>
              MuhamMart
            </Typography>
          </a>
          {user && user.roleRank > 0 && (
            <>
              <IconButton color="inherit" sx={{ml:20}}onClick={handleManageUsersClick}>
                <PeopleIcon />
              </IconButton>
              <Typography>
                Manage Users
              </Typography>
            </>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body1" color="inherit" sx={{ ml: 1 }}>
            {user ? user.name : 'Guest'}
          </Typography>
          <IconButton color="inherit" onClick={handleProfileClick}>
            <AccountCircle />
          </IconButton>
          <Typography variant="body1" color="inherit" sx={{ ml: 1 }}>
            {user ? user.vouchers : 0}
          </Typography>
          <Box sx={{ ml: 1, mr: 6, display: 'flex', alignItems: 'center' }}>
            <ConfirmationNumberIcon />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;