import React from "react";
import { useNavigate } from "react-router-dom";

const PlaylistCard = ({
  thumbnail,
  videosLenght,
  playlistTotalViews,
  createdAgo,
  title,
  description,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full cursor-pointer" onClick={() => navigate("/opened-playlist")}>
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          <img src={thumbnail} alt="React Mastery" className="h-full w-full" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
              <div className="relative z-[1]">
                <p className="flex justify-between">
                  <span className="inline-block">Playlist</span>
                  <span className="inline-block">
                    {videosLenght}&nbsp;videos
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
      <h6 className="mb-1 font-semibold">{title}</h6>
      <p className="flex text-sm text-gray-200">{description}</p>
    </div>
  );
};

export default PlaylistCard;
