import axios from "axios";
axios.defaults.withCredentials = true;

export const toggleVideoLikeApi = async (videoId) => {
  try {
    const request = await axios.post(
      `http://localhost:8000/api/v1/likes/toggle/v/${videoId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const toggleVideoDislikeApi = async (videoId) => {
  try {
    const request = await axios.post(
      `http://localhost:8000/api/v1/likes/toggle/vd/${videoId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const toggleCommentLikeApi = async (commentId) => {
  try {
    const request = await axios.post(
      `http://localhost:8000/api/v1/likes/toggle/c/${commentId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const toggleTweetLikeApi = async (tweetId) => {
  try {
    const request = await axios.post(
      `http://localhost:8000/api/v1/likes/toggle/t/${tweetId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getLikedVideosApi = async () => {
  try {
    const request = await axios.get(
      `http://localhost:8000/api/v1/likes/videos`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};
