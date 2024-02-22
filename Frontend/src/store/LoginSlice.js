import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const request = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        userCredentials
      );

      const response = request.data;
      localStorage.setItem("user", JSON.stringify(response));
      console.log(response)
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue("User not found");
      } else if (error.response && error.response.status === 401) {
        return rejectWithValue("Invalid user credentials");
      } else {
        throw error;
      }
    }
  }
);

const initialState = {
  user: null,
  error: null,
  loading: null,
};

const loginSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.user = null;
        state.error = null;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload || "Unknown error occurred";
        state.loading = false;
        console.log(state.error);
      });
  },
});

export default loginSlice.reducer;
