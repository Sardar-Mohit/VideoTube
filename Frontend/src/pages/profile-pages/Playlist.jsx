import {
  Aside,
  PlaylistCard,
  ProfileHeaderWithNavigation,
} from "@/components/index";
import useTimeHook from "@/hooks/useTimeHook";
import { getUserPlaylistsAction } from "@/store/actions/playlistActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);
  let userData = useSelector((state) => state.auth.user);
  let user = userData?.statusCode?.user;
  let dispatch = useDispatch();

  const getPlaylist = async () => {
    try {
      const request = await dispatch(getUserPlaylistsAction(user._id));
      if (request.payload.message === 200) {
        const playlistData = request?.payload?.statusCode?.userPlaylists;

        const response = playlistData.filter(
          (playlistItems) => playlistItems.videos.length > 0
        );
        setPlaylist(response);

        response.length === 0 && setPlaylist(null);
        console.log("playlist", response);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <ProfileHeaderWithNavigation>
            <div className="grid gap-4 pt-2 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]">
              {playlist &&
                playlist.length > 0 &&
                playlist.map((playlistData) => {
                  return (
                    <>
                      <PlaylistCard
                        key={playlistData._id}
                        playlistId={playlistData._id}
                        thumbnail={playlistData.videoDetails[0].thumbnail || ""}
                        playlistTotalViews={playlistData.totalViews || 0}
                        videosLength={playlistData.videoDetails.length || 0}
                        createdAgo={useTimeHook(playlistData.createdAt) || ""}
                        title={playlistData.name || ""}
                        description={playlistData.description || ""}
                        subscribersCount={playlistData.subscribersCount || 0}
                      />
                    </>
                  );
                })}
              {playlist === null && (
                <div className="flex justify-center p-4 my-16">
                  <div className="w-full max-w-sm text-center">
                    <p className="mb-3 w-full">
                      <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                        <span className="inline-block w-6">
                          <svg
                            style={{ width: "100%" }}
                            viewBox="0 0 22 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 5L10.8845 2.76892C10.5634 2.1268 10.4029 1.80573 10.1634 1.57116C9.95158 1.36373 9.69632 1.20597 9.41607 1.10931C9.09916 1 8.74021 1 8.02229 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.0799 1 4.2V5M1 5H16.2C17.8802 5 18.7202 5 19.362 5.32698C19.9265 5.6146 20.3854 6.07354 20.673 6.63803C21 7.27976 21 8.11984 21 9.8V14.2C21 15.8802 21 16.7202 20.673 17.362C20.3854 17.9265 19.9265 18.3854 19.362 18.673C18.7202 19 17.8802 19 16.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V5Z"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </span>
                    </p>
                    <h5 className="mb-2 font-semibold">No playlist created</h5>
                    <p>There are no playlist created on this channel.</p>
                  </div>
                </div>
              )}
            </div>
          </ProfileHeaderWithNavigation>
        </section>
      </div>
    </>
  );
};

export default Playlist;
