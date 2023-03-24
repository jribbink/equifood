import { extendTheme } from 'native-base';

export const equifoodTheme = extendTheme({
  colors: {
    primary: {
      50: '#f7fee7',
      100: '#ecfccb',
      200: '#d9f99d',
      300: '#bef264', // merchant card bg
      400: '#a3e635',
      500: '#84cc16', // Description, buttons
      600: '#65a30d', // Price tags
      700: '#4d7c0f',
      800: '#3f6212', // Title
      900: '#365314',
    },
  },
  // components: {
  //   Button: {
  //     backgroundColor: 'primary.200',
  //     borderRadius: 30,
  //   },
  // },
});
