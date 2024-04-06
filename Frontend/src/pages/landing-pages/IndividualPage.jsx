import { videoToPlay } from "@/api/videoApi";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ReactionsCount } from "@/hooks/ReactionsCount";
import Time from "@/hooks/Time";
import {
  addCommentToVideoApi,
  getCommentsByVideoIdApi,
} from "@/api/commentsApi";
import {
  CommentCard,
  VideoAside,
  VideoPlaying,
  VideoSuggestion,
} from "@/components";

const IndividualPage = () => {
  const [video, setVideo] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState([]);
  const location = useLocation();

  const fetchVideo = async () => {
    const id = location.state;
    const videoResponse = await videoToPlay(id);
    const videoArray = videoResponse.statusCode.user[0];
    setVideo(videoArray);
    console.log("videos comment");
    console.log(id);
    console.log(videoArray);
  };

  const fetchVideoComments = async () => {
    const id = location.state;
    const videoResponse = await getCommentsByVideoIdApi(id);
    const videoArray = videoResponse.statusCode.comments;
    setComments(videoArray);
    console.log("comments");
    console.log(videoArray);
  };

  const createComment = async (event) => {
    event.preventDefault();

    try {
      const id = location.state;
      const newComment = await addCommentToVideoApi(id, {
        content: commentContent,
      });
      console.log("Comment created:", newComment);
      setCommentContent("");
      fetchVideoComments();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  useEffect(() => {
    fetchVideo();
    fetchVideoComments();
  }, []);

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <VideoAside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
          <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
            <div className="col-span-12 w-full">
              {video.length === 0 ? (
                <div>Video Not Found</div>
              ) : (
                <VideoPlaying
                  video={video}
                  id={video.videos._id}
                  fetchVideo={fetchVideo}
                  likesCount={ReactionsCount(video.videoReactions, "likedBy")}
                  dislikesCount={ReactionsCount(
                    video.videoReactions,
                    "dislikedBy"
                  )}
                />
              )}
              <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
                <h6 className="font-semibold">{comments.length} Comments...</h6>
              </button>
              <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
                <div className="block">
                  <h6 className="mb-4 font-semibold">
                    {comments.length} Comments
                  </h6>
                  <form className="w-full" onSubmit={createComment}>
                    <input
                      type="text"
                      className="w-9/12 sm:w-5/6 rounded-lg border border-r-0 bg-transparent px-2 py-1 placeholder-white"
                      placeholder="Add a Comment"
                      onChange={(event) =>
                        setCommentContent(event.target.value)
                      }
                      value={commentContent}
                      required
                    />
                    <button
                      className="w-3/12 sm:w-1/6 py-1 border border-l-0 px-2 bg-[#ae7aff] hover:bg-[#a36aff] rounded-lg"
                      type="submit"
                    >
                      Send
                    </button>
                  </form>
                </div>
                <hr className="my-4 border-white" />
                {comments.length === 0 ? (
                  <div>Comments Not available</div>
                ) : (
                  comments.map((comment) => (
                    <CommentCard
                      key={comment._id}
                      commentId={comment._id}
                      ownerId={comment.owner}
                      fetchVideoComments={fetchVideoComments}
                      timeAgo={Time(comment.createdAt)}
                      comment={comment.content}
                      imgSrc={comment?.userDetails[0]?.avatar}
                      altText={comment?.userDetails[0]?.username}
                      fullName={comment?.userDetails[0]?.fullName}
                      username={comment?.userDetails[0]?.username}
                    />
                  ))
                )}
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
