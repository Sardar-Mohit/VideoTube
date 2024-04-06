import axios from "axios";
axios.defaults.withCredentials = true;

// Get comments of a specific video
export const getCommentsByVideoIdApi = async (videoId) => {
  try {
    const request = await axios.get(
      `http://localhost:8000/api/v1/comments/${videoId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

// Add a comment to a video
export const addCommentToVideoApi = async (videoId, commentData) => {
  try {
    const request = await axios.post(
      `http://localhost:8000/api/v1/comments/${videoId}`,
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
    const request = await axios.patch(
      `http://localhost:8000/api/v1/comments/c/${commentId}`,
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
    const request = await axios.delete(
      `http://localhost:8000/api/v1/comments/c/${commentId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};
