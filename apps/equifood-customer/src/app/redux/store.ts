import {
  Action,
  combineReducers,
  configureStore,
  PreloadedState,
  ThunkAction,
} from '@reduxjs/toolkit';
import cartReducer from './slices/cart-slice';

const rootReducer = combineReducers({
  cart: cartReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
