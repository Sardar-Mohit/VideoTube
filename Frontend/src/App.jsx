import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Footer, NavbarOne, NavbarTwo, UploadVideoPopUp } from "./components";
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
import UserProfile from "./pages/UserProfile";

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const hideHeaderAndFooter = location.pathname === "/" || location.pathname === "/register";

  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      {!hideHeaderAndFooter &&
        (isLoggedIn ? <NavbarOne user={user} /> : <NavbarTwo />)}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tweet" element={<Tweet />} />
        <Route path="/history" element={<WatchHistoryPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/liked-videos" element={<LikedVideosPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/subscribed" element={<Subscribed />} />
        <Route path="/individual-page" element={<IndividualPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/video-listing" element={<VideoListing />} />
        <Route path="/opened-playlist" element={<OpenedPlaylist />} />
        <Route path="/upload-video-popup" element={<UploadVideoPopUp />} />
        <Route path="/edit-personal-info" element={<EditPersonalInfoPage />} />
        <Route path="/edit-channel-info" element={<EditChannelInfoPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/terms-and-condition" element={<TermsAndCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      {!hideHeaderAndFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
