import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { JWT } from '@equifood/api-interfaces';
import axios from 'axios';
import storage from '../../storage';

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post<JWT>('/auth/login', {
      email,
      password,
    });
    return response.data;
  }
);

interface AuthState {
  jwt: JWT | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

const initialState: AuthState = {
  jwt: null,
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      authSlice.caseReducers.setJWT(state, {
        payload: null,
        type: '',
      });
    },
    setJWT(state, { payload: jwt }) {
      state.jwt = jwt;
      storage.set('jwt', jwt);
    },
  },
  extraReducers(builder) {
    builder.addCase(authenticate.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.status = 'succeeded';
      authSlice.caseReducers.setJWT(state, action);
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { logout, setJWT } = authSlice.actions;

export default authSlice.reducer;
