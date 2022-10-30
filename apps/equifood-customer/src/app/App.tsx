import React, { useEffect } from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import axios from 'axios';
import appConfig from './app-config';

import { Provider as ReduxProvider } from 'react-redux';
import { setupStore } from './redux/store';
import { SafeAreaView } from 'react-native';
import Root from './layouts/Root/Root';

const store = setupStore();

const App = () => {
  useEffect(() => {
    axios.defaults.baseURL = appConfig.apiUrl;
  }, []);

  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Box flex={1}>
            <Root></Root>
          </Box>
        </SafeAreaView>
      </NativeBaseProvider>
    </ReduxProvider>
  );
};

export default App;
