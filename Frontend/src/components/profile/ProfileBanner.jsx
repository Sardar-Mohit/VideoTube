import {
  getSubscribersListApi,
  getSubscribedChannelsApi,
} from "@/api/subscriptionApi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileBanner = () => {
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [subscribedChannelsCount, setSubscribedChannelsCount] = useState(0);
  const userData = useSelector((state) => state.auth.user);
  const user = userData.statusCode.user;

  const fetchSubscribersList = async () => {
    try {
      const response = await getSubscribersListApi(user._id);
      if (
        response &&
        response.statusCode &&
        response.statusCode.subscribersList
      ) {
        setSubscribersCount(response.statusCode.subscribersList.length);
      }
    } catch (error) {
      console.error("Error fetching subscribers list:", error);
    }
  };

  const fetchSubscribedChannels = async () => {
    try {
      const response = await getSubscribedChannelsApi(user._id);
      if (
        response &&
        response.statusCode &&
        response.statusCode.subscribedChannelsList
      ) {
        setSubscribedChannelsCount(
          response.statusCode.subscribedChannelsList.length
        );
      }
    } catch (error) {
      console.error("Error fetching subscribed channels:", error);
    }
  };

  useEffect(() => {
    fetchSubscribersList();
    fetchSubscribedChannels();
  }, [user._id]);

  return (
    <div className="flex flex-wrap gap-4 pb-4 pt-6">
      <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
        <img
          src={
            user.avatar
              ? user.avatar
              : "https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="Channel-avatar"
          className="h-full w-full bg-center object-cover"
        />
      </span>
      <div className="mr-auto inline-block">
        <h1 className="font-bold text-xl">{user.username}</h1>
        <p className="text-sm text-gray-400">{user.email}</p>
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
