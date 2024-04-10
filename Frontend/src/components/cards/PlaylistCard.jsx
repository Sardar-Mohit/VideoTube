import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePlaylistApi } from "@/api/playlistApi";
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
import { UpdatePlaylistCard } from "..";
import ProfileVideoSkeletonCard from "../Skeleton/ProfileVideoSkeletonCard";

const PlaylistCard = ({
  title,
  thumbnail,
  playlistId,
  createdAgo,
  description,
  videosLength,
  playlistTotalViews,
}) => {
  const navigate = useNavigate();
  const [updatePlaylist, setUpdatePlaylist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const deletePlaylistFunction = async (event) => {
    event.stopPropagation();
    console.log("id", playlistId);
    try {
      if (playlistId) {
        const request = await deletePlaylistApi(playlistId);
        if (request.message === 200) {
          console.log(request);
          navigate("/playlist");
        }
      }
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const handleUpdatePlaylistToggle = () => {
    setUpdatePlaylist(!updatePlaylist);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <ProfileVideoSkeletonCard />
      ) : (
        <div
          className="w-full cursor-pointer"
          onClick={() => navigate("/opened-playlist", { state: playlistId })}
        >
          <div className="relative mb-2 w-full pt-[56%]">
            <div className="absolute inset-0">
              <img
                src={thumbnail}
                alt={title}
                className="h-full w-full bg-center object-contain"
              />
              <div className="absolute inset-x-0 bottom-0">
                <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                  <div className="relative z-[1]">
                    <p className="flex justify-between">
                      <span className="inline-block">Playlist</span>
                      <span className="inline-block">
                        {videosLength}&nbsp;videos
                      </span>
                    </p>
                    <p className="text-sm text-gray-200">
                      {playlistTotalViews} Views&nbsp;·&nbsp;{createdAgo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h6 className="mb-1 font-semibold">{title}</h6>
              <p className="flex text-sm text-gray-200">{description}</p>
            </div>
            <div className="flex gap-x-2">
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
                      Are you absolutely sure you want to delete the Playlist?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the Playlist and remove the Playlist from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={deletePlaylistFunction}
                      className="text-red-500 hover:text-red-600 hover:bg-[#e8686820] focus:text-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <button
                className="h-5 w-5 hover:text-[#ae7aff]"
                onClick={handleUpdatePlaylistToggle}
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
              {updatePlaylist && (
                <UpdatePlaylistCard
                  name={title}
                  description={description}
                  close={handleUpdatePlaylistToggle}
                  playlistId={playlistId}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistCard;
