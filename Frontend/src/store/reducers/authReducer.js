import { createSlice } from "@reduxjs/toolkit";
import {
  userRegistrationAction,
  loginUserAction,
  changePasswordAction,
  currentUserAction,
  changeUserDetailsAction,
  logoutUserAction,
} from "../actions/authActions";

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
      .addCase(userRegistrationAction.pending, (state) => {
        state.user = null;
        state.error = null;
        state.loading = true;
      })
      .addCase(userRegistrationAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(userRegistrationAction.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload || "Error occured user registeration";
        state.loading = false;
      })
      .addCase(loginUserAction.pending, (state) => {
        state.user = null;
        state.error = null;
        state.loading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload || "Error occured while logging user";
        state.loading = false;
      })
      .addCase(logoutUserAction.pending, (state) => {
        state.user = null;
        state.error = null;
        state.loading = true;
      })
      .addCase(logoutUserAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(logoutUserAction.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload || "Error occured while logging out";
        state.loading = false;
      })
      .addCase(changePasswordAction.pending, (state) => {
        state.user = initialState.user;
        state.error = null;
        state.loading = true;
      })
      .addCase(changePasswordAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(changePasswordAction.rejected, (state, action) => {
        state.user = initialState.user;
        state.error = action.payload || "Error occured while changing password";
        state.loading = false;
      })
      .addCase(currentUserAction.pending, (state) => {
        state.user = initialState.user;
        state.error = null;
        state.loading = true;
      })
      .addCase(currentUserAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(currentUserAction.rejected, (state, action) => {
        state.user = initialState.user;
        state.error =
          action.payload || "Error occurred while fetching user details";
        state.loading = false;
      })
      .addCase(changeUserDetailsAction.pending, (state) => {
        state.user = initialState.user;
        state.error = null;
        state.loading = true;
      })
      .addCase(changeUserDetailsAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(changeUserDetailsAction.rejected, (state, action) => {
        state.user = initialState.user;
        state.error =
          action.payload || "Error occurred while updating user details";
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
