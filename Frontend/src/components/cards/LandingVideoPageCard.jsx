import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoSkeletonCard from "../Skeleton/VideoSkeletonCard";

const LandingVideoPageCard = ({
  id,
  duration,
  title,
  views,
  time,
  thumbnail,
  authorImg,
  authorName,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const redirectToIndividualPage = () => {
    navigate("/individual-page", { state: id });
  };

  return (
    <>
      {isLoading ? (
        <VideoSkeletonCard />
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
                className="h-full w-full object-contain bg-center"
              />
            </div>
            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
              {duration}
            </span>
          </div>
          <div className="flex gap-x-2">
            <div className="h-10 w-10 shrink-0">
              <img
                src={authorImg}
                alt={authorName}
                className="h-full w-full rounded-full object-cover bg-center"
              />
            </div>
            <div className="w-full">
              <h6 className="mb-1 font-semibold">{title}</h6>
              <p className="flex text-sm text-gray-200">
                {views} Views · {time}
              </p>
              <p className="text-sm text-gray-200">{authorName}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingVideoPageCard;
