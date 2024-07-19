import {
  getCurrentUserApi,
  getUserChannelProfileApi,
  getUserChannelProfileByIdApi,
} from "@/api/authApi";
import {
  Aside,
  ProfileHeaderWithNavigation,
  UploadVideoPopUp,
} from "@/components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

function ProfilesWrapper({ children }) {
  //   const location = useLocation();
  //   const channelData = location.state?.userData;
  const { userId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState(null);
  const [isItOwnersProfile, setIsItOwnersProfile] = useState(false);

  const fetchUserDetails = async () => {
    console.log("userDetails11");
    console.log(userId);
    if (userId) {
      const request = await getUserChannelProfileByIdApi(userId);
      console.log("userDetails");
      console.log("wsssss", request);
      const response = request.statusCode;
      console.log("wss", response);
      setUserData(response);
    }
  };

  useEffect(() => {
    if (userId) {
      setIsItOwnersProfile(user._id === userId);
      fetchUserDetails();
    } else {
      setIsItOwnersProfile(true);
      fetchUserDetails(user);
    }
  }, [userId]);

  return (
    <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
      <Aside />
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <ProfileHeaderWithNavigation
          userData={userData}
          isItOwnersProfile={isItOwnersProfile}
        >
          {children}
        </ProfileHeaderWithNavigation>
      </section>
    </div>
  );
}

export default ProfilesWrapper;
