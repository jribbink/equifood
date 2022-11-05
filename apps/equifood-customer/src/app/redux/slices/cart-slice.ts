import { Item } from '@equifood/api-interfaces';
import { createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

interface CartState {
  items: Item[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
};

export const cartSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items=state.items.filter(items => {
        return items.id !== action.payload.id;
      });
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
