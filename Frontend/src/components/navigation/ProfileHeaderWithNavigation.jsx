import React from "react";
import { useSelector } from "react-redux";
import { ProfileBanner, ProfileBannerPicture, ProfileNavbar } from "..";

const ProfileHeaderWithNavigation = ({ children }) => {
  const userData = useSelector((state) => state.auth.user);

  return (
    <>
      <ProfileBannerPicture banner={userData?.coverImage} />
      <div className="px-4 pb-4">
        <ProfileBanner user={userData} />
        <ProfileNavbar />
        {children}
      </div>
    </>
  );
};

export default ProfileHeaderWithNavigation;
