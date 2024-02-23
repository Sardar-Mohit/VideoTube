import {
  Aside,
  PlaylistCard,
  ProfileBanner,
  ProfileBannerPicture,
  ProfileNavbar,
} from "@/components";

const Playlist = () => {
  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <ProfileBannerPicture />
          <div className="px-4 pb-4">
            <ProfileBanner />
            <ProfileNavbar />

            <div className="grid gap-4 pt-2 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]">
              <PlaylistCard
                thumbnail="https://images.pexels.com/photos/2519817/pexels-photo-2519817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                videosLenght="1"
                playlistTotalViews="120K"
                createdAgo="3 hours ago"
                title="JavaScript Fundamentals"
                description="Learn the core concepts and fundamentals of JavaScript programming language."
              />
              <PlaylistCard
                thumbnail="https://images.pexels.com/photos/1739849/pexels-photo-1739849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                videosLenght="2"
                playlistTotalViews="90K"
                createdAgo="4 hours ago"
                title="TypeScript Essentials"
                description="Dive into TypeScript for enhanced type safety and scalable JavaScript applications."
              />
              <PlaylistCard
                thumbnail="https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                videosLenght="1"
                playlistTotalViews="80K"
                createdAgo="5 hours ago"
                title="React State Management"
                description="Explore various state management techniques in React applications."
              />
              <PlaylistCard
                thumbnail="https://images.pexels.com/photos/1144260/pexels-photo-1144260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                videosLenght="2"
                playlistTotalViews="110K"
                createdAgo="6 hours ago"
                title="Advanced JavaScript Techniques"
                description="Delve into advanced JavaScript concepts and techniques for professional-level programming."
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Playlist;
