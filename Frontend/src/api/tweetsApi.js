import api from "./axios";

export const createTweetApi = async (tweetData) => {
  try {
    const request = await api.post(
      `/tweets`,
      tweetData
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getTweetsByUserIdApi = async (userId) => {
  try {
    const request = await api.get(
      `/tweets/user/${userId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const updateTweetApi = async (tweetId, tweetData) => {
  try {
    const request = await api.patch(
      `/tweets/${tweetId}`,
      tweetData
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTweetApi = async (tweetId) => {
  try {
    const request = await api.delete(
      `/tweets/${tweetId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};