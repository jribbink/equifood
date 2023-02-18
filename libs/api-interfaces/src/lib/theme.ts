import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';

export default function () {
  const theme = extendTheme({
    colors: {
      primary: {
        50: '#f7fee7',
        100: '#ecfccb',
        200: '#d9f99d',
        300: '#bef264',
        400: '#a3e635',
        500: '#84cc16',
        600: '#65a30d',
        700: '#4d7c0f',
        800: '#3f6212',
        900: '#365314',
      },
    },
    config: {
      initialColorMode: 'dark',
    },
    components: {
        Button: {
          // Can simply pass default props to change default behaviour of components.
          backgroundColor: 'lime.200',
          borderRadius: 30
        },
        Heading: {
        },
      },
  });
}