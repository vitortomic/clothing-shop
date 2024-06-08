import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black color for primary elements
    },
    secondary: {
      main: '#000000', // Black color for secondary elements
    },
    text: {
      primary: '#000000', // Black text color
      secondary: '#000000', // Black text color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff', // White text color for buttons
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000', // Black background for AppBar
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)', // More pronounced shadow
        },
      },
    },
  },
});

export default theme;
