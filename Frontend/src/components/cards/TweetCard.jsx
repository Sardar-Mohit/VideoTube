import { UpdateTweetCard } from "../index";
import { useEffect, useState } from "react";
import { deleteTweetApi } from "@/api/tweetsApi";
import { toggleTweetLikeApi } from "@/api/likeApi";
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
import TweetSkeletonCard from "../Skeleton/TweetSkeletonCard";

const TweetCard = ({
  content,
  tweetId,
  username,
  likeCount,
  getUserTweets,
  userProfilePicture,
  whenTweetWasUploaded,
}) => {
  const [updateTweet, setUpdateTweet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLike = async () => {
    if (!tweetId) {
      return false;
    }

    console.log("like");
    console.log(tweetId);
    try {
      const response = await toggleTweetLikeApi(tweetId);
      console.log("Like", response);
      getUserTweets();
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  const handleUpdateTweetToggle = () => {
    setUpdateTweet(!updateTweet);
  };

  const deleteTweet = async (tweetId) => {
    try {
      const deletedTweet = await deleteTweetApi(tweetId);
      console.log("Tweet deleted:", deletedTweet);
      getUserTweets("65d3c132908e8fa498a6c0e3");
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
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
        <TweetSkeletonCard />
      ) : (
        <div className="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
          <div className="h-14 w-14 shrink-0">
            <img
              src={userProfilePicture}
              alt={username}
              className="h-full w-full rounded-full object-cover bg-center"
            />
          </div>
          <div className="w-full">
            <h4 className="mb-1 flex items-center gap-x-1">
              <span className="font-semibold">{username}</span>&nbsp;
              <span className="inline-block text-sm text-gray-400">
                {whenTweetWasUploaded}
              </span>
            </h4>
            <p className="mb-2">{content}</p>
            <div className="flex gap-4">
              <button
                className="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]"
                data-like-count={likeCount}
                data-like-count-alt={Number(likeCount) + 1}
                onClick={handleLike}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5 text-[#ffffff] group-focus:text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-baseline gap-x-2 mr-4">
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
                    Are you absolutely sure you want to delete the video?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the video and remove the video from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      deleteTweet(tweetId);
                    }}
                    className="text-red-500 hover:text-red-600 hover:bg-[#e8686820] focus:text-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <button
              className="h-5 w-5 hover:text-[#ae7aff]"
              onClick={handleUpdateTweetToggle}
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
            {updateTweet && (
              <UpdateTweetCard
                getUserTweets={getUserTweets}
                tweetId={tweetId}
                close={handleUpdateTweetToggle}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TweetCard;
