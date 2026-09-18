import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TweetSkeletonCard from "../Skeleton/TweetSkeletonCard";

function ChannelCardInSubscribed({
  name,
  subscriberCount,
  imageSrc,
  alt,
  channelId,
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleProfileClick = () => {
    navigate(`/profile/${channelId}`);
  };

  return (
    <>
      {isLoading ? (
        <TweetSkeletonCard />
      ) : (
        <div
          onClick={handleProfileClick}
          className="my-3 flex w-full cursor-pointer justify-between"
        >
          <div className="flex items-center gap-x-2">
            <div className="h-14 w-14 shrink-0">
              <img
                src={imageSrc}
                alt={alt}
                className="h-full w-full rounded-full bg-center object-cover"
              />
            </div>

            <div className="block">
              <h6 className="font-semibold">{name}</h6>

              <p className="text-sm text-gray-300">
                {subscriberCount} Subscribers
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChannelCardInSubscribed;