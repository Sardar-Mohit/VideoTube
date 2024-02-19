import React from "react";

const CommentCard = ({ imgSrc, altText, name, timeAgo, username, comment }) => {
  return (
    <div>
      <div className="flex gap-x-4">
        <div className="mt-2 h-11 w-11 shrink-0">
          <img
            src={imgSrc}
            alt={altText}
            className="h-full w-full rounded-full cursor-pointer"
          />
        </div>
        <div className="block cursor-pointer">
          <p className="flex items-center text-gray-200 ">
            {name}&nbsp;·&nbsp;
            <span className="text-sm">{timeAgo}</span>
          </p>
          <p className="text-sm text-gray-200">@{username}</p>
          <p className="mt-3 text-sm cursor-text">{comment}</p>
        </div>
      </div>
      <hr className="my-4 border-white" />
    </div>
  );
};

export default CommentCard;
