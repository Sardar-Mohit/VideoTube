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

export const allSearchVideos = async (query) => {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/videos", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const videoToPlay = async (videoId) => {
  try {
    const request = await axios.get(
      `http://localhost:8000/api/v1/videos/${videoId}`
    );
    console.log("request");
    console.log(request);
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getUserVideos = async (userId) => {
  try {
    const request = await axios.get(
      `http://localhost:8000/api/v1/videos/c/${userId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const createVideo = async (videoData) => {
  try {
    const request = await axios.post(
      `http://localhost:8000/api/v1/videos`,
      videoData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const updateVideo = async (videoId, videoData) => {
  try {
    const request = await axios.patch(
      `http://localhost:8000/api/v1/videos/${videoId}`,
      videoData
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const deleteVideo = async (videoId) => {
  try {
    const request = await axios.delete(
      `http://localhost:8000/api/v1/videos/${videoId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const togglePublishStatus = async (videoId) => {
  try {
    const request = await axios.patch(
      `http://localhost:8000/api/v1/videos/toggle/publish/${videoId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};
