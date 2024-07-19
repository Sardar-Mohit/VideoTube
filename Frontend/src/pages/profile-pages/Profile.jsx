import React, { useState, useEffect } from "react";
import { getUserVideos } from "@/api/videoApi";
import { VideoCard } from "@/components";
import useTimeHook from "@/hooks/useTimeHook";
import ProfilesWrapper from "./ProfilesWrapper";
import { useParams } from "react-router-dom";

const Profile = ({ userData, isItOwnersProfile }) => {
  const { userId } = useParams();
  const [videos, setVideos] = useState([]);

  const fetchVideo = async () => {
    if (userId) {
      const request = await getUserVideos(userId);
      const response = request.statusCode;
      setVideos(response.videos.reverse());
      if (response.videos.length === 0) {
        setVideos(null);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      fetchVideo();
    }
  }, [userId]);
  return (
    <ProfilesWrapper upload={true}>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-4 pt-2 lg:grid-cols-[repeat(3,_minmax(240px,_1fr))] xl:grid-cols-[repeat(4,_minmax(240px,_1fr))]">
        {videos &&
          videos.length > 0 &&
          videos.map((video) => (
            <VideoCard
              key={video._id}
              id={video._id}
              videoDuration={video.duration}
              title={video.title}
              views={video.views}
              time={useTimeHook(video.createdAt)}
              thumbnail={video.thumbnail}
            />
          ))}

        {videos && videos.length === 0 && (
          <div className="flex justify-center p-4 my-8">
            <div className="w-full max-w-sm text-center">
              <p className="mb-3 w-full">
                <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                  </svg>
                </span>
              </p>
              <h5 className="mb-2 font-semibold">No videos uploaded</h5>
              <p>
                This page has yet to upload a video. Search another page in
                order to find more videos.
              </p>
              {isItOwnersProfile && (
                <button
                  className="mt-4 inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black"
                  // onClick={handleUploadVideoToggle}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>{" "}
                  New video
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </ProfilesWrapper>
  );
};

export default Profile;
