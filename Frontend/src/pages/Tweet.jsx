import {
  Aside,
  ProfileBanner,
  ProfileBannerPicture,
  TweetCard,
} from "@/components";
import { useNavigate } from "react-router-dom";

const Tweet = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <ProfileBannerPicture />
          <div className="px-4 pb-4">
            <ProfileBanner />
            <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
              <li className="w-full" onClick={() => navigate("/profile")}>
                <button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
                  Videos
                </button>
              </li>
              <li className="w-full" onClick={() => navigate("/playlist")}>
                <button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
                  Playlist
                </button>
              </li>
              <li className="w-full" onClick={() => navigate("/tweet")}>
                <button className="w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]">
                  Tweets
                </button>
              </li>
              <li className="w-full" onClick={() => navigate("/subscribed")}>
                <button className="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">
                  Subscribed
                </button>
              </li>
            </ul>
            <div className="py-4">
              <TweetCard
                userProfilePicture="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                username="React Patterns"
                whenTweetWasUploaded="5 hours ago"
                content="Exploring the latest features in JavaScript ES11! The language keeps evolving. 💡 #JavaScript #ES11"
                likeCount="268"
                dislikeCount="232"
              />
              <TweetCard
                userProfilePicture="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                username="React Patterns"
                whenTweetWasUploaded="6 hours ago"
                content="Embracing the benefits of TypeScript for stronger, more
                reliable code. 🚀 #TypeScript #Programming"
                likeCount="425"
                dislikeCount="87"
              />
              <TweetCard
                userProfilePicture="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                username="React Patterns"
                whenTweetWasUploaded="7 hours ago"
                content="Styling made easy with Tailwind CSS! Rapidly build
                beautiful, responsive interfaces. 🎨 #TailwindCSS #WebDev"
                likeCount="425"
                dislikeCount="87"
              />
              <TweetCard
                userProfilePicture="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                username="React Patterns"
                whenTweetWasUploaded="8 hours ago"
                content="Building dynamic user interfaces with React! The go-to
                library for modern web development. 🚀 #React #WebDev"
                likeCount="425"
                dislikeCount="87"
              />
              <TweetCard
                userProfilePicture="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                username="React Patterns"
                whenTweetWasUploaded="9 hours ago"
                content="Next.js makes server-side rendering a breeze! Boost your
                React app's performance with ease. 🚀 #Nextjs #React"
                likeCount="425"
                dislikeCount="87"
              />
              <TweetCard
                userProfilePicture="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                username="React Patterns"
                whenTweetWasUploaded="9 hours ago"
                content="Dive into advanced JavaScript concepts like closures and
                prototypes. Level up your coding skills! 🔍 #AdvancedJS
                #CodingTips"
                likeCount="425"
                dislikeCount="87"
              />
              <TweetCard
                userProfilePicture="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                username="React Patterns"
                whenTweetWasUploaded="9 hours ago"
                content="Mastering TypeScript: From basics to advanced concepts.
                Boost your development workflow with strong typing! 🚀
                #TypeScript #Development"
                likeCount="425"
                dislikeCount="87"
              />
              <TweetCard
                userProfilePicture="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                username="Tailwind Wizard"
                whenTweetWasUploaded="12 hours ago"
                content=" Simplify your CSS workflow with Tailwind CSS. Effortless
                styling for modern web development! 🎨 #TailwindCSS #WebDev"
                likeCount="425"
                dislikeCount="87"
              />
              <TweetCard
                userProfilePicture="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                username="Tailwind Wizard"
                whenTweetWasUploaded="12 hours ago"
                content="Building dynamic UIs with React - A comprehensive guide for
                developers. Get started with React today! 🚀 #React
                #WebDevelopment"
                likeCount="425"
                dislikeCount="87"
              />
              <TweetCard
                userProfilePicture="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                username="React Patterns"
                whenTweetWasUploaded="14 hours ago"
                content="Optimize server-side rendering with Next.js. Improve
                performance and SEO for your React applications! 🚀 #Nextjs
                #React"
                likeCount="425"
                dislikeCount="87"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Tweet;
