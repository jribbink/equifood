import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async (opts: {email: string, pw: string}) => {
    const response = await axios.post('/auth/login', {"email": opts.email, "password": opts.pw});
    return response.data;
  }
);

interface AuthState {
  jwt: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
  expires?: Date;
}

const initialState: AuthState = {
  jwt: "",
  status: 'idle'
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state,action){
        state.jwt = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(authenticate.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.jwt = action.payload.access_token;
      state.expires = action.payload.expires; 
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
