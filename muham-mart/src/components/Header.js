import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PeopleIcon from '@mui/icons-material/People';

const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/profile');
  };
  const handleManageUsersClick = () => {
    navigate('/users');
  }
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <a href="/products" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" color="inherit" noWrap>
              MuhamMart
            </Typography>
          </a>
          <Typography variant="h6" color="inherit" noWrap>
            MuhamMart
          </Typography>
          {user && user.roleRank > 0 && (
            <>
              <IconButton color="inherit" sx={{ml:2}}onClick={handleManageUsersClick}>
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
          <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
            <a href="/my-cart" style={{ textDecoration: 'none', color: 'white' }}>
              <ShoppingCartIcon sx={{ mr: 2 }} />
            </a>
          </Box>
          
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;