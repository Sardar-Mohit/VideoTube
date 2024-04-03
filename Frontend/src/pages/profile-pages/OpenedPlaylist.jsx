import { getPlaylistByIdApi } from "@/api/playlistApi";
import { Aside, PlaylistCard, VideoListingForSearch } from "@/components";
import Time from "@/hooks/Time";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const OpenedPlaylist = () => {
  const location = useLocation();
  const id = location.state;
  const [playlistData, setPlaylistData] = useState([]);
  const [videosData, setVideosData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);

  const getPlaylistData = async () => {
    const request = await getPlaylistByIdApi(id);
    const response = request.statusCode.getPlaylistData[0];
    setPlaylistData(response);
    setVideosData(response.videoDetails);
    setOwnerData(response.ownerData[0]);
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
              {playlistData && videosData.length > 0 && (
                <PlaylistCard
                  key={playlistData._id}
                  playlistId={playlistData._id}
                  videosLength={videosData.length || 0}
                  thumbnail={videosData[0].thumbnail || ""}
                  playlistTotalViews={playlistData.totalViews || 0}
                  title={playlistData.name || ""}
                  description={playlistData.description || ""}
                  createdAgo={Time(playlistData.createdAt) || ""}
                  subscribersCount={playlistData?.subscribersCount || 0}
                />
              )}

              <div className="mt-6 flex items-center gap-x-3">
                <div className="h-16 w-16 shrink-0">
                  <img
                    alt={ownerData.name}
                    className="h-full w-full rounded-full"
                    src={ownerData.avatar}
                  />
                </div>
                <div className="w-full">
                  <h6 className="font-semibold">{ownerData.name}</h6>
                  <p className="text-sm text-gray-300">
                    {playlistData?.subscribersCount} Subscribers
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-y-4">
              {videosData?.length > 0 &&
                videosData.map((elem) => (
                  <VideoListingForSearch
                    key={elem._id}
                    playlistId={playlistData._id}
                    videoId={elem._id}
                    deleteButton={true}
                    views={elem.views}
                    time={Time(elem.createdAt)}
                    title={elem.title}
                    duration={elem.duration}
                    description={elem.description}
                    altText={elem.title}
                    thumbnail={elem.thumbnail}
                    videoUrl={elem.videoFile}
                    owner={ownerData.name}
                    ownerImg={ownerData.avatar}
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
