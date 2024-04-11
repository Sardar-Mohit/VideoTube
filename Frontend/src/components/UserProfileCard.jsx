import React, { useEffect, useState } from "react";
import TweetSkeletonCard from "@/components/Skeleton/TweetSkeletonCard";

const UserProfileCard = ({ username, avatar, subscribersCount }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <TweetSkeletonCard />
      ) : (
        <div className="mt-6 flex items-center gap-x-3">
          <div className="h-16 w-16 shrink-0">
            <img
              alt={username}
              className="h-full w-full rounded-full object-cover bg-center"
              src={avatar}
            />
          </div>
          <div className="w-full">
            <h6 className="font-semibold">{username}</h6>
            <p className="text-sm text-gray-300">
              {subscribersCount} Subscribers
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileCard;
