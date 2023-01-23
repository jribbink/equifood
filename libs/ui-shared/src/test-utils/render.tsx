import React, { PropsWithChildren } from 'react';
import { render as defaultRender } from '@testing-library/react-native';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

// As a basic setup, import your same slice reducers
import { NativeBaseProvider } from 'native-base';
import { Store } from '@reduxjs/toolkit';
import { bootstrapApp } from '../util/bootstrap';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store: Store;
}

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export async function render(
  ui: React.ReactElement,
  { store, ...renderOptions }: ExtendedRenderOptions
) {
  await bootstrapApp(store);

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
