import {
  getSubscribersListApi,
  getSubscribedChannelsApi,
} from "@/api/subscriptionApi";
import { updateAvatarAction } from "@/store/actions/authActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfileBanner = ({ user }) => {
  const dispatch = useDispatch();
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [subscribedChannelsCount, setSubscribedChannelsCount] = useState(0);
  const avatar = useSelector((state) => state.auth.user?.avatar);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    console.log("dil", file);
    if (file) {
      dispatch(updateAvatarAction(file));
    }
  };

  const fetchSubscribersList = async () => {
    try {
      const response = await getSubscribersListApi(user._id);
      if (response?.statusCode?.subscribersList) {
        setSubscribersCount(response.statusCode.subscribersList.length);
      }
    } catch (error) {
      console.error("Error fetching subscribers list:", error);
    }
  };

  const fetchSubscribedChannels = async () => {
    try {
      const response = await getSubscribedChannelsApi(user._id);
      if (response?.statusCode?.subscribedChannelsList) {
        setSubscribedChannelsCount(
          response.statusCode.subscribedChannelsList.length
        );
      }
    } catch (error) {
      console.error("Error fetching subscribed channels:", error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchSubscribersList();
      fetchSubscribedChannels();
    }
  }, [user?._id]);

  return (
    <div className="flex flex-wrap gap-4 pb-4 pt-6">
      <span
        onClick={() => document.getElementById("avatar").click()}
        className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 group cursor-pointer bg-black"
      >
        <img
          src={avatar ? avatar : user?.avatar}
          alt="Channel-avatar"
          className="h-full w-full bg-center object-cover group-hover:opacity-40"
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <label
            className="inline-block h-10 w-10 cursor-pointer rounded-lg p-1 text-[#ae7aff] bg-white"
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
      </span>

      <div className="mr-auto inline-block">
        <h1 className="font-bold text-xl">{user?.username}</h1>
        <p className="text-sm text-gray-400">{user?.email}</p>
        <p className="text-sm text-gray-400">
          {subscribersCount} Subscribers&nbsp;·&nbsp;
          {subscribedChannelsCount} Subscribed
        </p>
      </div>
      <div className="inline-block">
        <div className="inline-flex min-w-[145px] justify-end">
          <button className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
            <span className="inline-block w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
            </span>
            <span className="group-focus/btn:hidden">Subscribe</span>
            <span className="hidden group-focus/btn:block">Subscribed</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
