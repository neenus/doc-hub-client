import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import { User } from "../../types";


// Get all users
/**
 * 
 * @param _ The underscore parameter is not used in the function and is ignored.
 * @param thunkAPI An object that provides access to the Redux store and other utilities for creating thunks.
 * @returns A promise that resolves to the result of the `userService.getUsers` function or rejects with an error message.
 */
export const getUsers = createAsyncThunk("users/getUsers", async (_, thunkAPI) => {
  try {
    return await userService.getUsers();
  } catch (error: any) {
    const message = (error.response?.data?.message || error.message || error.toString()) as string;
    return thunkAPI.rejectWithValue({ message });
  }
});

// Update user
/**
 * 
 * @param user The user object to be updated.
 * @param thunkAPI An object that provides access to the Redux store and other utilities for creating thunks.
 * @returns A promise that resolves to the result of the `userService.updateUser` function or rejects with an error message.
 */
export const updateUser = createAsyncThunk<User, User>("users/updateUser", async (user, thunkAPI) => {
  try {
    return await userService.updateUser(user);
  } catch (error: any) {
    const message = (error.response?.data?.message || error.message || error.toString()) as string;
    return thunkAPI.rejectWithValue({ message });
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [] as User[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Somthing went wrong"; // TODO: Add error message returned from api
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users = state.users.map((user) => (user._id === action.payload._id ? action.payload : user));
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Somthing went wrong"; // TODO: Add error message returned from api
    });
  },
});

export default userSlice.reducer;
