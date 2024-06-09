import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUserApi,
  registerUserApi,
  changePasswordApi,
  getCurrentUserApi,
  logoutUserApi,
  updateAccountDetailsApi,
  updateUserCoverImageApi,
  updateUserAvatarApi,
} from "@/api/authApi";

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const userRegistrationAction = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);
      console.log("user registeration success" + response);
      setCookie("user", JSON.stringify(response), 7);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return rejectWithValue(
          "User with this email or username already exists"
        );
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

export const loginUserAction = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(userCredentials);
      setCookie("user", JSON.stringify(response.statusCode.accessToken), 7);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue(
          "User not found. Please check your credentials."
        );
      } else if (error.response && error.response.status === 401) {
        return rejectWithValue("Invalid email or password. Please try again.");
      } else {
        throw error;
      }
    }
  }
);

export const changePasswordAction = createAsyncThunk(
  "user/changePassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await changePasswordApi(userData);
      console.log(response);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue("Invalid old password");
      }
    }
  }
);

export const currentUserAction = createAsyncThunk(
  "user/currentUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await getCurrentUserApi(userData);
      console.log("response5555");
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue("User not found");
      }
    }
  }
);

export const logoutUserAction = createAsyncThunk(
  "user/logotUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await logoutUserApi(userData);
      const date = new Date();
      document.cookie = `accessToken=; expires=${date}; path=/;`;

      // Clear the refresh token cookie
      document.cookie = `refreshToken=; expires=${date}; path=/;`;
      console.log(response);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue("User not found");
      }
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("dd", userData);
      const response = await updateAccountDetailsApi(userData);
      console.log("upadtAccount", response);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue("User not found");
      }
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

      // Ensure response contains user data
      console.log("API response:", response);

      if (response.message === 200) {
        // Corrected comparison
        return response.statusCode.user; // This should be the updated user object
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAvatarAction = createAsyncThunk(
  "auth/updateAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await updateUserAvatarApi(formData);

      // Ensure response contains user data
      console.log("API response:", response);

      if (response.message === 200) {
        // Corrected comparison
        return response.statusCode.user; // This should be the updated user object
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
