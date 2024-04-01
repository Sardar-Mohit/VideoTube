import { getUserPlaylistsAction } from "../actions/playlistActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  loading: null,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPlaylistsAction.pending, (state) => {
        state.user = null;
        state.error = null;
        state.loading = true;
      })
      .addCase(getUserPlaylistsAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getUserPlaylistsAction.rejected, (state, action) => {
        state.user = null;
        state.error =
          action.payload || "Error occured while fetching user playlist";
        state.loading = false;
      });
  },
});

export default playlistSlice.reducer;
