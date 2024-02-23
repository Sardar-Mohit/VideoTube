import React from "react";
import { useNavigate } from "react-router-dom";

function VideoListingForSearch({
  imgUrl,
  altText,
  title,
  views,
  time,
  author,
  authorImg,
  description,
}) {
  const navigate = useNavigate()
  return (
    <div
      className="w-full max-w-3xl gap-x-4 md:flex cursor-pointer"
      onClick={() => navigate("/individual-page")}
    >
      <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
        <div className="w-full pt-[56%]">
          <div className="absolute inset-0">
            <img src={imgUrl} alt={altText} className="h-full w-full" />
          </div>
          <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
            {time}
          </span>
        </div>
      </div>
      <div className="flex gap-x-2 md:w-7/12">
        <div className="h-10 w-10 shrink-0 md:hidden">
          <img
            src={authorImg}
            alt={author}
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="w-full">
          <h6 className="mb-1 font-semibold md:max-w-[75%]">{title}</h6>
          <p className="flex text-sm text-gray-200 sm:mt-3">
            {views} Views · {time} ago
          </p>
          <div className="flex items-center gap-x-4">
            <div className="mt-2 hidden h-10 w-10 shrink-0 md:block">
              <img
                src={authorImg}
                alt={author}
                className="h-full w-full rounded-full"
              />
            </div>
            <p className="text-sm text-gray-200">{author}</p>
          </div>
          <p className="mt-2 hidden text-sm md:block">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default VideoListingForSearch;
