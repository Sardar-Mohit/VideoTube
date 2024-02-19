import React from "react";
import { Aside, VideoListingForSearch } from "@/components/index";

const VideoListing = () => {
  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="flex flex-col gap-4 p-4">
            <VideoListingForSearch
              imgUrl="https://images.pexels.com/photos/2519817/pexels-photo-2519817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              altText="Getting Started with Express.js"
              title="Getting Started with Express.js"
              views="10.3k"
              time="44 minutes"
              author="Express Learner"
              authorImg="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              description="Learn the basics of building web applications with Node.js and Express.js framework."
            />
            <VideoListingForSearch
              imgUrl="https://images.pexels.com/photos/1739849/pexels-photo-1739849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              altText="Building a RESTful API with Node.js and Express"
              title="Building a RESTful API with Node.js and Express"
              views="14.5k"
              time="7 hours ago"
              author="API Builder"
              authorImg="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              description="Learn how to create a RESTful API using Node.js and the Express framework for building web applications."
            />
            <VideoListingForSearch
              imgUrl="https://images.pexels.com/photos/1739854/pexels-photo-1739854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              altText="Introduction to React Native"
              title="Introduction to React Native"
              views="10.9k"
              time="8 hours ago"
              author="React Native Dev"
              authorImg="https://images.pexels.com/photos/1739856/pexels-photo-1739856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              description="Discover how to build mobile applications using React Native for both Android and iOS platforms."
            />

            <VideoListingForSearch
              imgUrl="https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              altText="Creating Custom Hooks in React"
              title="Creating Custom Hooks in React"
              views="9.3k"
              time="9 hours ago"
              author="Hook Master"
              authorImg="https://images.pexels.com/photos/1144257/pexels-photo-1144257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              description="Learn how to create and use custom hooks to share logic across multiple React components."
            />

            <VideoListingForSearch
              imgUrl="https://images.pexels.com/photos/1144260/pexels-photo-1144260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              altText="Building Scalable Web Applications with Django"
              title="Building Scalable Web Applications with Django"
              views="18.9M"
              time="12 hours ago"
              author="Django Master"
              authorImg="https://images.pexels.com/photos/1144269/pexels-photo-1144269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              description="Learn how to build robust and scalable web applications using the Django framework for Python."
            />

            <VideoListingForSearch
              imgUrl="https://images.pexels.com/photos/1144276/pexels-photo-1144276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              altText="Creating Interactive UIs with React and D3"
              title="Creating Interactive UIs with React and D3"
              views="20.1k"
              time="14 hours ago"
              author="ReactD3"
              authorImg="https://images.pexels.com/photos/1144277/pexels-photo-1144277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              description="Learn how to build dynamic and interactive user interfaces with React and the D3.js data visualization library."
            />

            <VideoListingForSearch
              imgUrl="https://images.pexels.com/photos/1144270/pexels-photo-1144270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              altText="Node.js Authentication with Passport.js"
              title="Node.js Authentication with Passport.js"
              views="21.2k"
              time="15 hours ago"
              author="Passport Pro"
              authorImg="https://images.pexels.com/photos/1144270/pexels-photo-1144270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              description="Learn how to implement user authentication in Node.js applications using the Passport.js middleware."
            />

            <VideoListingForSearch
              imgUrl="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              altText="Data Visualization with Tableau"
              title="Data Visualization with Tableau"
              views="24.5k"
              time="18 hours ago"
              author="Tableau Master"
              authorImg="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              description="Learn how to create stunning visualizations and dashboards using Tableau for data analysis."
            />

            <VideoListingForSearch
              imgUrl="https://images.pexels.com/photos/1144250/pexels-photo-1144250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              altText="Building Real-Time Applications with Socket.IO"
              title="Building Real-Time Applications with Socket.IO"
              views="25.6k"
              time="19 hours ago"
              author="Socket.IO Expert"
              authorImg="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              description="Learn how to create real-time applications using Socket.IO for seamless communication between clients and servers."
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default VideoListing;
