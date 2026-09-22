import api from "./axios";

export const getPlaylistByIdApi = async (playlistId) => {
  try {
    const request = await api.get(
      `/playlist/${playlistId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getUserPlaylistsApi = async (userId) => {
  try {
    const request = await api.get(
      `/playlist/user/${userId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const createPlaylistApi = async (playlistData) => {
  try {
    const request = await api.post(
      `/playlist`,
      playlistData
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const addVideoToPlaylistApi = async (videoId, playlistId) => {
  try {
    const request = await api.patch(
      `/playlist/add/${videoId}/${playlistId}`,
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
    const request = await api.patch(
      `/playlist/${playlistId}`,
      playlistData
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const removeVideoFromPlaylistApi = async (videoId, playlistId) => {
  try {
    const request = await api.patch(
      `/playlist/remove/${videoId}/${playlistId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const deletePlaylistApi = async (playlistId) => {
  try {
    const request = await api.delete(
      `/playlist/${playlistId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};