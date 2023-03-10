import type { RenderOptions } from '@testing-library/react';

// As a basic setup, import your same slice reducers
import { setupStore, AppStore, RootState } from '../app/redux/store';
import { PreloadedState } from '@reduxjs/toolkit';
import { bootstrapApp } from '../app/util/bootstrap';

import { render as baseRender } from '@equifood/ui-shared/test-utils';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: AppStore;
  preloadedState?: PreloadedState<RootState>;
}

export async function render(
  ui: React.ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  await bootstrapApp(store);

  return baseRender(ui, {
    store,
    ...renderOptions,
  });
}
