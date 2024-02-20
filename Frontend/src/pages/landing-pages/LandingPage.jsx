import "../../index.css"
import { Aside, LandingVideoPageCard } from "@/components/index";

const LandingPage = () => {
  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
            <LandingVideoPageCard
              duration="22:18"
              title="Getting Started with Express.js"
              views="11.k"
              time="5 hours ago"
              thumbnail="https://images.pexels.com/photos/2519817/pexels-photo-2519817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              authorName="Express Learner"
              authorImg="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <LandingVideoPageCard
              duration="24:33"
              title="Building a RESTful API with Node.js and Express"
              views="14.5k"
              time="7 hours ago"
              thumbnail="https://images.pexels.com/photos/1739849/pexels-photo-1739849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              authorName="API Builder"
              authorImg="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <LandingVideoPageCard
              duration="19:58"
              title="Introduction to React Native"
              views="10.9k"
              time="8 hours ago"
              thumbnail="https://images.pexels.com/photos/1739854/pexels-photo-1739854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              authorName="React Native Dev"
              authorImg="https://images.pexels.com/photos/1739856/pexels-photo-1739856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <LandingVideoPageCard
              duration="16:37"
              title="Creating Custom Hooks in React"
              views="9.3k"
              time="9 hours ago"
              thumbnail="https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              authorName="Hook Master"
              authorImg="https://images.pexels.com/photos/1144257/pexels-photo-1144257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <LandingVideoPageCard
              duration="32:18"
              title="Building Scalable Web Applications with Django"
              views="18.9M"
              time="12 hours ago"
              thumbnail="https://images.pexels.com/photos/1144260/pexels-photo-1144260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              authorName="Django Master"
              authorImg="https://images.pexels.com/photos/1144269/pexels-photo-1144269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <LandingVideoPageCard
              duration="29:30"
              title="Creating Interactive UIs with React and D3"
              views="20.1k"
              time="14 hours ago"
              thumbnail="https://images.pexels.com/photos/1144276/pexels-photo-1144276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              authorName="ReactD3"
              authorImg="https://images.pexels.com/photos/1144277/pexels-photo-1144277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <LandingVideoPageCard
              duration="26:58"
              title="Node.js Authentication with Passport.js"
              views="21.2k"
              time="15 hours ago"
              thumbnail="https://images.pexels.com/photos/1144274/pexels-photo-1144274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              authorName="Passport Pro"
              authorImg="https://images.pexels.com/photos/1144270/pexels-photo-1144270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <LandingVideoPageCard
              duration="32:14"
              title="Data Visualization with Tableau"
              views="24.5k"
              time="18 hours ago"
              thumbnail="https://images.pexels.com/photos/1144231/pexels-photo-1144231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              authorName="Tableau Master"
              authorImg="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <LandingVideoPageCard
              duration="27:37"
              title="Building Real-Time Applications with Socket.IO"
              views="25.6k"
              time="19 hours ago"
              thumbnail="https://images.pexels.com/photos/1144250/pexels-photo-1144250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              authorName="Socket.IO Expert"
              authorImg="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <LandingVideoPageCard
              duration="31:55"
              title="Advanced CSS: Animations and Transitions"
              views="28.9k"
              time="22 hours ago"
              thumbnail="https://images.pexels.com/photos/1115824/pexels-photo-1115824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              authorName="CSS Animations"
              authorImg="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <LandingVideoPageCard
              duration="30:25"
              title="Advanced React Patterns"
              views="30.1k"
              time="1 day ago"
              thumbnail="https://images.pexels.com/photos/1115808/pexels-photo-1115808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              authorName="React Patterns"
              authorImg="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <LandingVideoPageCard
              duration="26:58"
              title="Node.js Authentication with Passport.js"
              views="21.2k"
              time="15 hours ago"
              thumbnail="https://images.pexels.com/photos/1144274/pexels-photo-1144274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              authorName="Passport Pro"
              authorImg="https://images.pexels.com/photos/1144270/pexels-photo-1144270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
