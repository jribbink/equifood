import React, { PropsWithChildren } from 'react';
import { render as defaultRender } from '@testing-library/react-native';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

// As a basic setup, import your same slice reducers
import { store as defaultStore, AppStore } from '../src/app/redux/store';
import { NativeBaseProvider } from 'native-base';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: AppStore;
}

export function render(
  ui: React.ReactElement,
  { store, ...renderOptions }: ExtendedRenderOptions = {}
) {
  const resolvedStore = store || defaultStore;
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return (
      <Provider store={resolvedStore}>
        <NativeBaseProvider>{children}</NativeBaseProvider>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return {
    defaultStore,
    ...defaultRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
