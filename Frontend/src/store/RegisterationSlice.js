import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userRegisteration = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const request = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        userData
      );

      const response = request.data;
      localStorage.setItem("user", JSON.stringify(response));
      return response;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return rejectWithValue("User with this email or username already exists");
      } else if (error.response && error.response.status === 500) {
        return rejectWithValue(
          "Something went wrong while registering the user"
        );
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
        state.error = action.payload || "Unknown error occurred";
        state.loading = false;
      });
  },
});

export default registerationSlice.reducer;
