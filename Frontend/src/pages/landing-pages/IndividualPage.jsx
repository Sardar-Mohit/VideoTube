import { videoToPlay } from "@/api/videoApi";
import {
  CommentCard,
  VideoAside,
  VideoPlaying,
  VideoSuggestion,
} from "@/components";
import Time from "@/hooks/Time";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const IndividualPage = () => {
  const [videos, setVideos] = useState([]);
  const location = useLocation();

  const fetchVideo = async () => {
    console.log(location.state);
    const { id } = location.state;
    console.log("ID:", id);
    const videoResponse = await videoToPlay(id);
    const videoArray = videoResponse.statusCode;
    console.log(videos);
    setVideos(videoArray);
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <VideoAside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
          <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
            <div className="col-span-12 w-full">
              <VideoPlaying
                id={videos._id}
                views={videos.views}
                title={videos.title}
                time={Time(videos.createdAt)}
                altText={videos.title}
                thumbnailImage={videos.thumbnail}
                authorName={"no username available"}
                subscribersCount="600k"
                videoURL={videos.videoFile}
                avatarUrl={
                  "https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-woman-reading-book-on-a-bench.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                description={videos.description}
                duration={videos.duration}
              />
              <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
                <h6 className="font-semibold">573 Comments...</h6>
              </button>
              <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
                <div className="block">
                  <h6 className="mb-4 font-semibold">573 Comments</h6>
                  <input
                    type="text"
                    className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                    placeholder="Add a Comment"
                  />
                </div>
                <hr className="my-4 border-white" />
                <CommentCard
                  imgSrc="https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-woman-reading-book-on-a-bench.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  altText="sarahjv"
                  name="Sarah Johnson"
                  timeAgo="17 hours ago"
                  username="sarahjv"
                  comment="This series is exactly what I've been looking for! Excited to dive into these advanced React patterns. Thanks for putting this together!"
                />

                <CommentCard
                  imgSrc="https://images.pexels.com/photos/18107025/pexels-photo-18107025/free-photo-of-man-reading-newspaper.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  altText="mikerod"
                  name="Michael Rodriguez"
                  timeAgo="5 minutes ago"
                  username="mikerod"
                  comment="Render props have always been a bit tricky for me. Can't wait to see how this series breaks it down. Thanks for sharing!"
                />
              </div>
            </div>

            <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
              <VideoSuggestion
                imageUrl="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                altText="JavaScript Fundamentals: Variables and Data Types"
                title="JavaScript Fundamentals: Variables and Data Types"
                author="Code Master"
                views="10.3k Views · 44 minutes ago"
                duration="20:45"
              />

              <VideoSuggestion
                imageUrl="https://images.pexels.com/photos/2519817/pexels-photo-2519817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                altText="Getting Started with Express.js"
                title="Getting Started with Express.js"
                author="Express Learner"
                views="11.5k Views · 5 hours ago"
                duration="22:18"
              />

              <VideoSuggestion
                imageUrl="https://images.pexels.com/photos/1144274/pexels-photo-1144274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                altText="Node.js Authentication with Passport.js"
                title="Node.js Authentication with Passport.js"
                author="Passport Pro"
                views="21.2k Views · 15 hours ago"
                duration="26:58"
              />

              <VideoSuggestion
                imageUrl="https://images.pexels.com/photos/1144231/pexels-photo-1144231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                altText="Data Visualization with Tableau"
                title="Data Visualization with Tableau"
                author="Tableau Master"
                views="24.5k Views · 18 hours ago"
                duration="32:14"
              />

              <VideoSuggestion
                imageUrl="https://images.pexels.com/photos/1144250/pexels-photo-1144250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                altText="Building Real-Time Applications with Socket.IO"
                title="Building Real-Time Applications with Socket.IO"
                author="Socket.IO Expert"
                views="25.6k Views · 19 hours ago"
                duration="27:37"
              />

              <VideoSuggestion
                imageUrl="https://images.pexels.com/photos/1115824/pexels-photo-1115824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                altText="Advanced CSS: Animations and Transitions"
                title="Advanced CSS: Animations and Transitions"
                author="CSS Animations"
                views="28.9k Views · 22 hours ago"
                duration="31:55"
              />

              <VideoSuggestion
                imageUrl="https://images.pexels.com/photos/1115808/pexels-photo-1115808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                altText="Advanced React Patterns"
                title="Advanced React Patterns"
                author="React Patterns"
                views="30.1k Views · 1 day ago"
                duration="30:25"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IndividualPage;
