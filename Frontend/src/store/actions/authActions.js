import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUserApi,
  loginUserApi,
  changePasswordApi,
  getCurrentUserApi,
  logoutUserApi,
  updateAccountDetailsApi,
  updateUserCoverImageApi,
  updateUserAvatarApi,
} from "@/api/authApi";

// Thunk actions
export const updateAvatarAction = createAsyncThunk(
  "auth/updateAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await updateUserAvatarApi(formData);
      if (response.message == 200) {
        console.log("action", response.statusCode.user);
        return response.statusCode.user; // Return updated user data
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCoverImageAction = createAsyncThunk(
  "auth/updateCoverImage",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("coverImage", file);
      const response = await updateUserCoverImageApi(formData);
      if (response.message === 200) {
        return response.statusCode.user; // Return updated user data
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Similar updates for other actions...
export const userRegistrationAction = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);
      const user = response.statusCode; // Adjust this based on the actual response structure
      return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUserAction = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      console.log("userCredentials");
      console.log(userCredentials);
      const response = await loginUserApi(userCredentials);
      console.log("log", response);
      return response.statusCode.user; // Return updated user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePasswordAction = createAsyncThunk(
  "user/changePassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await changePasswordApi(userData);
      return response.statusCode.user; // Return updated user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const currentUserAction = createAsyncThunk(
  "user/currentUser",
  async ({ rejectWithValue }) => {
    try {
      console.log("current")
      const response = await getCurrentUserApi();
      console.log("current2")
      console.log(response)
      return response.statusCode; // Return updated user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUserAction = createAsyncThunk(
  "user/logoutUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await logoutUserApi(userData);
      return response.statusCode.user; // Return updated user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateAccountDetailsApi(userData);
      return response.statusCode.user; // Return updated user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
