import Time from "@/hooks/Time";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Aside,
  NoVideosAvailable,
  VideoListingForSearch,
} from "@/components/index";
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
import { allSearchVideos } from "@/api/videoApi";

const VideoListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state;
  const { query } = location.state;
  const [videos, setVideos] = useState([]);
  const [selectedCells, setSelectedCells] = useState({
    uploadDate: null,
    type: null,
    duration: null,
    sortBy: null,
  });

  const handleSearch = async () => {

    const request = await allSearchVideos({
      page: 1, // Example page number
      limit: 10, // Example limit
      query: query, // Example search query
      sortBy: -1, // Example sorting parameter
    });

    console.log("videos");
    console.log(request);

    if (request.message === 200) {
      navigate("/video-listing", { state: { result: request, query: query } });
    }
  };

  const handleCellClick = (column, value) => {
    setSelectedCells((prevSelectedCells) => ({
      ...prevSelectedCells,
      [column]: value,
    }));
    console.log(value);
    console.log(selectedCells);
    handleSearch();
  };

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

        <section className="flex flex-col w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <AlertDialog className="rounded-xl p-6 bg-white dark:bg-gray-800">
            <AlertDialogTrigger className="self-end">
              <div className="flex justify-end items-center mx-4 mt-2 text-base">
                <button
                  title="Search filters"
                  className="text-white font-bold flex items-center justify-center gap-x-2 hover:bg-slate-500 focus:bg-slate-600 rounded-full px-2 py-1 "
                >
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
            </AlertDialogTrigger>
            <AlertDialogContent
              className="mx-4 rounded-xl w-full lg:max-w-4xl p-3 sm:p-4 bg-white dark:bg-gray-800"
              style={{
                borderRadius: "12px",
              }}
            >
              <div className="flex items-center justify-between">
                <AlertDialogTitle className=" text-base sm:text-xl">
                  Search filters
                </AlertDialogTitle>
                <AlertDialogCancel className="border-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 24 24"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    focusable="false"
                    className="pointer-events-none w-full h-full"
                  >
                    <path
                      fill="white"
                      d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"
                    ></path>
                  </svg>
                </AlertDialogCancel>
              </div>
              <table className="w-full text-[0.7rem] sm:text-sm  text-gray-900 dark:text-white">
                <thead>
                  <tr className="text-left font-semibold border-b-2 border-gray-300 dark:border-gray-700">
                    <th className="px-[0.125rem] py-4">UPLOAD DATE</th>
                    <th className="px-[0.125rem] py-4">TYPE</th>
                    <th className="px-[0.125rem] py-4">DURATION</th>
                    <th className="px-[0.125rem] py-4">SORT BY</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300 dark:border-gray-700">
                    <td
                      className={`cursor-pointer px-[0.125rem] py-4 ${
                        selectedCells.uploadDate === "Last hour" &&
                        "bg-gray-200"
                      }`}
                      onClick={() => handleCellClick("uploadDate", "Last hour")}
                    >
                      Last hour
                    </td>
                    <td
                      className={`cursor-pointer px-[0.125rem] py-4 ${
                        selectedCells.type === "Video" && "bg-gray-200"
                      }`}
                      onClick={() => handleCellClick("type", "Video")}
                    >
                      Video
                    </td>
                    <td
                      className={`cursor-pointer px-[0.125rem] py-4 ${
                        selectedCells.duration === "Under 4 minutes" &&
                        "bg-gray-200"
                      }`}
                      onClick={() =>
                        handleCellClick("duration", "Under 4 minutes")
                      }
                    >
                      Under 4 minutes
                    </td>
                    <td
                      className={`cursor-pointer px-[0.125rem] py-4 ${
                        selectedCells.sortBy === "Newest" && "bg-gray-200"
                      }`}
                      onClick={() => handleCellClick("sortBy", "Newest")}
                    >
                      Newest
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300 dark:border-gray-700">
                    <td
                      className={`cursor-pointer px-[0.125rem] py-4 ${
                        selectedCells.uploadDate === "Today" && "bg-gray-200"
                      }`}
                      onClick={() => handleCellClick("uploadDate", "Today")}
                    >
                      Today
                    </td>
                    <td
                      className={`cursor-pointer px-[0.125rem] py-4 ${
                        selectedCells.type === "Channel" && "bg-gray-200"
                      }`}
                      onClick={() => handleCellClick("type", "Channel")}
                    >
                      Channel
                    </td>
                    <td
                      className={`cursor-pointer px-[0.125rem] py-4 ${
                        selectedCells.duration === "4–20 minutes" &&
                        "bg-gray-200"
                      }`}
                      onClick={() =>
                        handleCellClick("duration", "4–20 minutes")
                      }
                    >
                      4–20 minutes
                    </td>
                    <td
                      className={`cursor-pointer px-[0.125rem] py-4 ${
                        selectedCells.sortBy === "Oldest" && "bg-gray-200"
                      }`}
                      onClick={() => handleCellClick("sortBy", "Oldest")}
                    >
                      Oldest
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300 dark:border-gray-700">
                    <td
                      className={`cursor-pointer px-[0.125rem] py-4 ${
                        selectedCells.uploadDate === "This week" &&
                        "bg-gray-200"
                      }`}
                      onClick={() => handleCellClick("uploadDate", "This week")}
                    >
                      This week
                    </td>
                    <td
                      className={`cursor-pointer px-[0.125rem] py-4 ${
                        selectedCells.type === "Playlist" && "bg-gray-200"
                      }`}
                      onClick={() => handleCellClick("type", "Playlist")}
                    >
                      Playlist
                    </td>
                    <td
                      className={`cursor-pointer px-[0.125rem] py-4 ${
                        selectedCells.duration === "Over 20 minutes" &&
                        "bg-gray-200"
                      }`}
                      onClick={() =>
                        handleCellClick("duration", "Over 20 minutes")
                      }
                    >
                      Over 20 minutes
                    </td>
                    <td
                      className={`cursor-pointer px-[0.125rem] py-4 ${
                        selectedCells.sortBy === "View count" && "bg-gray-200"
                      }`}
                      onClick={() => handleCellClick("sortBy", "View count")}
                    >
                      View count
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300 dark:border-gray-700">
                    <td
                      className={`cursor-pointer px-[0.125rem] py-4 ${
                        selectedCells.uploadDate === "This month" &&
                        "bg-gray-200"
                      }`}
                      onClick={() =>
                        handleCellClick("uploadDate", "This month")
                      }
                    >
                      This month
                    </td>
                    <td className=" px-[0.125rem] py-4"></td>
                    <td className=" px-[0.125rem] py-4"></td>
                    <td
                      className={`cursor-pointer px-[0.125rem] py-4 ${
                        selectedCells.sortBy === "Rating" && "bg-gray-200"
                      }`}
                      onClick={() => handleCellClick("sortBy", "Rating")}
                    >
                      Rating
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={`cursor-pointer  px-[0.125rem] py-4 ${
                        selectedCells.uploadDate === "This year" &&
                        "bg-gray-200"
                      }`}
                      onClick={() => handleCellClick("This year")}
                    >
                      This year
                    </td>
                    <td className=" px-[0.125rem] py-4"></td>
                    <td className=" px-[0.125rem] py-4"></td>
                    <td className=" px-[0.125rem] py-4"></td>
                  </tr>
                </tbody>
              </table>
            </AlertDialogContent>
          </AlertDialog>

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
