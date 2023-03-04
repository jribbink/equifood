import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';

export const equifoodTheme = extendTheme({
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
  components: {
    Button: {
      backgroundColor: 'primary.200',
      borderRadius: 30,
    },
    Heading: {},
  },
  // components: {
  //   Button: {
  //     // Can simply pass default props to change default behaviour of components.
  //     baseStyle: {
  //       rounded: 'md',
  //     },
  //     defaultProps: {
  //       colorScheme: 'red',
  //     },
  //   },
  //   Heading: {
  //     // Can pass also function, giving you access theming tools
  //     baseStyle: ({ colorMode }) => {
  //       return {
  //         color: colorMode === 'dark' ? 'red.300' : 'blue.300',
  //         fontWeight: 'normal',
  //       };
  //     },
  //   },
  // },
});
