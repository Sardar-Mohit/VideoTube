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
    console.log("request.data");
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
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Function to logout a user
export const logoutUserApi = async () => {
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
export const refreshAccessTokenApi = async () => {
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
export const getCurrentUserApi = async () => {
  try {
    const request = await axios.get(
      "http://localhost:8000/api/v1/users/current-user",
      {},
      {
        withCredentials: true,
      }
    );
    console.log("getCurrentUserApi");
    console.log(request.data);

    
    return request.data;
  } catch (error) {
    if (error.request.status == 401) {
      return null;
    }
  }
};

// Function to update account details
export const updateAccountDetailsApi = async (userData) => {
  try {
    const request = await axios.patch(
      "http://localhost:8000/api/v1/users/update-account",
      userData
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Function to update user avatar
export const updateUserAvatarApi = async (avatarData) => {
  try {
    const request = await axios.patch(
      "http://localhost:8000/api/v1/users/avatar",
      avatarData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("avatar", request.data);
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Function to update user cover image
export const updateUserCoverImageApi = async (coverImageData) => {
  try {
    const request = await axios.patch(
      "http://localhost:8000/api/v1/users/cover-image",
      coverImageData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(request.data);
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Function to get user channel profile
export const getUserChannelProfileApi = async (username) => {
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
export const getWatchHistoryApi = async () => {
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
