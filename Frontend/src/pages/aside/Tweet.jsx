import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createTweetApi, getTweetsByUserIdApi } from "@/api/tweetsApi";
import { TweetCard } from "@/components";
import useTimeHook from "@/hooks/useTimeHook";
import ProfilesWrapper from "../profile-pages/ProfilesWrapper";

const Tweet = () => {
  const { userId } = useParams();

  const loggedInUser = useSelector((state) => state.auth.user);

  const [tweetContent, setTweetContent] = useState("");
  const [userTweets, setUserTweets] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const moreMenuRef = useRef(null);

  // Check whether the profile being viewed belongs to the logged-in user
  const isItOwnersProfile = loggedInUser?._id === userId;

  const getUserTweets = async () => {
    try {
      const request = await getTweetsByUserIdApi(userId);
      const response = request?.statusCode?.tweets || [];

      setUserTweets([...response].reverse());
    } catch (error) {
      console.error("Error fetching tweets:", error);
      setUserTweets([]);
    }
  };

  const createTweet = async (event) => {
    event.preventDefault();

    if (!tweetContent.trim()) return;

    try {
      await createTweetApi({
        content: tweetContent,
      });

      setTweetContent("");

      // Refresh tweets after creating
      await getUserTweets();
    } catch (error) {
      console.error("Error creating tweet:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserTweets();
    }
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target)
      ) {
        setShowMore(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ProfilesWrapper>
      {/* Create Tweet - Only visible on your own profile */}
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
              {/* More button */}
              <div ref={moreMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setShowMore((prev) => !prev)}
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
                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 1.5 0 011.5 0z"
                    />
                  </svg>
                </button>

                {showMore && (
                  <div className="absolute bottom-7 right-0 z-50 w-40 rounded-md border border-gray-700 bg-[#181818] p-1 shadow-lg">
                    <button
                      type="button"
                      onClick={async () => {
                        if (tweetContent.trim()) {
                          await navigator.clipboard.writeText(tweetContent);
                        }
                        setShowMore(false);
                      }}
                      className="w-full rounded px-3 py-2 text-left text-sm hover:bg-white/10"
                    >
                      Copy
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setTweetContent("");
                        setShowMore(false);
                      }}
                      className="w-full rounded px-3 py-2 text-left text-sm hover:bg-white/10"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
              {/* Send */}
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

      {/* Tweets */}
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
          <section className="h-full w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm text-center">
                <h5 className="mb-2 font-semibold">No Tweets available</h5>
                <p>There are no tweets here available.</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </ProfilesWrapper>
  );
};

export default Tweet;