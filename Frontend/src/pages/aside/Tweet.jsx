import {
  createTweetApi,
  getTweetsByUserIdApi,
} from "@/api/tweetsApi";
import { Aside, TweetCard, ProfileHeaderWithNavigation } from "@/components";
import { ReactionsCount } from "@/hooks/ReactionsCount";
import Time from "@/hooks/Time";
import { useEffect, useState } from "react";

const Tweet = () => {
  const [tweetContent, setTweetContent] = useState("");
  const [userTweets, setUserTweets] = useState([]);

  const getUserTweets = async () => {
    const request = await getTweetsByUserIdApi("65d3c132908e8fa498a6c0e3");
    const response = request?.statusCode?.tweets;
    console.log(response);
    setUserTweets(response.reverse());
  };

  const createTweet = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const newTweet = await createTweetApi({ content: tweetContent });

      console.log("Tweet created:", newTweet);
      setTweetContent("");
      getUserTweets("65d3c132908e8fa498a6c0e3");
    } catch (error) {
      console.error("Error creating tweet:", error);
    }
  };

  useEffect(() => {
    getUserTweets();
  }, []);

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <ProfileHeaderWithNavigation>
            <form onSubmit={createTweet}>
              <div className="mt-2 border pb-2">
                <textarea
                  className="mb-2 h-10 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
                  placeholder="Write a tweet"
                  value={tweetContent}
                  onChange={(event) => setTweetContent(event.target.value)}
                  required
                />
                <div className="flex items-center justify-end gap-x-3 px-3">
                  <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      {/* Icon for first button */}
                    </svg>
                  </button>
                  <button className="inline-block h-5 w-5 hover:text-[#ae7aff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      {/* Icon for second button */}
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
            <div className="py-4">
              {userTweets.length > 0 &&
                userTweets.map((tweet) => (
                  <TweetCard
                    key={tweet._id}
                    tweetId={tweet._id}
                    userProfilePicture={tweet.ownerDetails.avatar}
                    username={tweet.ownerDetails.username}
                    whenTweetWasUploaded={Time(tweet.createdAt)}
                    content={tweet.content}
                    getUserTweets={getUserTweets}
                    likeCount={ReactionsCount(tweet.likesDetails, "likedBy")}
                    dislikeCount={ReactionsCount(
                      tweet.likesDetails,
                      "dislikedBy"
                    )}
                  />
                ))}
            </div>
          </ProfileHeaderWithNavigation>
        </section>
      </div>
    </>
  );
};

export default Tweet;
