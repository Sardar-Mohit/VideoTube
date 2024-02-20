import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegisteration = createAsyncThunk(
  "user/registerUser",
  async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        userData
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log(response.data)
      return response.data;
    } catch (error) {
        throw new Error("Error Registering User: " + (error.response?.data || "Unknown Error"));
    }
  }
);

const initialState = {
  user: null,
  error: null,
  loading: null,
};

const registerationSlice = createSlice({
  name: "registerUser",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userRegisteration.pending, (state) => {
        state.user = null;
        state.error = null;
        state.loading = true;
      })
      .addCase(userRegisteration.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(userRegisteration.rejected, (state, action) => {
        state.user = null;
        state.error = action.error;
        state.loading = false;
      });
  },
});

export default registerationSlice.reducer;
