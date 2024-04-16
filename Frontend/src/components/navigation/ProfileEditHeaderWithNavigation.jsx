import React from "react";
import { ProfileBanner, ProfileBannerPicture, ProfileEditNavbar } from "..";
import { useSelector } from "react-redux";

const ProfileEditHeaderWithNavigation = ({ children }) => {
  const userObj = useSelector((state) => state.auth.user);
  let user = userObj && userObj.statusCode && userObj.statusCode.user;

  return (
    <>
      {user && (
        <>
          <ProfileBannerPicture banner={user.coverImage} />
          <div className="px-4 pb-4">
            <ProfileBanner />
            <ProfileEditNavbar />
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default ProfileEditHeaderWithNavigation;
