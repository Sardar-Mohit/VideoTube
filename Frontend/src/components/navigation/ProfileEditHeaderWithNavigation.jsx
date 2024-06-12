import React from "react";
import { ProfileBanner, ProfileBannerPicture, ProfileEditNavbar } from "..";
import { useSelector } from "react-redux";

const ProfileEditHeaderWithNavigation = ({ children }) => {
  const userData = useSelector((state) => state.auth.user);

  return (
    <>
      {userData && (
        <>
          <ProfileBannerPicture banner={userData?.coverImage} />
          <div className="px-4 pb-4">
            <ProfileBanner user={userData} />
            <ProfileEditNavbar />
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default ProfileEditHeaderWithNavigation;
