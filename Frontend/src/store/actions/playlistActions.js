import { getUserPlaylistsApi } from "@/api/playlistApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserPlaylistsAction = createAsyncThunk(
  "playlist/getUserPlaylist",
  async (userData) => {
    try {
      const request = await getUserPlaylistsApi(userData);
      console.log(request);
      return request;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
