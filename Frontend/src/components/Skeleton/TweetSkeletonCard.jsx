import React from "react";
import { Skeleton } from "../ui/skeleton";

const TweetSkeletonCard = () => {
  return (
    <div className="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent my-auto">
      <div className="h-14 w-14 shrink-0">
        <Skeleton className="h-full w-full rounded-full " />
      </div>
      <div className="flex flex-col gap-y-1 w-5/6 ">
        <Skeleton className="h-6 w-4/6 rounded-xl" />
        <Skeleton className="h-6 w-3/6 rounded-xl" />
      </div>
    </div>
  )
};

export default TweetSkeletonCard;
