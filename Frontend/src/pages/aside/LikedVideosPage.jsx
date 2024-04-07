import { getLikedVideosApi } from "@/api/likeApi";
import { NoVideosAvailable, Aside, VideoListingForSearch } from "@/components";
import Time from "@/hooks/Time";
import { useEffect, useState } from "react";

const LikedVideosPage = () => {
  const [likedVideos, setLikedVideos] = useState([]);

  const getLikedVideos = async () => {
    const request = await getLikedVideosApi();
    const response = request?.statusCode?.likedVideos;
    console.log("liked videos");
    console.log(response);
    response.length > 0 && setLikedVideos(response.reverse());
  };

  useEffect(() => {
    getLikedVideos();
  }, []);

  return (
    <>
      <div className="flex items-center min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="flex flex-col gap-4 p-4">
            {likedVideos.length > 0 ? (
              <div className="flex w-full flex-col gap-y-4">
                {likedVideos?.length > 0 &&
                  likedVideos.map((elem) => (
                    <VideoListingForSearch
                      key={elem.videoData._id}
                      videoId={elem.videoData._id}
                      views={elem.videoData.views}
                      time={Time(elem.videoData.createdAt)}
                      title={elem.videoData.title}
                      duration={elem.videoData.duration}
                      description={elem.videoData.description}
                      altText={elem.videoData.title}
                      thumbnail={elem.videoData.thumbnail}
                      videoUrl={elem.videoData.videoFile}
                      owner={elem.videoData.ownerData.name}
                      ownerImg={elem.videoData.ownerData.avatar}
                    />
                  ))}
              </div>
            ) : (
              <NoVideosAvailable
                title="No videos liked yet"
                description="There are no liked videos available. Watch some videos and like them!"
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default LikedVideosPage;
