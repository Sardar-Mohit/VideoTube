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
      return rejectWithValue(
        error.response?.data || error.message
      );
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
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const userRegistrationAction = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);

      return response?.statusCode;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          error.message ||
          "Error occurred during user registration",
      });
    }
  }
);

export const loginUserAction = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(userData);

      return response?.statusCode?.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          error.message
      );
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
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const currentUserAction = createAsyncThunk(
  "user/currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUserApi();
      if (response === null) {
        return null;
      }

      console.log("currentUserAction");
      console.log(response?.statusCode?.user);

      return response?.statusCode?.user;
    } catch (error) {
      console.log("error");
      console.log(error);
      return rejectWithValue(null);
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
      return rejectWithValue(
        error.response?.data || error.message
      );
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
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);
