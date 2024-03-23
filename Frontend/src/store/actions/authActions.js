import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUserApi,
  registerUserApi,
  changePasswordApi,
  getCurrentUserApi,
  logoutUserApi,
  updateAccountDetailsApi,
} from "@/api/authApi";

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  // Add HttpOnly and SameSite attributes
  const cookieOptions = {
    expires: expires,
    path: "/",
    HttpOnly: true,
    SameSite: "strict",
  };
  document.cookie =
    name +
    "=" +
    value +
    ";" +
    Object.keys(cookieOptions)
      .map((key) => `${key}=${cookieOptions[key]}`)
      .join(";");
};

export const userRegistrationAction = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);

      console.log("user login success" + response);

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
      console.log("cookie");
      setCookie("user", JSON.stringify(response.statusCode.accessToken), 7);
      console.log(document.cookie);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue("User not found");
      } else if (error.response && error.response.status === 401) {
        return rejectWithValue("Invalid user credentials");
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

export const changeUserDetailsAction = createAsyncThunk(
  "user/changeUserDetails",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateAccountDetailsApi(userData);
      console.log(response);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return rejectWithValue("Invalid user credentials");
      }
    }
  }
);

export const currentUserAction = createAsyncThunk(
  "user/currentUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await getCurrentUserApi(userData);
      console.log("action " + response);
      return response;
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
      console.log("action" + response);
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue("User not found");
      }
    }
  }
);
