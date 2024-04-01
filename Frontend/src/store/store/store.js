import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer.js";
import playlistReducer from "../reducers/playlistReducer.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    playist: playlistReducer,
  },
});

export default store;
