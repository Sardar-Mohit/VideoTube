import { getUserPlaylists } from "@/api/playlistApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserPlaylistsAction = createAsyncThunk(
  "playlist/getUserPlaylist",
  async (userData, { rejectWithValue }) => {
    try {
      const request = await getUserPlaylists(userData);
      console.log(request);
      return request;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
