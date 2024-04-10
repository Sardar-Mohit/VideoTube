import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileVideoSkeletonCard from "../Skeleton/ProfileVideoSkeletonCard";

const VideoCard = ({ duration, title, views, time, thumbnail, id }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const redirectToIndividualPage = () => {
    navigate("/individual-page", { state: id });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <ProfileVideoSkeletonCard />
      ) : (
        <div
          className="w-full cursor-pointer"
          onClick={redirectToIndividualPage}
        >
          <div className="relative mb-2 w-full pt-[56%]">
            <div className="absolute inset-0">
              <img
                src={thumbnail}
                alt={title}
                className="h-full w-full bg-center object-contain"
              />
            </div>
            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
              {duration}
            </span>
          </div>
          <h6 className="mb-1 font-semibold">{title}</h6>
          <p className="flex text-sm text-gray-200">
            {views} Views · {time}
          </p>
        </div>
      )}
    </>
  );
};

export default VideoCard;
