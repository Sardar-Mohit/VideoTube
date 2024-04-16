import { getPlaylistByIdApi } from "@/api/playlistApi";
import {
  Aside,
  PlaylistCard,
  VideoListingForSearch,
  UserProfileCard,
} from "@/components";
import useTimeHook from "@/hooks/useTimeHook";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const OpenedPlaylist = () => {
  const location = useLocation();
  const id = location.state;
  const [data, setData] = useState({
    playlistData: null,
    videosData: [],
    ownerData: null,
  });

  const getPlaylistData = async () => {
    const request = await getPlaylistByIdApi(id);
    const response = request.statusCode.getPlaylistData[0];

    setData({
      playlistData: response,
      videosData: response.videoDetails,
      ownerData: response.ownerData[0],
    });

    console.log("response");
    console.log(response);
  };

  useEffect(() => {
    getPlaylistData();
  }, []);

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
            <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
              {data.playlistData && data.videosData.length > 0 && (
                <PlaylistCard
                  key={data.playlistData._id}
                  playlistId={data.playlistData._id}
                  videosLength={data.videosData.length || 0}
                  thumbnail={data.videosData[0].thumbnail || ""}
                  playlistTotalViews={data.playlistData.totalViews || 0}
                  title={data.playlistData.name || ""}
                  description={data.playlistData.description || ""}
                  createdAgo={useTimeHook(data.playlistData.createdAt) || ""}
                  subscribersCount={data.playlistData?.subscribersCount || 0}
                />
              )}

              {data.playlistData && data.ownerData && (
                <UserProfileCard
                  username={data.ownerData.name}
                  avatar={data.ownerData.avatar}
                  subscribersCount={data.playlistData?.subscribersCount}
                />
              )}
            </div>
            <div className="flex w-full flex-col gap-y-4">
              {data.videosData?.length > 0 &&
                data.videosData.map((elem) => (
                  <VideoListingForSearch
                    key={elem._id}
                    playlistId={data.playlistData._id}
                    videoId={elem._id}
                    deleteButton={true}
                    views={elem.views}
                    time={useTimeHook(elem.createdAt)}
                    title={elem.title}
                    videoDuration={elem.duration}
                    description={elem.description}
                    altText={elem.title}
                    thumbnail={elem.thumbnail}
                    videoUrl={elem.videoFile}
                    ownerUsername={data.ownerData.name}
                    ownerImg={data.ownerData.avatar}
                  />
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OpenedPlaylist;
