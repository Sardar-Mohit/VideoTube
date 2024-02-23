import {
  Aside,
  ProfileBanner,
  ProfileBannerPicture,
  TweetCard,
  ProfileNavbar,
} from "@/components";

const Tweet = () => {
  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <ProfileBannerPicture />
          <div className="px-4 pb-4">
            <ProfileBanner />
            <ProfileNavbar />
            <div className="mt-2 border pb-2">
              <textarea
                className="mb-2 h-10 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
                placeholder="Write a tweet"
                defaultValue={""}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </button>
                <button className="bg-[#ae7aff] px-3 py-2 font-semibold text-black">
                  Send
                </button>
              </div>
            </div>

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
