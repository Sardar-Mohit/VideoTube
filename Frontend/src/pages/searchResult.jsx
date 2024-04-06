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
              thumbnail="https://images.pexels.com/photos/2519817/pexels-photo-2519817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              altText="Getting Started with Express.js"
              title="Getting Started with Express.js"
              views="10.3k"
              time="44 minutes"
              owner="Express Learner"
              ownerImg="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              description="Learn the basics of building web applications with Node.js and Express.js framework."
            />
            <VideoListingForSearch
              thumbnail="https://images.pexels.com/photos/1739849/pexels-photo-1739849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              altText="Building a RESTful API with Node.js and Express"
              title="Building a RESTful API with Node.js and Express"
              views="14.5k"
              time="7 hours ago"
              owner="API Builder"
              ownerImg="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              description="Learn how to create a RESTful API using Node.js and the Express framework for building web applications."
            />
            <VideoListingForSearch
              thumbnail="https://images.pexels.com/photos/1739854/pexels-photo-1739854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              altText="Introduction to React Native"
              title="Introduction to React Native"
              views="10.9k"
              time="8 hours ago"
              owner="React Native Dev"
              ownerImg="https://images.pexels.com/photos/1739856/pexels-photo-1739856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              description="Discover how to build mobile applications using React Native for both Android and iOS platforms."
            />

            <VideoListingForSearch
              thumbnail="https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              altText="Creating Custom Hooks in React"
              title="Creating Custom Hooks in React"
              views="9.3k"
              time="9 hours ago"
              owner="Hook Master"
              ownerImg="https://images.pexels.com/photos/1144257/pexels-photo-1144257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              description="Learn how to create and use custom hooks to share logic across multiple React components."
            />

          </div>
        </section>
      </div>
    </>
  );
};

export default VideoListing;
