import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00008b', // Dark blue
    },
    background: {
      default: '#ffffff', // White
    },
    text: {
      primary: '#00008b', // Dark green
    },
  },
});

export default theme;