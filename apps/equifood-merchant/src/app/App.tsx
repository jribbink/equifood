import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { AppState, AppStateStatus } from 'react-native';
import RootLayout from './layouts/RootLayout';
import { SWRConfig } from 'swr';
import { EquifoodCoreContext } from '@equifood/ui-shared';
import { appConfig } from '@equifood/ui-shared';

const App = () => {
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
      <EquifoodCoreContext
        config={{
          apiUrl: appConfig?.apiUrl,
          wsUrl: appConfig?.wsUrl,
        }}
      >
        <SWRConfig value={swrConfig}>
          <RootLayout></RootLayout>
        </SWRConfig>
      </EquifoodCoreContext>
    </NativeBaseProvider>
  );
};

export default App;
