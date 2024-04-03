import axios from "axios";
axios.defaults.withCredentials = true;

export const getPlaylistByIdApi = async (playlistId) => {
  try {
    const request = await axios.get(
      `http://localhost:8000/api/v1/playlist/${playlistId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getUserPlaylistsApi = async (userId) => {
  try {
    const request = await axios.get(
      `http://localhost:8000/api/v1/playlist/user/${userId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const createPlaylistApi = async (playlistData) => {
  try {
    const request = await axios.post(
      `http://localhost:8000/api/v1/playlist`,
      playlistData
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const addVideoToPlaylistApi = async (videoId, playlistId) => {
  try {
    const request = await axios.patch(
      `http://localhost:8000/api/v1/playlist/add/${videoId}/${playlistId}`,
      {},
      { withCredentials: true }
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const updatePlaylistApi = async (playlistId, playlistData) => {
  try {
    const request = await axios.patch(
      `http://localhost:8000/api/v1/playlist/${playlistId}`,
      playlistData
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const removeVideoFromPlaylistApi = async (videoId, playlistId) => {
  try {
    const request = await axios.patch(
      `http://localhost:8000/api/v1/playlist/remove/${videoId}/${playlistId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const deletePlaylistApi = async (playlistId) => {
  try {
    const request = await axios.delete(
      `http://localhost:8000/api/v1/playlist/${playlistId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};
