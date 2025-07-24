// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      color: 'rgba(0, 0, 0, 0.87)',
    },
    body1: {
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
});

export default theme;
