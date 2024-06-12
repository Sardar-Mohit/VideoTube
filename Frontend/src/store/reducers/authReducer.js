import { createSlice } from "@reduxjs/toolkit";
import {
  userRegistrationAction,
  loginUserAction,
  changePasswordAction,
  currentUserAction,
  logoutUserAction,
  updateUserAction,
  updateCoverImageAction,
  updateAvatarAction,
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
        state.loading = true;
      })
      .addCase(userRegistrationAction.fulfilled, (state, action) => {
        console.log(1)
        console.log(state)
        console.log(action)
        console.log(action.payload)
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(userRegistrationAction.rejected, (state, action) => {
        state.error = "Error occurred during user registration";
        state.loading = false;
      })
      .addCase(loginUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        console.log("action", action.payload);
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload || "Error occurred while logging user in";
        state.loading = false;
      })
      .addCase(updateUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.error = action.payload || "Error occurred while updating user";
        state.loading = false;
      })
      .addCase(logoutUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUserAction.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUserAction.rejected, (state, action) => {
        state.error = action.payload || "Error occurred while logging out";
        state.loading = false;
      })
      .addCase(currentUserAction.pending, (state) => {
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
      .addCase(changePasswordAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePasswordAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(changePasswordAction.rejected, (state, action) => {
        state.user = initialState.user;
        state.error =
          action.payload || "Error occurred while changing password";
        state.loading = false;
      })
      .addCase(updateCoverImageAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCoverImageAction.fulfilled, (state, action) => {
        console.log("action", action.payload);
        if (state.user) {
          state.user = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateCoverImageAction.rejected, (state, action) => {
        state.error =
          action.payload || "Error occurred while updating cover image";
        state.loading = false;
      })
      .addCase(updateAvatarAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAvatarAction.fulfilled, (state, action) => {
        if (state.user) {
          state.user = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateAvatarAction.rejected, (state, action) => {
        state.error =
          action.payload || "Error occurred while updating avatar image";
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
