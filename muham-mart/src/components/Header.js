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

const Header = () => {
  const { user } = useUser();
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ShoppingCartIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            MuhamMart
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body1" color="inherit" sx={{ ml: 1 }}>
            {user ? user.email : 'Guest'}
          </Typography>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;