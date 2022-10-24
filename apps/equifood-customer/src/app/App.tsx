import React, { useRef, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { Box, NativeBaseProvider, Text } from 'native-base';
import Home from './screens/Home/Home';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';

const App = () => {
  return (
    <>
      <NativeBaseProvider>
        <DefaultLayout>
          <Home></Home>
        </DefaultLayout>
      </NativeBaseProvider>
    </>
  );
};

export default App;
