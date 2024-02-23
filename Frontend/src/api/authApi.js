import axios from "axios";

export const registerUserApi = async (userData) => {
  try {
    const request = await axios.post(
      "http://localhost:8000/api/v1/users/register",
      userData
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const loginUserApi = async (userCredentials) => {
    try {
      const request = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        userCredentials
      );
      return request.data;
    } catch (error) {
      throw error;
    }
  };