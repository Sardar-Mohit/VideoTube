import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserVideos } from "@/api/videoApi";
import {
  Aside,
  VideoCard,
  UploadVideoPopUp,
  UserProfileHeaderWithNavigation,
} from "@/components";
import useTimeHook from "@/hooks/useTimeHook";

const UserProfile = () => {
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const user = location.state?.userData; // Accessing the user data from the state
  const [uploadVideo, setUploadVideo] = useState(false);

  const handleUploadVideoToggle = () => {
    setUploadVideo(!uploadVideo);
  };

  const fetchVideo = async () => {
    console.log("Fetching videos for user:", user);
    const userId = user ? user._id : null;

    if (userId) {
      try {
        const request = await getUserVideos(userId);
        const response = request.statusCode;
        setVideos(response.videos);
        // Handle scenario where no videos are found
        if (response.videos.length === 0) {
          setVideos(null); // Set videos to null to trigger rendering of no videos message
        }
      } catch (error) {
        console.error("Error fetching user videos:", error);
      }
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <UserProfileHeaderWithNavigation user={user}>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
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

              {videos === null && (
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
                      This page has yet to upload a video. Search another page
                      in order to find more videos.
                    </p>
                    <button
                      className="mt-4 inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black"
                      onClick={handleUploadVideoToggle}
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
                  </div>
                </div>
              )}
            </div>
          </UserProfileHeaderWithNavigation>
        </section>
        {uploadVideo && <UploadVideoPopUp close={handleUploadVideoToggle} />}
      </div>
    </>
  );
};

export default UserProfile;
