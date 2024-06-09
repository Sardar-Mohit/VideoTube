import React from "react";
import { ProfileBanner, ProfileBannerPicture, ProfileEditNavbar } from "..";
import { useSelector } from "react-redux";

const ProfileEditHeaderWithNavigation = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const userData = user?.statusCode?.user;
  console.log("user")
  console.log(user)
  return (
    <>
      {user && (
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
