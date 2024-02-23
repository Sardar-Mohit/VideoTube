// redux/reducers/authReducer.js

import { createSlice } from "@reduxjs/toolkit";
import { userRegistration, loginUser } from "../actions/authActions";

const initialState = {
  user: null,
  error: null,
  loading: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegistration.pending, (state) => {
        state.user = null;
        state.error = null;
        state.loading = true;
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload || "Unknown error occurred";
        state.loading = false;
      })
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
      });
  },
});

export default authSlice.reducer;
