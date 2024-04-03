import { getUserVideos } from "@/api/videoApi";
import {
  Aside,
  VideoCard,
  ProfileHeaderWithNavigation,
  UploadVideoPopUp,
} from "@/components";
import Time from "@/hooks/Time";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const [videos, setVideos] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [uploadVideo, setUploadVideo] = useState(false);

  const handleUploadVideoToggle = () => {
    setUploadVideo(!uploadVideo);
  };

  const fetchVideo = async () => {
    console.log("ssss")
    console.log(user)
    const userId = user.statusCode.user ? user.statusCode.user._id : null;
    if (userId) {
      const request = await getUserVideos(userId);
      const response = request.statusCode;
      setVideos(response.videos);
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
          <ProfileHeaderWithNavigation>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
              {videos && videos.length > 0 ? (
                videos.map((video) => (
                  <VideoCard
                    key={video._id}
                    id={video._id}
                    duration={video.duration}
                    title={video.title}
                    views={video.views}
                    time={Time(video.createdAt)}
                    thumbnail={video.thumbnail}
                  />
                ))
              ) : (
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
          </ProfileHeaderWithNavigation>
        </section>
        {uploadVideo && <UploadVideoPopUp close={handleUploadVideoToggle} />}
      </div>
    </>
  );
};

export default Profile;
