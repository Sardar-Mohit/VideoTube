import {
  Aside,
  ProfileBannerPicture,
  ProfileBanner,
  ProfileNavbar,
  VideoCard,
} from "@/components";

const Profile = () => {
  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <ProfileBannerPicture />
          <div className="px-4 pb-4">
            <ProfileBanner />
            <ProfileNavbar />

            <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
              <VideoCard
                duration="22:18"
                title="Getting Started with Express.js"
                views="11.k"
                whenVideoWasUploaded="5 hours ago"
                thumbnail="https://images.pexels.com/photos/2519817/pexels-photo-2519817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <VideoCard
                duration="24:33"
                title="Building a RESTful API with Node.js and Express"
                views="14.5k"
                whenVideoWasUploaded="7 hours ago"
                thumbnail="https://images.pexels.com/photos/1739849/pexels-photo-1739849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <VideoCard
                duration="19:58"
                title="Introduction to React Native"
                views="10.9k"
                whenVideoWasUploaded="8 hours ago"
                thumbnail="https://images.pexels.com/photos/1739854/pexels-photo-1739854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <VideoCard
                duration="16:37"
                title="Creating Custom Hooks in React"
                views="9.3k"
                whenVideoWasUploaded="9 hours ago"
                thumbnail="https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <VideoCard
                duration="32:18"
                title="Building Scalable Web Applications with Django"
                views="18.9M"
                whenVideoWasUploaded="12 hours ago"
                thumbnail="https://images.pexels.com/photos/1144260/pexels-photo-1144260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <VideoCard
                duration="29:30"
                title="Creating Interactive UIs with React and D3"
                views="20.1k"
                whenVideoWasUploaded="14 hours ago"
                thumbnail="https://images.pexels.com/photos/1144276/pexels-photo-1144276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <VideoCard
                duration="26:58"
                title="Node.js Authentication with Passport.js"
                views="21.2k"
                whenVideoWasUploaded="15 hours ago"
                thumbnail="https://images.pexels.com/photos/1144274/pexels-photo-1144274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <VideoCard
                duration="32:14"
                title="Data Visualization with Tableau"
                views="24.5k"
                whenVideoWasUploaded="18 hours ago"
                thumbnail="https://images.pexels.com/photos/1144231/pexels-photo-1144231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <VideoCard
                duration="27:37"
                title="Building Real-Time Applications with Socket.IO"
                views="25.6k"
                whenVideoWasUploaded="19 hours ago"
                thumbnail="https://images.pexels.com/photos/1144250/pexels-photo-1144250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <VideoCard
                duration="31:55"
                title="Advanced CSS: Animations and Transitions"
                views="28.9k"
                whenVideoWasUploaded="22 hours ago"
                thumbnail="https://images.pexels.com/photos/1115824/pexels-photo-1115824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <VideoCard
                duration="30:25"
                title="Advanced React Patterns"
                views="30.1k"
                whenVideoWasUploaded="1 day ago"
                thumbnail="https://images.pexels.com/photos/1115808/pexels-photo-1115808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
