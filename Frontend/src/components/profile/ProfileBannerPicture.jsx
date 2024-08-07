import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCoverImageAction } from "@/store/actions/authActions";

const ProfileBannerPicture = ({ userData }) => {
  const dispatch = useDispatch();
  const coverImage = userData?.coverImage;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    if (file) {
      await dispatch(updateCoverImageAction(file));
    }
  };

  return (
    <div className="relative min-h-[150px] w-full pt-[16.28%]">
      <div className={`absolute inset-0 overflow-hidden ${coverImage ? '' : 'bg-slate-400'}`}>
        {coverImage ? (
          <img
            src={coverImage}
            alt="cover-photo"
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <input
          type="file"
          id="cover-image"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="cover-image"
          className="inline-block h-10 w-10 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default ProfileBannerPicture;
