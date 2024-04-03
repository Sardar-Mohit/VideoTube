import axios from "axios";
axios.defaults.withCredentials = true;

export const createTweetApi = async (tweetData) => {
  try {
    const request = await axios.post(
      `http://localhost:8000/api/v1/tweets`,
      tweetData
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getTweetsByUserIdApi = async (userId) => {
  try {
    const request = await axios.get(
      `http://localhost:8000/api/v1/tweets/user/${userId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const updateTweetApi = async (tweetId, tweetData) => {
  try {
    const request = await axios.patch(
      `http://localhost:8000/api/v1/tweets/${tweetId}`,
      tweetData
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTweetApi = async (tweetId) => {
  try {
    const request = await axios.delete(
      `http://localhost:8000/api/v1/tweets/${tweetId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};
