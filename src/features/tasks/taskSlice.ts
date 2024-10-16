import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../../services/taskService";

// Get all tasks
/**
 * 
 * @param _ The underscore parameter is not used in the function and is ignored.
 * @param thunkAPI An object that provides access to the Redux store and other utilities for creating thunks.
 * @returns A promise that resolves to the result of the `taskService.getTasks` function or rejects with an error message.
 */
export const getTasks = createAsyncThunk("tasks/getTasks", async (_, thunkAPI) => {
  try {
    return await taskService.getTasks();
  } catch (error: any) {
    const message = (error.response?.data?.message || error.message || error.toString()) as string;
    return thunkAPI.rejectWithValue({ message });
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });

    builder.addCase(getTasks.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tasks = payload;
    });

    builder.addCase(getTasks.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Somthing went wrong"; // TODO: Add error message returned from api
    });
  }
});

export default taskSlice.reducer;