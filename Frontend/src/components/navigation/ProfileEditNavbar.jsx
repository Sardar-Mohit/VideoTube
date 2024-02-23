import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileEditNavbar = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("");
  const location = useLocation();

  // Function to handle navigation and set active page

  const activeButtonClass =
    "w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]";

  const inactiveButtonClass =
    "w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400";

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/edit-personal-info") {
      setActivePage("personal");
    } else if (currentPath === "/edit-channel-info") {
      setActivePage("channel");
    } else if (currentPath === "/change-password") {
      setActivePage("password");
    }
  }, [location.pathname]);

  return (
    <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
      <li className="w-full" onClick={() => navigate("/edit-personal-info")}>
        <button
          className={
            activePage === "personal" ? activeButtonClass : inactiveButtonClass
          }
        >
          Personal Information
        </button>
      </li>
      <li className="w-full" onClick={() => navigate("/edit-channel-info")}>
        <button
          className={
            activePage === "channel" ? activeButtonClass : inactiveButtonClass
          }
        >
          Channel Information
        </button>
      </li>
      <li className="w-full" onClick={() => navigate("/change-password")}>
        <button
          className={
            activePage === "password" ? activeButtonClass : inactiveButtonClass
          }
        >
          Change Password
        </button>
      </li>
    </ul>
  );
};

export default ProfileEditNavbar;
