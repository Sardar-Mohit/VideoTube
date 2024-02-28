import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch authentication state from Redux store
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  return (
    <Router>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        {isLoggedIn ? <NavbarOne user={user} /> : <NavbarTwo />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/landing-page" element={<LandingPage user={user} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/register" element={<Register user={user} />} />
          <Route
            path="/liked-videos"
            element={<LikedVideosPage user={user} />}
          />
          <Route path="/history" element={<WatchHistoryPage user={user} />} />
          <Route path="/subscribed" element={<Subscribed user={user} />} />
          <Route path="/tweet" element={<Tweet user={user} />} />
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy user={user} />}
          />
          <Route
            path="/terms-and-condition"
            element={<TermsAndCondition user={user} />}
          />
          <Route
            path="/individual-page"
            element={<IndividualPage user={user} />}
          />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/playlist" element={<Playlist user={user} />} />
          <Route path="/video-listing" element={<VideoListing user={user} />} />
          <Route
            path="/opened-playlist"
            element={<OpenedPlaylist user={user} />}
          />
          <Route path="/upload-popup" element={<UploadPopUp user={user} />} />
          <Route
            path="/edit-personal-info"
            element={<EditPersonalInfoPage user={user} />}
          />
          <Route
            path="/edit-channel-info"
            element={<EditChannelInfoPage user={user} />}
          />
          <Route
            path="/change-password"
            element={<ChangePasswordPage user={user} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
