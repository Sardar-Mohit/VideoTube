import React, { useEffect, useState } from "react";
import {
  Aside,
  NoVideosAvailable,
  VideoListingForSearch,
} from "@/components/index";
import { useLocation } from "react-router-dom";
import Time from "@/hooks/Time";

const VideoListing = () => {
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const { result } = location.state;

  useEffect(() => {
    if (result) {
      setVideos(result?.statusCode);
      console.log("result");
      console.log(result);
    }
  }, []);

  if (!videos) {
    return (
      <div className="w-full h-[90%] flex items-center justify-center">
        <ReloadIcon className="mr-2 h-40 w-40 animate-spin" />{" "}
      </div>
    );
  }
  if (videos.length === 0) {
    return (
      <NoVideosAvailable
        title="No Search Results Found"
        description="No videos found matching your search. Try refining your keywords or filters. Explore other categories for more options!"
      />
    );
  }

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="flex flex-col gap-4 p-4">
            {videos?.length > 0 &&
              videos.map((elem) => (
                <VideoListingForSearch
                  key={elem._id}
                  videoId={elem._id}
                  views={elem.views}
                  time={Time(elem.createdAt)}
                  title={elem.title}
                  duration={elem.duration}
                  description={elem.description}
                  altText={elem.title}
                  thumbnail={elem.thumbnail}
                  videoUrl={elem.videoFile}
                  ownerUsername={elem.owner.username}
                  ownerImg={elem.owner.avatar}
                />
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default VideoListing;
