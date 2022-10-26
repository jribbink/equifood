import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import merchantReducer from './slices/merchant-slice';

export const store = configureStore({
  reducer: {
    merchants: merchantReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
