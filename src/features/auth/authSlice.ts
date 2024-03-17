import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from "../../services/authService";

type AuthState = {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  token?: string;
}

const initialState: AuthState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Login User
/**
 * 
 * @param credentials The credentials parameter is an object with the email and password properties.
 * @param thunkAPI An object that provides access to the Redux store and other utilities for creating thunks.
 * @returns A promise that resolves to the result of the `authService.login` function or rejects with an error message.
 */
export const login = createAsyncThunk("auth/login", async (credentials: { email: string, password: string }, thunkAPI) => {
  try {
    return await authService.login(credentials);
  } catch (error: any) {
    const message = (error.response?.data?.message || error.message || error.toString()) as string;
    return thunkAPI.rejectWithValue({ message });
  }
});

// Get current logged in user
/**
 * 
 * @param _ The underscore parameter is not used in the function and is ignored.
 * @param thunkAPI An object that provides access to the Redux store and other utilities for creating thunks.
 * @returns A promise that resolves to the result of the `authService.me` function or rejects with an error message.
 */
export const me = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    return await authService.me();
  } catch (error: any) {
    const message = (error.response?.data?.message || error.message || error.toString()) as string;
    return thunkAPI.rejectWithValue({ message });
  }
});

// Logout User
/**
 * 
 * @param _ The underscore parameter is not used in the function and is ignored.
 * @param thunkAPI An object that provides access to the Redux store and other utilities for creating thunks.
 * @returns A promise that resolves to the result of the `authService.logout` function or rejects with an error message.
 */
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error: any) {
    const message = (error.response?.data?.message || error.message || error.toString()) as string;
    return thunkAPI.rejectWithValue({ message });
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.isError = false;
        state.message = '';
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
        state.message = "Something went wrong"; // TODO: Add error message returned from api
        state.token = '';
      })
      .addCase(me.pending, state => {
        state.isLoading = true;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.isError = false;
        state.message = '';
        state.token = action.payload.token;
      })
      .addCase(me.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
        state.message = "Something went wrong"; // TODO: Add error message returned from api
        state.token = '';
      })
      .addCase(logout.pending, state => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.isError = false;
        state.message = '';
        state.token = '';
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
        state.message = "Something went wrong"; // TODO: Add error message returned from api
        state.token = '';
      })
  }
});

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const { resetState } = authSlice.actions;
export default authSlice.reducer;
