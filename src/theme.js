import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black color for primary elements (buttons, AppBar)
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
  },
});

export default theme;
