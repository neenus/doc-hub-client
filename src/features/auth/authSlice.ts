import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import authService from "../../services/authService";
import { User } from '../../types';

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
  message: string;
  token?: string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isInitialized: false,
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

// Register User
/**
 * 
 * @param user The user parameter is an object with the name, email, and password properties.
 * @param thunkAPI An object that provides access to the Redux store and other utilities for creating thunks.
 * @returns A promise that resolves to the result of the `authService.register` function or rejects with an error message.
 */
export const register = createAsyncThunk("auth/register", async (user: { name: string, email: string, role: string }, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error: any) {
    const message = (error.response?.data?.message || error.message || error.toString()) as string;
    return thunkAPI.rejectWithValue({ message });
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clear: (state) => {
      state.user = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isInitialized = true;
    },
    initializeAuth: (state) => {
      state.isInitialized = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        state.message = '';
        state.token = action.payload.token;
        state.isInitialized = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Something went wrong"; // TODO: Add error message returned from api
        state.user = null;
        state.message = "Something went wrong"; // TODO: Add error message returned from api
        state.token = '';
        state.isInitialized = true;
      })
      .addCase(me.pending, state => {
        state.loading = true;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null
        state.message = '';
        state.token = action.payload.token;
        state.isInitialized = true;
      })
      .addCase(me.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Something went wrong"; // TODO: Add error message returned from api
        state.user = null;
        state.message = "Something went wrong"; // TODO: Add error message returned from api
        state.token = '';
        state.isInitialized = true;
      })
      .addCase(logout.pending, state => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.message = '';
        state.token = '';
        state.isInitialized = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Something went wrong"; // TODO: Add error message returned from api
        state.user = null;
        state.message = "Something went wrong"; // TODO: Add error message returned from api
        state.token = '';
        state.isInitialized = true;
      })
      .addCase(register.pending, state => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.message = '';
        state.isInitialized = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Something went wrong"; // TODO: Add error message returned from api
        state.message = "Something went wrong"; // TODO: Add error message returned from api
        state.isInitialized = true;
      });
  }
});

export const { clearError, setUser, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
