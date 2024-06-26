import { getLikedVideosApi } from "@/api/likeApi";
import { NoVideosAvailable, Aside, VideoListingForSearch } from "@/components";
import { useEffect, useState } from "react";
import useTimeHook from "@/hooks/useTimeHook";

const LikedVideosPage = () => {
  const [likedVideos, setLikedVideos] = useState(null);

  const getLikedVideos = async () => {
    const request = await getLikedVideosApi();
    const response = request?.statusCode?.likedVideos;
    console.log("liked videos");
    console.log(response);
    if (response && response.length > 0) {
      setLikedVideos(response.reverse());
    } else {
      setLikedVideos([]);
    }
  };

  useEffect(() => {
    getLikedVideos();
  }, []);

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="flex flex-col gap-4 p-4">
            <div className="flex w-full flex-col gap-y-4">
              {likedVideos &&
                likedVideos.length > 0 &&
                likedVideos.map((elem) => (
                  <VideoListingForSearch
                    key={elem.videoData._id}
                    videoId={elem.videoData._id}
                    views={elem.videoData.views}
                    time={useTimeHook(elem.videoData.createdAt)}
                    title={elem.videoData.title}
                    videoDuration={elem.videoData.duration}
                    description={elem.videoData.description}
                    altText={elem.videoData.title}
                    thumbnail={elem.videoData.thumbnail}
                    videoUrl={elem.videoData.videoFile}
                    ownerUsername={elem.videoData.ownerData.username}
                    ownerImg={elem.videoData.ownerData.avatar}
                  />
                ))}

              {likedVideos && likedVideos.length === 0 && (
                <NoVideosAvailable
                  title="No videos liked yet"
                  description="There are no liked videos available. Watch some videos and like them!"
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LikedVideosPage;
