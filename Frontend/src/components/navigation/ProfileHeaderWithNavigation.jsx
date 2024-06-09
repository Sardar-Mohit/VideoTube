import React from "react";
import { ProfileBanner, ProfileBannerPicture, ProfileNavbar } from "..";
import { useSelector } from "react-redux";

const ProfileHeaderWithNavigation = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const userData = user?.statusCode?.user;

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
