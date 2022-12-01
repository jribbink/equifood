import React, { useEffect, useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import SafeViewAndroid from './osChecker';
import { Provider as ReduxProvider } from 'react-redux';
import { RootState } from './redux/store';
import { AppState, AppStateStatus, SafeAreaView } from 'react-native';
import RootLayout from './layouts/RootLayout/RootLayout';
import { bootstrapApp } from './util/bootstrap';
import { Store } from '@reduxjs/toolkit';
import LoadingScreen from './screens/LoadingScreen/LoadingScreen';
import { SWRConfig } from 'swr';

const App = () => {
  const [store, setStore] = useState<Store<RootState>>();

  useEffect(() => {
    (async () => {
      const { store } = await bootstrapApp();
      setStore(store);
    })();
  }, []);

  const swrConfig = {
    provider: () => new Map(),
    isVisible: () => {
      return true;
    },
    initFocus(callback: () => void) {
      let appState = AppState.currentState;

      const onAppStateChange = (nextAppState: AppStateStatus) => {
        /* If it's resuming from background or inactive mode to active one */
        if (
          appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          callback();
        }
        appState = nextAppState;
      };

      // Subscribe to the app state change events
      const subscription = AppState.addEventListener(
        'change',
        onAppStateChange
      );

      return () => {
        subscription.remove();
      };
    },
  };

  return (
    <NativeBaseProvider>
      <SWRConfig value={swrConfig}>
        {store ? (
          <ReduxProvider store={store}>
            <RootLayout></RootLayout>
          </ReduxProvider>
        ) : (
          <LoadingScreen></LoadingScreen>
        )}
      </SWRConfig>
    </NativeBaseProvider>
  );
};

export default App;
