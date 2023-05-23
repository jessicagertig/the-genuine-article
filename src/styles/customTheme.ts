import { createTheme } from '@mui/material/styles';

// blue_gray: {
//   100: "#D3D9E5",// nav background- info light
//   200: "#BFC9D9", // secondary text - info light
//   400: "#899AB8", //form text and underline info main
//   600: "#4C5F80", // info dark
//   700: "#203C77",
// },

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#223F7C',
      light: '#2F579C',
      dark: '#172a4f',
    },
    secondary: {
      main: '#FBE9EF',
      light: '#F0A6BD',
      dark: '#EC79A9',
    },
    error: {
      light: '#DA2929',
      main: '#C42121',
      dark: '#831616',
    },
  },
  typography: {
    fontFamily: 'Bellota Text, sans-serif'
  }
});

export default customTheme;

