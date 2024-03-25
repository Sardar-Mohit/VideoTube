import axios from "axios";

export const getChannelStats = async () => {
  try {
    const request = await axios.get(
      `http://localhost:8000/api/v1/dashboard/stats`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};
export const getChannelVideos = async () => {
  try {
    const request = await axios.get(
      `http://localhost:8000/api/v1/dashboard/videos`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};
