import React from "react";

const VideoCard = ({
  duration,
  title,
  views,
  whenVideoWasUploaded,
  thumbnail,
}) => {
  return (
    <div className="w-full">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          <img src={thumbnail} alt={title} className="h-full w-full" />
        </div>
        <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
          {duration}
        </span>
      </div>
      <h6 className="mb-1 font-semibold">{title}</h6>
      <p className="flex text-sm text-gray-200">
        {views} Views · {whenVideoWasUploaded}
      </p>
    </div>
  );
};

export default VideoCard;
