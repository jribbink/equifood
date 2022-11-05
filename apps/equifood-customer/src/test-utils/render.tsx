import React, { PropsWithChildren } from 'react';
import { render as defaultRender } from '@testing-library/react-native';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

// As a basic setup, import your same slice reducers
import { setupStore, AppStore, RootState } from '../app/redux/store';
import { NativeBaseProvider } from 'native-base';
import { PreloadedState } from '@reduxjs/toolkit';

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

export function render(
  ui: React.ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
      <Provider store={store}>
        <NativeBaseProvider initialWindowMetrics={inset}>
          {children}
        </NativeBaseProvider>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return {
    ui,
    store,
    ...defaultRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
