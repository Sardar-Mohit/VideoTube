import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileNavbar = () => {
  const [isActive, setIsActive] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const active =
    "w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]";
  const notActive =
    "w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400";

  useEffect(() => {
    if (location.pathname == "/profile") {
      setIsActive("profile");
    } else if (location.pathname == "/playlist") {
      setIsActive("playlist");
    } else if (location.pathname == "/tweet") {
      setIsActive("tweet");
    } else if (location.pathname == "/subscribed") {
      setIsActive("subscribed");
    }
  }, [isActive]);

  return (
    <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
      <li className="w-full" onClick={() => navigate("/profile")}>
        <button className={isActive == "profile" ? active : notActive}>
          Videos
        </button>
      </li>
      <li className="w-full" onClick={() => navigate("/playlist")}>
        <button className={isActive == "playlist" ? active : notActive}>
          Playlist
        </button>
      </li>
      <li className="w-full" onClick={() => navigate("/tweet")}>
        <button className={isActive == "tweet" ? active : notActive}>
          Tweets
        </button>
      </li>
      <li className="w-full" onClick={() => navigate("/subscribed")}>
        <button className={isActive == "subscribed" ? active : notActive}>
          Subscribed
        </button>
      </li>
    </ul>
  );
};

export default ProfileNavbar;
