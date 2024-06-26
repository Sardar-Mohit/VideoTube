import useFormatDateHook from "@/hooks/useFormatDateHook";
import { deleteVideo } from "@/api/videoApi";
import { UploadVideoPopUp } from "@/components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getChannelStats, getChannelVideos } from "@/api/dashboardApi";
import { useReactionsCountHook } from "@/hooks/useReactionsCountHook";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Dashboard = () => {
  const userData = useSelector((state) => state.auth.user);
  const user = userData.statusCode.user;
  const [uploadVideo, setUploadVideo] = useState(false);
  const [videos, setVideos] = useState(null);
  const [stats, setStats] = useState({
    subscriptionStats: 0,
    totalVideosCount: 0,
    totalLikes: 0,
    totalVideoViews: 0,
  });

  useEffect(() => {
    fetchVideo();
    channelStats();
  }, []);

  const handleUploadVideoToggle = () => {
    setUploadVideo(!uploadVideo);
  };

  const fetchVideo = async () => {
    const request = await getChannelVideos();
    const response = request.statusCode;
    setVideos(response);
  };

  const channelStats = async () => {
    const request = await getChannelStats();
    const response = request.stats;
    setStats({
      subscriptionStats: response.subscriptionStats,
      totalVideosCount: response.totalVideosCount,
      totalLikes: response.totalLikes,
      totalVideoViews: response.totalVideoViews,
    });
  };

  const deleteVideoFunc = async (videoId) => {
    try {
      const request = await deleteVideo(videoId);
      console.log(request);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-y-6 px-4 py-8">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="block">
              <h1 className="text-2xl font-bold">
                Welcome Back, {user.username}
              </h1>
              <p className="text-sm text-gray-300">
                Seamless Video Management, Elevated Results.
              </p>
            </div>
            <div className="block">
              <button
                onClick={handleUploadVideoToggle}
                className="inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black"
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
                </svg>
                Upload video
              </button>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
            <div className="border p-4">
              <div className="mb-4 block">
                <span className="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
              </div>
              <h6 className="text-gray-300">Total views</h6>
              <p className="text-3xl font-semibold">{stats.totalVideoViews}</p>
            </div>
            <div className="border p-4">
              <div className="mb-4 block">
                <span className="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </span>
              </div>
              <h6 className="text-gray-300">Total subscribers</h6>
              <p className="text-3xl font-semibold">
                {stats.subscriptionStats}
              </p>
            </div>
            <div className="border p-4">
              <div className="mb-4 block">
                <span className="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </span>
              </div>
              <h6 className="text-gray-300">Total likes</h6>
              <p className="text-3xl font-semibold">{stats.totalLikes}</p>
            </div>
          </div>
          <div className="w-full overflow-auto">
            {videos && videos.length > 0 && (
              <table className="w-full min-w-[1200px] border-collapse border text-white">
                <thead>
                  <tr>
                    <th className="border-collapse border-b p-4">Status</th>
                    <th className="border-collapse border-b p-4">Status</th>
                    <th className="border-collapse border-b p-4">Uploaded</th>
                    <th className="border-collapse border-b p-4">Rating</th>
                    <th className="border-collapse border-b p-4">
                      Date uploaded
                    </th>
                    <th className="border-collapse border-b p-4" />
                  </tr>
                </thead>
                <tbody>
                  {videos &&
                    videos.length > 0 &&
                    videos.map((video) => (
                      <tr className="group border" key={video._id}>
                        <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                          <div className="flex justify-center">
                            <label
                              htmlFor="vid-pub-1"
                              className="relative inline-block w-12 cursor-pointer overflow-hidden"
                            >
                              {video.isPublished ? (
                                <input
                                  type="checkbox"
                                  id="vid-pub-1"
                                  className="peer sr-only"
                                  defaultChecked={true}
                                />
                              ) : (
                                <input
                                  type="checkbox"
                                  id="vid-pub-1"
                                  className="peer sr-only"
                                  defaultChecked={false}
                                />
                              )}
                              <span className="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-[#ae7aff] peer-checked:after:left-7" />
                            </label>
                          </div>
                        </td>
                        <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                          <div className="flex justify-center">
                            {video.isPublished ? (
                              <span className="inline-block rounded-2xl border px-1.5 py-0.5 border-green-600 text-green-600">
                                Published
                              </span>
                            ) : (
                              <span className="inline-block rounded-2xl border px-1.5 py-0.5 border-orange-600 text-orange-600">
                                Unpublished
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                          <div className="flex items-center jus gap-4">
                            <img
                              className="h-10 w-10 rounded-full bg-center object-cover"
                              src={video.thumbnail}
                              alt={video.title}
                            />
                            <h3 className="font-semibold">{video.title}</h3>
                          </div>
                        </td>
                        <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                          <div className="flex justify-center gap-4">
                            <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
                              {useReactionsCountHook(video.videosReactions, "likedBy")}{" "}
                              likes
                            </span>
                            <span className="inline-block rounded-xl bg-red-200 px-1.5 py-0.5 text-red-700">
                              {useReactionsCountHook(
                                video.videosReactions,
                                "dislikedBy"
                              )}{" "}
                              dislikes
                            </span>
                          </div>
                        </td>
                        <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none relative left-[4.5%]">
                          {useFormatDateHook(video.createdAt)}
                        </td>
                        <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                          <div className="flex gap-4">
                            <AlertDialog className="new-york">
                              <AlertDialogTrigger>
                                <button className="h-5 w-5 hover:text-[#ae7aff]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure you want to delete
                                    the video?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete the video and remove the
                                    video from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      deleteVideoFunc(video._id);
                                    }}
                                    className="text-red-500 hover:text-red-600 hover:bg-[#e8686820] focus:text-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <button
                              className="h-5 w-5 hover:text-[#ae7aff]"
                              onClick={handleUploadVideoToggle}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}

            {videos && videos.length === 0 && (
              <div className=" w-full flex items-center justify-center p-4 my-8">
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
                    This page currently has no videos uploaded. Explore other
                    pages to find more videos.
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
                    Upload video
                  </button>
                </div>
              </div>
            )}

            {uploadVideo && (
              <UploadVideoPopUp close={handleUploadVideoToggle} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
