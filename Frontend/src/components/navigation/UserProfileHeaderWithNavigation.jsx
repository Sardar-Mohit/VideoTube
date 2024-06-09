import React from "react";
import { ProfileBanner, ProfileBannerPicture, ProfileNavbar } from "..";

const UserProfileHeaderWithNavigation = ({ user, children }) => {
    let userData = user;
    console.log("User data:", userData);
    return (
        <>
            <ProfileBannerPicture banner={userData?.coverImage} />
            <div className="px-4 pb-4">
                <ProfileBanner userProp={userData} />
                <ProfileNavbar />
                {children}
            </div>
        </>
    );
};

export default UserProfileHeaderWithNavigation;
