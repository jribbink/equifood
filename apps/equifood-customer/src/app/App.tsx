import React, { useEffect } from 'react';

import { NativeBaseProvider } from 'native-base';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import axios from 'axios';
import appConfig from './app-config';

const App = () => {
  useEffect(() => {
    axios.defaults.baseURL = appConfig.apiUrl;
  }, []);

  return (
    <>
      <NativeBaseProvider>
        <DefaultLayout>
          <Login></Login>
        </DefaultLayout>
      </NativeBaseProvider>
    </>
  );
};

export default App;
