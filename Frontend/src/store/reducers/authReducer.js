import { createSlice } from "@reduxjs/toolkit";
import {
  userRegistrationAction,
  loginUserAction,
  changePasswordAction,
} from "../actions/authActions";

const initialState = {
  user: localStorage.getItem("user") || null,
  error: null,
  loading: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.error = "Unauthorized: Please login again.";
      state.loading = false;
      localStorage.removeItem("user");
    },
  },
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
        state.error = action.payload || "Unknown error occurred";
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
        state.error = action.payload || "Unknown error occurred";
        state.loading = false;
      })
      .addCase(changePasswordAction.pending, (state) => {
        state.user = localStorage.getItem("user");
        state.error = null;
        state.loading = true;
        console.log("reducer");
      })
      .addCase(changePasswordAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
        console.log(action.payload);
        console.log("ss");
      })
      .addCase(changePasswordAction.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload || "Unknown error occurred";
        state.loading = false;
        if (action.payload === "Unauthorized") {
          state.error = "Unauthorized: Please login again.";
          localStorage.removeItem("user");
        }
      });
  },
});

export default authSlice.reducer;
