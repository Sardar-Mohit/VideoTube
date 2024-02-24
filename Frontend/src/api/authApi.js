import axios from "axios";
axios.defaults.withCredentials = true;

// Function to register
export const registerUserApi = async (userData) => {
  try {
    const request = await axios.post(
      "http://localhost:8000/api/v1/users/register",
      userData,
      {
        withCredentials: true,
      }
    );
    console.log(request.data);
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Function to login a user
export const loginUserApi = async (userCredentials) => {
  try {
    const request = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      userCredentials,
      {
        withCredentials: true,
      }
    );
    console.log(request.data);
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Function to change password
export const changePasswordApi = async (userData) => {
  try {
    const request = await axios.post(
      "http://localhost:8000/api/v1/users/change-password",
      userData,
      {
        withCredentials: true,
      }
    );
    console.log("api");

    console.log(request);
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Function to logout a user
export const logoutUserAction = async () => {
  try {
    const request = await axios.post(
      "http://localhost:8000/api/v1/users/logout"
    );
    console.log(request.data);
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Function to refresh access token
export const refreshAccessTokenAction = async () => {
  try {
    const request = await axios.post(
      "http://localhost:8000/api/v1/users/refresh-token"
    );
    console.log(request.data);
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Function to get current user
export const getCurrentUserAction = async () => {
  try {
    const request = await axios.get(
      "http://localhost:8000/api/v1/users/current-user"
    );
    console.log(request.data);
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Function to update account details
export const updateAccountDetailsAction = async (userData) => {
  try {
    const request = await axios.patch(
      "http://localhost:8000/api/v1/users/update-account",
      userData
    );
    console.log(request.data);
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Function to update user avatar
export const updateUserAvatarAction = async (avatarData) => {
  try {
    const request = await axios.patch(
      "http://localhost:8000/api/v1/users/avatar",
      avatarData
    );
    console.log(request.data);
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Function to update user cover image
export const updateUserCoverImageAction = async (coverImageData) => {
  try {
    const request = await axios.patch(
      "http://localhost:8000/api/v1/users/cover-image",
      coverImageData
    );
    console.log(request.data);
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Function to get user channel profile
export const getUserChannelProfileAction = async (username) => {
  try {
    const request = await axios.get(
      `http://localhost:8000/api/v1/users/c/${username}`
    );
    console.log(request.data);
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Function to get user watch history
export const getWatchHistoryAction = async () => {
  try {
    const request = await axios.get(
      "http://localhost:8000/api/v1/users/history"
    );
    console.log(request.data);
    return request.data;
  } catch (error) {
    throw error;
  }
};
