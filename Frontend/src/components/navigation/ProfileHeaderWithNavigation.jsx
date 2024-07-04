import React from "react";
import { ProfileBanner, ProfileBannerPicture, ProfileNavbar } from "..";

const ProfileHeaderWithNavigation = ({
  userData,
  isItOwnersProfile,
  children,
}) => {
  return (
    <>
      <ProfileBannerPicture banner={userData} />
      <div className="px-4 pb-4">
        <ProfileBanner isItOwnersProfile={isItOwnersProfile} user={userData} />
        <ProfileNavbar />
        {children}
      </div>
    </>
  );
};

export default ProfileHeaderWithNavigation;
