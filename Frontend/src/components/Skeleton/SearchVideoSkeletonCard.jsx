import React from "react";
import { Skeleton } from "../ui/skeleton";

const SearchVideoSkeletonCard = () => {
  return (
    <div className="w-full max-w-3xl gap-x-4 md:flex cursor-pointer">
      <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
        <div className="w-full pt-[56%]">
          <div className="absolute inset-0">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
          <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm"></span>
        </div>
      </div>
      <div className="flex gap-x-2 md:w-7/12">
        <div className="h-10 w-10 shrink-0 md:hidden">
          <Skeleton className="h-full w-full rounded-full" />
        </div>
        <div className="w-full gap-y-2 flex flex-col">
          <Skeleton className="h-6 w-4/6 rounded-xl" />
          <Skeleton className="h-6 w-3/6 rounded-xl" />
           <div className="h-10 w-10 shrink-0">
            <Skeleton className="h-full w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchVideoSkeletonCard;
