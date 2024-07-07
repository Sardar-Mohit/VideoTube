import useTimeHook from "@/hooks/useTimeHook";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { allVideos, videoToPlay } from "@/api/videoApi";
import { useReactionsCountHook } from "@/hooks/useReactionsCountHook";
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
  const location = useLocation();
  const [video, setVideo] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState([]);
  const [suggestionVideos, setSuggestionVideos] = useState([]);

  const fetchSuggestionVideos = async () => {
    try {
      const request = await allVideos();
      const response = request.statusCode;
      const allVideosData = response.reverse();

      // Shuffle the array
      for (let i = allVideosData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allVideosData[i], allVideosData[j]] = [
          allVideosData[j],
          allVideosData[i],
        ];
      }

      setSuggestionVideos(allVideosData);
    } catch (error) {
      console.error("Error fetching suggestion videos:", error);
    }
  };

  const fetchVideo = async (VideoId) => {
    try {
      const id = VideoId ? VideoId : location.state;
      const videoResponse = await videoToPlay(id);
      const videoArray = videoResponse.statusCode.user[0];
      console.log("videoArray");
      console.log(videoArray);
      setVideo(videoArray);
      fetchSuggestionVideos();
      fetchVideoComments(VideoId);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  const fetchVideoComments = async (VideoId) => {
    const id = VideoId ? VideoId : location.state;
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
                  owner={video}
                  videoId={video.videos[0]._id}
                  fetchVideo={fetchVideo}
                  likesCount={useReactionsCountHook(
                    video.videoReactions,
                    "likedBy"
                  )}
                  dislikesCount={useReactionsCountHook(
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
                      timeAgo={useTimeHook(comment.createdAt)}
                      comment={comment.content}
                      imgSrc={comment?.userDetails[0]?.avatar}
                      altText={comment?.userDetails[0]?.username}
                      fullName={comment?.userDetails[0]?.fullName}
                      username={comment?.userDetails[0]?.username}
                      likeCount={comment?.commentReactions.length}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 md:w-[350px] lg:w-[400px] xl:w-[450px]">
              {suggestionVideos?.map((video) => (
                <VideoSuggestion
                  key={video._id}
                  id={video._id}
                  duration={video.duration}
                  title={video.title}
                  views={video.views}
                  imageUrl={video.thumbnail}
                  altText={video.title}
                  time={useTimeHook(video.createdAt)}
                  author={video.ownerDetails.username}
                  authorImg={video.ownerDetails.avatar}
                  redirectToIndividualPage={fetchVideo}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IndividualPage;
