import { getWatchHistoryApi } from "@/api/authApi";
import { NoVideosAvailable, Aside, VideoListingForSearch } from "@/components";
import useTimeHook from "@/hooks/useTimeHook";
import { useEffect, useState } from "react";

const WatchHistoryPage = () => {
  const [watchedVideos, setWatchedVideos] = useState(null);

  const getWatchedVideos = async () => {
    const request = await getWatchHistoryApi();
    const response = request?.statusCode;
    console.log("watched videos");
    console.log(response);
    if (response && response.length > 0) {
      setWatchedVideos(response.reverse());
    } else {
      setWatchedVideos([]);
    }
  };

  useEffect(() => {
    getWatchedVideos();
  }, []);
  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="flex flex-col gap-4 p-4">
            <div className="flex w-full flex-col gap-y-4">
            {watchedVideos &&
              watchedVideos.length > 0 &&
              watchedVideos.map((elem) => (
                <VideoListingForSearch
                  key={elem._id}
                  videoId={elem._id}
                  views={elem.views}
                  time={useTimeHook(elem.createdAt)}
                  title={elem.title}
                  videoDuration={elem.duration}
                  description={elem.description}
                  altText={elem.title}
                  thumbnail={elem.thumbnail}
                  videoUrl={elem.videoFile}
                  ownerUsername={elem.owner.username}
                  ownerImg={elem.owner.avatar}
                />
              ))}

            {watchedVideos && watchedVideos.length === 0 && (
              <NoVideosAvailable
                title="No videos watched yet"
                description="There are no watched videos available. Start watching some videos to populate your watch history!"
              />
            )}
          </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WatchHistoryPage;
