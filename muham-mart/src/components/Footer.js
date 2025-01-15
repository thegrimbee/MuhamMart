import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          MuhamMart
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    );
  }

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                Muhammadiyah Welfare Home
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                Empowering residents through technology
            </Typography>
            <Copyright />
        </Box>
    );
}

export default Footer;