import api from "./axios";

export const getChannelStats = async () => {
  try {
    const request = await api.get(
      `/dashboard/stats`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getChannelVideos = async () => {
  try {
    const request = await api.get(
      `/dashboard/videos`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};