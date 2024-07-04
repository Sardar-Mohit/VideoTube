import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { currentUserAction } from "./store/actions/authActions";
import { getCurrentUserApi } from "./api/authApi";

function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const fetchCurrentUser = async () => {
    const h1 = await dispatch(currentUserAction());
    // const h = await getCurrentUserApi();
    // const h2 = await currentUserAction();
    console.log("h2")
    // console.log(h)
    console.log(h1)
    // console.log(h2)
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const hideHeaderAndFooter =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      {!hideHeaderAndFooter &&
        (user ? <NavbarOne user={user} /> : <NavbarTwo />)}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tweet" element={<Tweet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subscribed" element={<Subscribed />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/history" element={<WatchHistoryPage />} />
        <Route path="/video-listing" element={<VideoListing />} />
        <Route path="/liked-videos" element={<LikedVideosPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/individual-page" element={<IndividualPage />} />
        <Route path="/opened-playlist" element={<OpenedPlaylist />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/upload-video-popup" element={<UploadVideoPopUp />} />
        <Route path="/edit-channel-info" element={<EditChannelInfoPage />} />
        <Route path="/terms-and-condition" element={<TermsAndCondition />} />
        <Route path="/edit-personal-info" element={<EditPersonalInfoPage />} />
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
