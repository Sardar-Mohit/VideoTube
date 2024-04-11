import { Skeleton } from "@/components/ui/skeleton";

const VideoSkeletonCard = () => {
  return (
    <div className="w-full flex flex-col space-y-3">
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <div className="space-y-2"></div>
        </div>
      </div>
      <div className="w-full cursor-pointer">
        <div className="relative mb-2 w-full pt-[56%]">
          <div className="absolute inset-0">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        </div>
        <div className="flex gap-x-2">
          <div className="h-10 w-10 shrink-0">
            <Skeleton className="h-full w-full rounded-full" />
          </div>
          <div className="w-full flex flex-col gap-y-1">
            <h6 className="mb-1 font-semibold">
              <Skeleton className="h-6 w-5/6 rounded-xl" />
            </h6>
            <div className="flex text-sm text-gray-200">
              <Skeleton className="h-6 w-3/6 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSkeletonCard;
