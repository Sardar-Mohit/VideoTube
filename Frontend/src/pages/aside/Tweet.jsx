import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createTweetApi, getTweetsByUserIdApi } from "@/api/tweetsApi";
import { TweetCard } from "@/components";
import useTimeHook from "@/hooks/useTimeHook";
import ProfilesWrapper from "../profile-pages/ProfilesWrapper";

const Tweet = ({ userData, isItOwnersProfile }) => {
  const { userId } = useParams();
  const [tweetContent, setTweetContent] = useState("");
  const [userTweets, setUserTweets] = useState([]);

  const getUserTweets = async () => {
    try {
      const request = await getTweetsByUserIdApi(userId);
      const response = request?.statusCode.tweets;
      response.length > 0 && setUserTweets(response.reverse());
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  const createTweet = async (event) => {
    event.preventDefault();
    try {
      const newTweet = await createTweetApi({ content: tweetContent });
      setTweetContent("");
      getUserTweets();
    } catch (error) {
      console.error("Error creating tweet:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserTweets(userId);
    }
  }, [userId]);

  return (
    <ProfilesWrapper>
      {isItOwnersProfile && (
        <form onSubmit={createTweet}>
          <div className="mt-2 border pb-2">
            <textarea
              className="mb-2 h-10 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
              placeholder="Write a tweet..."
              value={tweetContent}
              onChange={(event) => setTweetContent(event.target.value)}
              required
            />
            <div className="flex items-center justify-end gap-x-3 px-3">
              <button
                type="button"
                className="inline-block h-5 w-5 hover:text-[#ae7aff]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="inline-block h-5 w-5 hover:text-[#ae7aff]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </button>
              <button
                type="submit"
                className="bg-[#ae7aff] px-3 py-2 font-semibold text-black"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      )}
      <div className="py-4">
        {userTweets.length > 0 &&
          userTweets.map((tweet) => (
            <TweetCard
              key={tweet._id}
              tweetId={tweet._id}
              content={tweet.content}
              getUserTweets={getUserTweets}
              username={tweet.ownerDetails.username}
              whenTweetWasUploaded={useTimeHook(tweet.createdAt)}
              userProfilePicture={tweet.ownerDetails.avatar}
              likeCount={tweet.likesDetails.length}
            />
          ))}
        {userTweets.length === 0 && (
          <section className="w-full  h-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm text-center">
                <h5 className="mb-2 font-semibold">No Tweets available</h5>
                <p>
                  There are no tweets here available.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </ProfilesWrapper>
  );
};

export default Tweet;
