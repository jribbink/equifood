import React, { useEffect } from 'react';

import { NativeBaseProvider } from 'native-base';
import Home from './screens/Home/Home';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import axios from 'axios';
import appConfig from './app-config';

import { Provider as ReduxProvider } from 'react-redux';
import { setupStore } from './redux/store';

const App = () => {
  useEffect(() => {
    axios.defaults.baseURL = appConfig.apiUrl;
  }, []);

  return (
    <ReduxProvider store={setupStore()}>
      <NativeBaseProvider>
        <DefaultLayout>
        </DefaultLayout>
      </NativeBaseProvider>
    </ReduxProvider>
  );
};

export default App;
