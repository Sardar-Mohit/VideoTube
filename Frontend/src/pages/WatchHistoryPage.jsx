import { NoVideosAvailable, Aside } from "@/components";
import { useState } from "react";

const WatchHistoryPage = () => {
  const [islikedVideos, setIsLikedVideos] = useState(false);
  return (
    <>
      <div className="flex items-center min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="flex flex-col gap-4 p-4">
            {islikedVideos ? (
              <div></div>
            ) : (
              <NoVideosAvailable
                title="No videos watched yet"
                description="There are no watched videos available. Start watching some videos to populate your watch history!"
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default WatchHistoryPage;
