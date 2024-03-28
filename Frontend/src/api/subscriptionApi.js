import axios from "axios";
axios.defaults.withCredentials = true;

export const getSubscribedChannelsApi = async (channelId) => {
    try {
      const request = await axios.get(
        `http://localhost:8000/api/v1/subscriptions/c/${channelId}`
      );
      return request.data;
    } catch (error) {
      throw error;
    }
  };



