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
import PrivateRoute from "./utils/PrivateRoute";

function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const fetchCurrentUser = async () => {
    const h1 = await dispatch(currentUserAction());
    console.log("h1");
    console.log(h1);
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
        <Route path="/register" element={<Register />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/terms-and-condition" element={<TermsAndCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/video-listing" element={<VideoListing />} />
        <Route path="/individual-page" element={<IndividualPage />} />
        <Route
          path="/tweet/:userId"
          element={
            <PrivateRoute>
              <Tweet />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/playlist/:userId"
          element={
            <PrivateRoute>
              <Playlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/subscribed/:userId"
          element={
            <PrivateRoute>
              <Subscribed />
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/userProfile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <WatchHistoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/liked-videos"
          element={
            <PrivateRoute>
              <LikedVideosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/opened-playlist"
          element={
            <PrivateRoute>
              <OpenedPlaylist />
            </PrivateRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <PrivateRoute>
              <ChangePasswordPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload-video-popup"
          element={
            <PrivateRoute>
              <UploadVideoPopUp />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-channel-info"
          element={
            <PrivateRoute>
              <EditChannelInfoPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-personal-info"
          element={
            <PrivateRoute>
              <EditPersonalInfoPage />
            </PrivateRoute>
          }
        />
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
