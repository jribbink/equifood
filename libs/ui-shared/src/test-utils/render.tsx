import React, { PropsWithChildren, useEffect } from 'react';
import { render as defaultRender } from '@testing-library/react-native';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

// As a basic setup, import your same slice reducers
import { NativeBaseProvider } from 'native-base';
import { PreloadedState } from '@reduxjs/toolkit';
import { bootstrapApp } from '../util/bootstrap';
import { AppStore, RootState, setupStore } from '../redux/store';
import { EquifoodCoreContext } from '../context';
import appConfig from '../config/app-config';
import { useAuth } from '../hooks';

import { BehaviorSubject } from 'rxjs';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: AppStore;
  preloadedState?: PreloadedState<RootState>;
}

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export async function render(
  ui: React.ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  await bootstrapApp(store);

  const $token = new BehaviorSubject<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/ban-types
  let setJwtFn: Function = () => {};

  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    function InnerWrapper({
      children,
    }: PropsWithChildren<unknown>): JSX.Element {
      const { setJwt, token } = useAuth();

      useEffect(() => {
        $token.next(token);
      }, [token]);

      useEffect(() => {
        setJwtFn = setJwt;
      }, [setJwt]);

      return <>{children}</>;
    }

    return (
      <Provider store={store}>
        <NativeBaseProvider initialWindowMetrics={inset}>
          <EquifoodCoreContext config={{ apiUrl: appConfig?.['apiUrl'] }}>
            <InnerWrapper>{children}</InnerWrapper>
          </EquifoodCoreContext>
        </NativeBaseProvider>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return {
    ui,
    store,
    auth: {
      setJwt: setJwtFn,
      $token,
    },
    ...defaultRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
