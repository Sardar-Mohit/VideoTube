import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const request = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      userCredentials
    );
    const response = request.data;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
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
        state.error = action.error;
        state.loading = false;
      });
  },
});

export default loginSlice.reducer;
