import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileNavbar = ({ userData }) => {
  const [isActive, setIsActive] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  console.log("userDatan");
  console.log(userData);

  const active =
    "w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]";
  const notActive =
    "w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400";

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/profile")) {
      setIsActive("profile");
    } else if (path.startsWith("/playlist")) {
      setIsActive("playlist");
    } else if (path.startsWith("/tweet")) {
      setIsActive("tweet");
    } else if (path.startsWith("/subscribed")) {
      setIsActive("subscribed");
    }
  }, [location.pathname]);

  return (
    <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
      <li
        className="w-full"
        onClick={() => navigate(`/profile/${userData._id}`)}
      >
        <button className={isActive == "profile" ? active : notActive}>
          Videos
        </button>
      </li>
      <li
        className="w-full"
        onClick={() => navigate(`/playlist/${userData._id}`)}
      >
        <button className={isActive == "playlist" ? active : notActive}>
          Playlist
        </button>
      </li>
      <li className="w-full" onClick={() => navigate(`/tweet/${userData._id}`)}>
        <button className={isActive == "tweet" ? active : notActive}>
          Tweets
        </button>
      </li>
      <li
        className="w-full"
        onClick={() =>
          navigate(`/subscribed/${userData._id}`)
        }
      >
        <button className={isActive == "subscribed" ? active : notActive}>
          Subscribed
        </button>
      </li>
    </ul>
  );
};

export default ProfileNavbar;
