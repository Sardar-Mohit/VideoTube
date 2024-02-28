import React from "react";
import { ProfileBanner, ProfileBannerPicture, ProfileEditNavbar } from ".";
import { useSelector } from "react-redux";

const ProfileEditHeaderWithNavigation = ({ children }) => {
  const userObj = useSelector((state) => state.auth.user);
  let user = null;

  if (userObj && userObj.statusCode) {
    user = userObj.statusCode.user;
  }
  return (
    <>
      <ProfileBannerPicture banner={user.coverImage} />
      <div className="px-4 pb-4">
        <ProfileBanner user={user} />
        <ProfileEditNavbar />
        {children}
      </div>
    </>
  );
};

export default ProfileEditHeaderWithNavigation;
