import { Item, Merchant } from '@equifood/api-interfaces';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface CartState {
  items: { quantity: number; item: Item }[];
  merchant: Merchant;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: CartState = {
  items: [],
  merchant: {
    id: '0',
    name: 'No Restaurant',
    address: 'test',
    banner_url: 'test',
  },
  status: 'idle',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items = state.items.filter((items) => {
        return items.item.id !== action.payload.id;
      });
    },
    setMerchant(state, action) {
      state.merchant = action.payload;
    },
  },
});

export const { addItem, removeItem, setMerchant } = cartSlice.actions;

export default cartSlice.reducer;
