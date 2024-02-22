import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import { Footer, NavbarOne, NavbarTwo, UploadPopUp } from "./components";
import {
  Subscribed,
  Tweet,
  Dashboard,
  LandingPage,
  IndividualPage,
  Playlist,
  EditPersonalInfoPage,
  Login,
  Register,
  LikedVideosPage,
  WatchHistoryPage,
  Profile,
  OpenedPlaylist,
  EditChannelInfoPage,
  ChangePasswordPage,
  VideoListing,
  PrivacyPolicy,
  TermsAndCondition,
} from "./pages";

function App() {
  console.log("store:",store)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Provider store={store}>
      <Router>
        <div className="h-screen overflow-y-auto bg-[#121212] text-white">
          {isLoggedIn ? <NavbarOne /> : <NavbarTwo />}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/liked-videos" element={<LikedVideosPage />} />
            <Route path="/history" element={<WatchHistoryPage />} />
            <Route path="/subscribed" element={<Subscribed />} />
            <Route path="/tweet" element={<Tweet />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/terms-and-condition"
              element={<TermsAndCondition />}
            />
            <Route path="/individual-page" element={<IndividualPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/video-listing" element={<VideoListing />} />
            <Route path="/opened-playlist" element={<OpenedPlaylist />} />
            <Route path="/upload-popup" element={<UploadPopUp />} />
            <Route
              path="/edit-personal-info"
              element={<EditPersonalInfoPage />}
            />
            <Route
              path="/edit-channel-info"
              element={<EditChannelInfoPage />}
            />
            <Route path="/change-password" element={<ChangePasswordPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;