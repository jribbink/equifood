import { Merchant } from '@equifood/api-interfaces';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMerchants = createAsyncThunk(
  'merchants/getMerchants',
  async () => {
    const response = await axios.get('/merchants');
    return response.data;
  }
);

interface AuthState {
  jwt: String;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: AuthState = {
  jwt: "",
  status: 'idle'
};

export const merchantSlice = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    addMerchants(state, action) {
      //state.merchants.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getMerchants.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getMerchants.fulfilled, (state, action) => {
      state.status = 'succeeded';
      //state.merchants = [...action.payload];
    });
    builder.addCase(getMerchants.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { addMerchants } = merchantSlice.actions;

export default merchantSlice.reducer;
