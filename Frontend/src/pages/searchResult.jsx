import Time from "@/hooks/Time";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Aside,
  NoVideosAvailable,
  VideoListingForSearch,
} from "@/components/index";

const VideoListing = () => {
  const location = useLocation();
  const { result } = location.state;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (result) {
      setVideos(result?.statusCode);
      console.log("result");
      console.log(result);
    }
  }, [result]);

  if (videos.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <NoVideosAvailable
            title="No Search Results Found"
            description="No videos found matching your search. Try refining your keywords or filters. Explore other categories for more options!"
          />
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="flex justify-end items-center mx-4 mt-2 text-base">
            <button title="Search filters" className="text-white font-bold flex items-center justify-center gap-x-2 hover:bg-slate-500 focus:bg-slate-600 rounded-full px-2 py-1 ">
              Filters
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                viewBox="0 0 24 24"
                color="white"
                focusable="false"
                style={{
                  pointerEvents: "none",
                  display: "inherit",
                }}
                className="w-6 h-6"
              >
                <path
                  d="M15 17h6v1h-6v-1zm-4 0H3v1h8v2h1v-5h-1v2zm3-9h1V3h-1v2H3v1h11v2zm4-3v1h3V5h-3zM6 14h1V9H6v2H3v1h3v2zm4-2h11v-1H10v1z"
                  fill="white"
                ></path>
              </svg>
            </button>
          </div>
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
