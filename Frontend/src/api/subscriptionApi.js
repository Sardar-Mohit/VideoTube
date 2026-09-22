import api from "./axios";

export const getSubscribedChannelsApi = async (channelId) => {
  try {
    const request = await api.get(
      `/subscriptions/c/${channelId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const toggleSubscriptionApi = async (channelId) => {
  try {
    const request = await api.post(
      `/subscriptions/c/${channelId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};

export const getSubscribersListApi = async (subscriberId) => {
  try {
    const request = await api.get(
      `/subscriptions/u/${subscriberId}`
    );
    return request.data;
  } catch (error) {
    throw error;
  }
};