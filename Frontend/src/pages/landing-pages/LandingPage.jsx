import "../../index.css";
import { Aside, LandingVideoPageCard } from "@/components/index";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { allVideos } from "@/api/videoApi";
import Time from "@/hooks/Time";

const LandingPage = () => {
  const [videos, setVideos] = useState([]);
  const fetchVideos = async () => {
    const request = await allVideos();
    const response = request.statusCode; // Accessing the 'statusCode' property
    const allVideosData = response.reverse();
    console.log(videos);
    setVideos(allVideosData);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (!videos) {
    return (
      <div className="w-full h-[90%] flex items-center justify-center">
        <ReloadIcon className="mr-2 h-40 w-40 animate-spin" />{" "}
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
            {videos?.map((video) => (
              <LandingVideoPageCard
                key={video._id}
                id={video._id}
                duration={video.duration}
                title={video.title}
                views={video.views}
                time={Time(video.createdAt)}
                thumbnail={video.thumbnail}
                authorName={video.owner.username}
                authorImg={video.owner.avatar}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
