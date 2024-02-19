import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const request = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      userCredentials
    );
    console.log(request);
    const response = request.data.data;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

const initialState = {
  user: null,
  error: null,
  loading: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error;
      });
  },
});

export default userSlice.reducer;
