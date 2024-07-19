import React from "react";
import { ProfileBanner, ProfileBannerPicture, ProfileNavbar } from "..";

const ProfileHeaderWithNavigation = ({
  userData,
  isItOwnersProfile,
  children,
}) => {
  return (
    <>
      <ProfileBannerPicture userData={userData} />
      <div className="px-4 pb-4">
        <ProfileBanner user={userData} isItOwnersProfile={isItOwnersProfile} />
        <ProfileNavbar userData={userData} />
        {children}
      </div>
    </>
  );
};

export default ProfileHeaderWithNavigation;
