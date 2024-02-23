import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApi, registerUserApi } from "@/api/authApi";

export const userRegistration = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);
      localStorage.setItem("user", JSON.stringify(response));
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

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(userCredentials);
      localStorage.setItem("user", JSON.stringify(response));
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
