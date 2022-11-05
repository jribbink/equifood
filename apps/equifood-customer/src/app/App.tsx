import './bootstrap';

import React, { useEffect, useState } from 'react';
import { NativeBaseProvider } from 'native-base';

import { Provider as ReduxProvider } from 'react-redux';
import { RootState } from './redux/store';
import { SafeAreaView } from 'react-native';
import RootLayout from './layouts/RootLayout/RootLayout';
import { bootstrapApp } from './bootstrap';
import { Store } from '@reduxjs/toolkit';
import LoadingScreen from './screens/LoadingScreen/LoadingScreen';

const App = () => {
  const [store, setStore] = useState<Store<RootState>>();

  useEffect(() => {
    (async () => {
      const { store } = await bootstrapApp();
      setStore(store);
    })();
  }, []);

  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {store ? (
          <ReduxProvider store={store}>
            <RootLayout></RootLayout>
          </ReduxProvider>
        ) : (
          <LoadingScreen></LoadingScreen>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default App;
