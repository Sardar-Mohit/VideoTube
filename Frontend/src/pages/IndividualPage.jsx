import {
  CommentCard,
  VideoAside,
  VideoPlaying,
  VideoSuggestion,
} from "@/components";

const IndividualPage = () => {
  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <VideoAside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
          <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
            <div className="col-span-12 w-full">
              <VideoPlaying
                views="2m"
                title="Sockets.IO: Learn in depth from start to end."
                time="4 hours ago"
                altText="sockets.io"
                author="Mohit Kumar"
                subscribersCount="600k"
                videoURL="https://res.cloudinary.com/dfw5nnic5/video/upload/v1695117968/Sample_1280x720_mp4_b4db0s.mp4"
                imageUrl="https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-woman-reading-book-on-a-bench.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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

                <CommentCard
                  imgSrc="https://images.pexels.com/photos/18096595/pexels-photo-18096595/free-photo-of-music-on-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  altText="emilyt"
                  name="Emily Turner"
                  timeAgo="1 hour ago"
                  username="emilyt"
                  comment="Higher-order components have been a mystery to me for far too long. Looking forward to demystifying them with this series. Thanks!"
                />

                <CommentCard
                  imgSrc="https://images.pexels.com/photos/18094275/pexels-photo-18094275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  altText="davidc"
                  name="David Chen"
                  timeAgo="3 hours ago"
                  username="davidc"
                  comment="Compound components are a game-changer for UI development. Can't wait to learn more about them. Great work on this series!"
                />

                <CommentCard
                  imgSrc="https://images.pexels.com/photos/13847596/pexels-photo-13847596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  altText="alex_p"
                  name="Alex Parker"
                  timeAgo="12 hours ago"
                  username="alex_p"
                  comment="Controlled vs. uncontrolled components - finally! This topic has always confused me. Thanks for breaking it down!"
                />

                <CommentCard
                  imgSrc="https://images.pexels.com/photos/7775637/pexels-photo-7775637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  altText="jessicalee"
                  name="Jessica Lee"
                  timeAgo="5 hours ago"
                  username="jessicalee"
                  comment="This series is a goldmine for React developers! Compound components are something I've been eager to master. Thanks for this!"
                />

                <CommentCard
                  imgSrc="https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  altText="ryanjax"
                  name="Ryan Jackson"
                  timeAgo="Just now"
                  username="ryanjax"
                  comment="This is exactly what I needed to take my React skills to the next level. Looking forward to diving into the render props section!"
                />

                <CommentCard
                  imgSrc="https://images.pexels.com/photos/3532552/pexels-photo-3532552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  altText="lauraw"
                  name="Laura Williams"
                  timeAgo="1 minute ago"
                  username="lauraw"
                  comment="This series looks amazing! I'm especially excited to learn more about controlled vs. uncontrolled components. Thanks for sharing!"
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
                imageUrl="https://images.pexels.com/photos/1739849/pexels-photo-1739849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                altText="Building a RESTful API with Node.js and Express"
                title="Building a RESTful API with Node.js and Express"
                author="API Builder"
                views="14.5k Views · 7 hours ago"
                duration="24:33"
              />

              <VideoSuggestion
                imageUrl="https://images.pexels.com/photos/1739854/pexels-photo-1739854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                altText="Introduction to React Native"
                title="Introduction to React Native"
                author="React Native Dev"
                views="10.9k Views · 8 hours ago"
                duration="19:58"
              />

              <VideoSuggestion
                imageUrl="https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                altText="Creating Custom Hooks in React"
                title="Creating Custom Hooks in React"
                author="Hook Master"
                views="9.3k Views · 9 hours ago"
                duration="16:37"
              />

              <VideoSuggestion
                imageUrl="https://images.pexels.com/photos/1144260/pexels-photo-1144260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                altText="Building Scalable Web Applications with Django"
                title="Building Scalable Web Applications with Django"
                author="Django Master"
                views="18.9M Views · 12 hours ago"
                duration="32:18"
              />

              <VideoSuggestion
                imageUrl="https://images.pexels.com/photos/1144276/pexels-photo-1144276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                altText="Creating Interactive UIs with React and D3"
                title="Creating Interactive UIs with React and D3"
                author="ReactD3"
                views="20.1k Views · 14 hours ago"
                duration="29:30"
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
