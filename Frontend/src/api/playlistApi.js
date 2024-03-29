import axios from "axios";
axios.defaults.withCredentials = true;

export const createPlaylist = async (playlistData) => {
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

export const getPlaylistById = async (playlistId) => {
  try {
    const request = await axios.get(
      `http://localhost:8000/api/v1/playlist/${playlistId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const updatePlaylist = async (playlistId, playlistData) => {
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

export const deletePlaylist = async (playlistId) => {
  try {
    const request = await axios.delete(
      `http://localhost:8000/api/v1/playlist/${playlistId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const addVideoToPlaylist = async (videoId, playlistId) => {
  try {
    const request = await axios.patch(
      `http://localhost:8000/api/v1/playlist/add/${videoId}/${playlistId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const removeVideoFromPlaylist = async (videoId, playlistId) => {
  try {
    const request = await axios.patch(
      `http://localhost:8000/api/v1/playlist/remove/${videoId}/${playlistId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};



export const getUserPlaylists = async (userId) => {
  try {
    const request = await axios.get(
      `http://localhost:8000/api/v1/playlist/user/${userId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
}; 
