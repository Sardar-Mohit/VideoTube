import React from "react";
import {
  ProfileBanner,
  ProfileBannerPicture,
  ProfileNavbar,
} from "..";

const UserProfileHeaderWithNavigation = ({
  user,
  children,
  isItOwnersProfile,
}) => {
  const userData = user;

  console.log("User data:", userData);

  return (
    <>
      <ProfileBannerPicture banner={userData?.coverImage} />

      <div className="px-4 pb-4">
        <ProfileBanner
          user={userData}
          isItOwnersProfile={isItOwnersProfile}
        />

        <ProfileNavbar userData={userData} />

        {children}
      </div>
    </>
  );
};

export default UserProfileHeaderWithNavigation;