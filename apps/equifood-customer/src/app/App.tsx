import './bootstrap';

import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';

import { Provider as ReduxProvider } from 'react-redux';
import { setupStore } from './redux/store';
import { SafeAreaView } from 'react-native';
import RootLayout from './layouts/RootLayout/RootLayout';

const store = setupStore();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Box flex={1}>
            <RootLayout></RootLayout>
          </Box>
        </SafeAreaView>
      </NativeBaseProvider>
    </ReduxProvider>
  );
};

export default App;
