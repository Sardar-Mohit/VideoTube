import api from "./axios";

export const allVideos = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const request = await api.get(
      "/videos",
      {
        params: {
          page,
          limit,
        },
      }
    );

    return request.data;
  } catch (error) {
    throw error;
  }
};

export const allSearchVideos = async ({
  page,
  limit,
  query,
  sortBy,
  sortType,
  userId,
  duration,
  uploadDate,
}) => {
  try {
    const response = await api.get("/videos", {
      params: {
        page: page,
        limit: limit,
        query: query,
        sortBy: sortBy,
        sortType: sortType,
        userId: userId,
        duration: duration,
        uploadDate: uploadDate,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const videoToPlay = async (videoId) => {
  try {
    const request = await api.get(
      `/videos/${videoId}`
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
    const request = await api.get(
      `/videos/c/${userId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getUserWatchedVideos = async (userId) => {
  try {
    const request = await api.get(
      `/videos/w/${userId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const createVideo = async (videoData) => {
  try {
    const request = await api.post(
      `/videos`,
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
    const request = await api.patch(
      `/videos/${videoId}`,
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

export const deleteVideo = async (videoId) => {
  try {
    const request = await api.delete(
      `/videos/${videoId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const togglePublishStatus = async (videoId) => {
  try {
    const request = await api.patch(
      `/videos/toggle/publish/${videoId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};