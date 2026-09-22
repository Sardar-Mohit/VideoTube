import api from "./axios";

export const toggleVideoLikeApi = async (videoId) => {
  try {
    const request = await api.post(
      `/likes/toggle/v/${videoId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const toggleVideoDislikeApi = async (videoId) => {
  try {
    const request = await api.post(
      `/likes/toggle/vd/${videoId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const toggleCommentLikeApi = async (commentId) => {
  try {
    const request = await api.post(
      `/likes/toggle/c/${commentId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const toggleTweetLikeApi = async (tweetId) => {
  try {
    const request = await api.post(
      `/likes/toggle/t/${tweetId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getLikedVideosApi = async () => {
  try {
    const request = await api.get(
      `/likes/videos`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};
