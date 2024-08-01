import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useTimeHook from "@/hooks/useTimeHook";
import { allSearchVideos } from "@/api/videoApi";
import {
  Aside,
  NoVideosAvailable,
  VideoListingForSearch,
  TableCellWithButton,
} from "@/components/index";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const VideoListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state;
  const { query } = location.state;
  const [videos, setVideos] = useState(null);
  const [selectedCells, setSelectedCells] = useState({
    uploadDate: null,
    type: null,
    duration: null,
    sortBy: null,
  });

  const handleSearch = async (params) => {
    const { page, limit, sortBy, sortType, duration, uploadDate } = params;

    console.log("params");
    console.log(params);

    const request = await allSearchVideos({
      page: page || 1,
      limit: limit || 10,
      query: query || "",
      sortBy: sortBy || "createdAt",
      sortType: "desc",
      duration: duration || "",
      uploadDate: uploadDate || "",
    });

    console.log("videos");
    console.log(request);
    if (request.message === 200) {
      navigate("/video-listing", {
        state: { result: request, query: query },
      });
    } else {
      console.error("Failed to fetch videos:", request.message);
    }
  };

  const handleCellClick = (column, value) => {
    setSelectedCells((prevSelectedCells) => {
      const updatedCells = {
        ...prevSelectedCells,
        [column]: value,
      };
      console.log(value);
      console.log(updatedCells);
      handleSearch(updatedCells);
      return updatedCells;
    });
  };

  const handleClear = (column, event) => {
    event.stopPropagation();
    setSelectedCells((prevSelectedCells) => {
      const updatedCells = {
        ...prevSelectedCells,
        [column]: "",
      };
      console.log(column);
      console.log(updatedCells);
      handleSearch(updatedCells);
      return updatedCells;
    });
  };

  useEffect(() => {
    if (result) {
      setVideos(result?.statusCode || []);
      console.log("result");
      console.log(result);
    }
  }, [result, setVideos]);

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside /> 

        <section className="flex flex-col w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <AlertDialog className="w-screen flex items-center justify-center rounded-l p-6 bg-white dark:bg-white-800">
            <AlertDialogTrigger className="self-end">
              <div className="flex justify-end items-center mx-4 mt-2 text-base">
                <button
                  title="Search filters"
                  className="text-white font-bold flex items-center justify-center gap-x-2 hover:bg-slate-600 focus:bg-slate-700 rounded-full px-4 py-1"
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
              style={{ borderRadius: "10px" }}
              className="mx-4 rounded-xl w-full max-w-md lg:max-w-4xl p-4 bg-black text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <AlertDialogTitle className="text-lg sm:text-xl">
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
              <table className="w-full text-sm text-white dark:text-white">
                <thead>
                  <tr className="text-left font-semibold">
                    <th className="px-1 py-2">UPLOAD DATE</th>
                    <th className="px-1 py-2">DURATION</th>
                    <th className="px-1 py-2">SORT BY</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <TableCellWithButton
                      value="Last hour"
                      selectedValue={selectedCells.uploadDate}
                      onClick={() => handleCellClick("uploadDate", "Last hour")}
                      onClear={(event) => handleClear("uploadDate", event)}
                    />
                    <TableCellWithButton
                      value="Under 4 minutes"
                      selectedValue={selectedCells.duration}
                      onClick={() =>
                        handleCellClick("duration", "Under 4 minutes")
                      }
                      onClear={(event) => handleClear("duration", event)}
                    />
                    <TableCellWithButton
                      value="Newest"
                      selectedValue={selectedCells.sortBy}
                      onClick={() => handleCellClick("sortBy", "Newest")}
                      onClear={(event) => handleClear("sortBy", event)}
                    />
                  </tr>
                  <tr className="">
                    <TableCellWithButton
                      value="Today"
                      selectedValue={selectedCells.uploadDate}
                      onClick={() => handleCellClick("uploadDate", "Today")}
                      onClear={(event) => handleClear("uploadDate", event)}
                    />
                    <TableCellWithButton
                      value="4–20 minutes"
                      selectedValue={selectedCells.duration}
                      onClick={() =>
                        handleCellClick("duration", "4–20 minutes")
                      }
                      onClear={(event) => handleClear("duration", event)}
                    />
                    <TableCellWithButton
                      value="Oldest"
                      selectedValue={selectedCells.sortBy}
                      onClick={() => handleCellClick("sortBy", "Oldest")}
                      onClear={(event) => handleClear("sortBy", event)}
                    />
                  </tr>
                  <tr className="">
                    <TableCellWithButton
                      value="This week"
                      selectedValue={selectedCells.uploadDate}
                      onClick={() => handleCellClick("uploadDate", "This week")}
                      onClear={(event) => handleClear("uploadDate", event)}
                    />
                    <TableCellWithButton
                      value="Over 20 minutes"
                      selectedValue={selectedCells.duration}
                      onClick={() =>
                        handleCellClick("duration", "Over 20 minutes")
                      }
                      onClear={(event) => handleClear("duration", event)}
                    />
                    <TableCellWithButton
                      value="View count"
                      selectedValue={selectedCells.sortBy}
                      onClick={() => handleCellClick("sortBy", "View count")}
                      onClear={(event) => handleClear("sortBy", event)}
                    />
                  </tr>
                  <tr className="">
                    <TableCellWithButton
                      value="This month"
                      selectedValue={selectedCells.uploadDate}
                      onClick={() =>
                        handleCellClick("uploadDate", "This month")
                      }
                      onClear={(event) => handleClear("uploadDate", event)}
                    />
                    <td className="px-1 py-2"></td>
                    <TableCellWithButton
                      value="Rating"
                      selectedValue={selectedCells.sortBy}
                      onClick={() => handleCellClick("sortBy", "Rating")}
                      onClear={(event) => handleClear("sortBy", event)}
                    />
                  </tr>
                  <tr>
                    <TableCellWithButton
                      value="This year"
                      selectedValue={selectedCells.uploadDate}
                      onClick={() => handleCellClick("uploadDate", "This year")}
                      onClear={(event) => handleClear("uploadDate", event)}
                    />
                    <td className="px-1 py-2"></td>
                    <td className="px-1 py-2"></td>
                    <td className="px-1 py-2"></td>
                  </tr>
                </tbody>
              </table>
            </AlertDialogContent>
          </AlertDialog>

          {videos?.length > 0 && (
            <div className="flex flex-col gap-4 p-4">
              {videos.map((elem) => (
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
                  ownerUsername={elem.ownerDetails.username}
                  ownerImg={elem.ownerDetails.avatar}
                />
              ))}
            </div>
          )}

          {videos?.length === 0 && (
            <NoVideosAvailable
              title="No Search Results Found"
              description="No videos found matching your search. Try refining your keywords or filters. Explore other categories for more options!"
            />
          )}
        </section>
      </div>
    </>
  );
};

export default VideoListing;
