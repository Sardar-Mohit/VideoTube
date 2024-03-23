import {
  Aside,
  PlaylistCard,
  VideoListingForSearch,
} from "@/components";

const OpenedPlaylist = () => {
  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="flex flex-wrap gap-x-4 gap-y-10 p-4 xl:flex-nowrap">
            <div className="w-full shrink-0 sm:max-w-md xl:max-w-sm">
              <PlaylistCard
                videosLenght="1"
                createdAgo="3 hours ago"
                playlistTotalViews="120K"
                title="JavaScript Fundamentals"
                description="Learn the core concepts and fundamentals of JavaScript programming language."
                thumbnail="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />

              <div className="mt-6 flex items-center gap-x-3">
                <div className="h-16 w-16 shrink-0">
                  <img
                    alt="React Patterns"
                    className="h-full w-full rounded-full"
                    src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  />
                </div>
                <div className="w-full">
                  <h6 className="font-semibold">React Patterns</h6>
                  <p className="text-sm text-gray-300">757K Subscribers</p>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-y-4">
              <VideoListingForSearch
                views="10.3k"
                time="44 minutes"
                author="Express Learner"
                title="Getting Started with Express.js"
                description="Learn the basics of building web applications with Node.js and Express.js framework."
                altText="Getting Started with Express.js"
                imgUrl="https://images.pexels.com/photos/2519817/pexels-photo-2519817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                authorImg="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <VideoListingForSearch
                views="14.5k"
                time="7 hours ago"
                author="API Builder"
                title="Building a RESTful API with Node.js and Express"
                description="Learn how to create a RESTful API using Node.js and the Express framework for building web applications."
                altText="Building a RESTful API with Node.js and Express"
                imgUrl="https://images.pexels.com/photos/1739849/pexels-photo-1739849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                authorImg="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <VideoListingForSearch
                views="10.9k"
                time="8 hours ago"
                author="React Native Dev"
                title="Introduction to React Native"
                description="Discover how to build mobile applications using React Native for both Android and iOS platforms."
                altText="Introduction to React Native"
                imgUrl="https://images.pexels.com/photos/1739854/pexels-photo-1739854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                authorImg="https://images.pexels.com/photos/1739856/pexels-photo-1739856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />

              <VideoListingForSearch
                views="9.3k"
                time="9 hours ago"
                author="Hook Master"
                title="Creating Custom Hooks in React"
                description="Learn how to create and use custom hooks to share logic across multiple React components."
                altText="Creating Custom Hooks in React"
                imgUrl="https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                authorImg="https://images.pexels.com/photos/1144257/pexels-photo-1144257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />

              <VideoListingForSearch
                views="18.9M"
                time="12 hours ago"
                author="Django Master"
                title="Building Scalable Web Applications with Django"
                description="Learn how to build robust and scalable web applications using the Django framework for Python."
                altText="Building Scalable Web Applications with Django"
                imgUrl="https://images.pexels.com/photos/1144260/pexels-photo-1144260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                authorImg="https://images.pexels.com/photos/1144269/pexels-photo-1144269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />

              <VideoListingForSearch
                views="20.1k"
                time="14 hours ago"
                author="ReactD3"
                title="Creating Interactive UIs with React and D3"
                description="Learn how to build dynamic and interactive user interfaces with React and the D3.js data visualization library."
                altText="Creating Interactive UIs with React and D3"
                imgUrl="https://images.pexels.com/photos/1144276/pexels-photo-1144276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                authorImg="https://images.pexels.com/photos/1144277/pexels-photo-1144277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />

              <VideoListingForSearch
                views="21.2k"
                time="15 hours ago"
                author="Passport Pro"
                title="Node.js Authentication with Passport.js"
                description="Learn how to implement user authentication in Node.js applications using the Passport.js middleware."
                altText="Node.js Authentication with Passport.js"
                imgUrl="https://images.pexels.com/photos/1144270/pexels-photo-1144270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                authorImg="https://images.pexels.com/photos/1144270/pexels-photo-1144270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />

              <VideoListingForSearch
                views="24.5k"
                time="18 hours ago"
                author="Tableau Master"
                title="Data Visualization with Tableau"
                description="Learn how to create stunning visualizations and dashboards using Tableau for data analysis."
                altText="Data Visualization with Tableau"
                imgUrl="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                authorImg="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />

              <VideoListingForSearch
                views="25.6k"
                time="19 hours ago"
                author="Socket.IO Expert"
                title="Building Real-Time Applications with Socket.IO"
                description="Learn how to create real-time applications using Socket.IO for seamless communication between clients and servers."
                altText="Building Real-Time Applications with Socket.IO"
                imgUrl="https://images.pexels.com/photos/1144250/pexels-photo-1144250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                authorImg="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OpenedPlaylist;
