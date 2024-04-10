import { removeVideoFromPlaylistApi } from "@/api/playlistApi";
import React from "react";
import { useNavigate } from "react-router-dom";
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

function VideoListingForSearch({
  time,
  title,
  views,
  ownerUsername,
  altText,
  videoId,
  ownerImg,
  duration,
  thumbnail,
  playlistId,
  description,
  deleteButton = false,
}) {
  const navigate = useNavigate();

  const removeVideoFromPlaylist = async (event) => {
    event.stopPropagation();

    const request = await removeVideoFromPlaylistApi(videoId, playlistId);
    console.log(request);

    if (request?.statusCode?.playlist?.videos.length <= 0) {
      navigate("/playlist");
    }

  };

  return (
    <div
      className="w-full max-w-3xl gap-x-4 md:flex cursor-pointer"
      onClick={() => navigate("/individual-page", { state: videoId })}
    >
      <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
        <div className="w-full pt-[56%]">
          <div className="absolute inset-0">
            <img src={thumbnail} alt={altText} className="h-full w-full bg-center object-contain" />
          </div>
          <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
            {duration}
          </span>
        </div>
      </div>
      <div className="flex gap-x-2 md:w-7/12">
        <div className="h-10 w-10 shrink-0 md:hidden">
          <img
            src={ownerImg}
            alt={ownerUsername}
            className="h-full w-full object-cover bg-center rounded-full"
          />
        </div>
        <div className="w-full">
          <h6 className="mt-2 font-semibold md:max-w-[75%]">{title}</h6>
          <p className="flex text-sm text-gray-200 sm:mt-1">
            {views} Views · {time}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="mt-2 hidden h-10 w-10 shrink-0 md:block">
              <img
                src={ownerImg}
                alt={ownerUsername}
                className="h-full w-full rounded-full object-cover bg-center"
              />
            </div>
            <p className="text-sm text-gray-200">{ownerUsername}</p>
          </div>
          <p className="mt-2 hidden text-sm md:block">{description}</p>
        </div>
      </div>
      {deleteButton && (
        <div
          className="mt-2 mr-2 font-semibold md:max-w-[75%]"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
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
                  Are you absolutely sure you want to remove the video from this
                  Playlist?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove
                  this video from this Playlist.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(event) => {
                    event.stopPropagation();
                    removeVideoFromPlaylist(event);
                  }}
                  className="text-red-500 hover:text-red-600 hover:bg-[#e8686820] focus:text-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}

export default VideoListingForSearch;
