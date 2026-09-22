import api from "./axios";

// Get comments of a specific video
export const getCommentsByVideoIdApi = async (videoId) => {
  try {
    const request = await api.get(
      `/comments/${videoId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Add a comment to a video
export const addCommentToVideoApi = async (videoId, commentData) => {
  try {
    const request = await api.post(
      `/comments/${videoId}`,
      commentData
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Update a comment
export const updateCommentApi = async (commentId, commentData) => {
  try {
    const request = await api.patch(
      `/comments/c/${commentId}`,
      commentData
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Delete a comment
export const deleteCommentApi = async (commentId) => {
  try {
    const request = await api.delete(
      `/comments/c/${commentId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};
