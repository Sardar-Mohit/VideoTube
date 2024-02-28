import axios from "axios";
axios.defaults.withCredentials = true;

export const allVideos = async () => {
  try {
    const request = await axios.get("http://localhost:8000/api/v1/videos");
    return request.data;
  } catch (error) {
    throw error;
  }
};
export const videoToPlay = async (videoId) => {
  try {
    const request = await axios.get(
      `http://localhost:8000/api/v1/videos/${videoId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};
