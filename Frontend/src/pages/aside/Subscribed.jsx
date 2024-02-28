import {
  Aside,
  ChannelCardInSubscribed,
  ProfileHeaderWithNavigation,
} from "@/components";

const Subscribed = () => {
  const channels = [
    {
      name: "Code Master",
      subscribers: "20K",
      imageSrc:
        "https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Code Master",
    },
    {
      name: "React Ninja",
      subscribers: "40K",
      imageSrc:
        "https://images.pexels.com/photos/3532552/pexels-photo-3532552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "React Ninja",
    },
    {
      name: "Async Masters",
      subscribers: "60K",
      imageSrc:
        "https://images.pexels.com/photos/3532549/pexels-photo-3532549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Async Masters",
    },
    {
      name: "Code Crafters",
      subscribers: "80K",
      imageSrc:
        "https://images.pexels.com/photos/2522659/pexels-photo-2522659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Code Crafters",
    },
    {
      name: "Tailwind Pro",
      subscribers: "100K",
      imageSrc:
        "https://images.pexels.com/photos/2519823/pexels-photo-2519823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Tailwind Pro",
    },
    {
      name: "Express Learner",
      subscribers: "120K",
      imageSrc:
        "https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Express Learner",
    },
    {
      name: "Redux Master",
      subscribers: "140K",
      imageSrc:
        "https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Redux Master",
    },
    {
      name: "API Builder",
      subscribers: "160K",
      imageSrc:
        "https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "API Builder",
    },
    {
      name: "React Native Dev",
      subscribers: "180K",
      imageSrc:
        "https://images.pexels.com/photos/1739856/pexels-photo-1739856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "React Native Dev",
    },
    {
      name: "Hook Master",
      subscribers: "200K",
      imageSrc:
        "https://images.pexels.com/photos/1144257/pexels-photo-1144257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Hook Master",
    },
    {
      name: "CSS Wizard",
      subscribers: "220K",
      imageSrc:
        "https://images.pexels.com/photos/1144261/pexels-photo-1144261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "CSS Wizard",
    },
    {
      name: "Pythonista",
      subscribers: "240K",
      imageSrc:
        "https://images.pexels.com/photos/1144268/pexels-photo-1144268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Pythonista",
    },
    {
      name: "Django Master",
      subscribers: "260K",
      imageSrc:
        "https://images.pexels.com/photos/1144269/pexels-photo-1144269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Django Master",
    },
    {
      name: "ML Geek",
      subscribers: "280K",
      imageSrc:
        "https://images.pexels.com/photos/1144275/pexels-photo-1144275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "ML Geek",
    },
    {
      name: "ReactD3",
      subscribers: "300K",
      imageSrc:
        "https://images.pexels.com/photos/1144277/pexels-photo-1144277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "ReactD3",
    },
  ];

  return (
    <>
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
          <ProfileHeaderWithNavigation>
            <div className="flex flex-col gap-y-4 py-4">
              <div
                className="relative mb-2 rounded-lg bg-white py-2 pl-8 pr-3 text-black"
                style={{ borderRadius: "10px" }}
              >
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    ></path>
                  </svg>
                </span>
                <input
                  className="w-full bg-transparent outline-none rounded-lg"
                  placeholder="Search"
                />
              </div>
            </div>

            <div className="flex flex-col gap-y-4 py-4">
              {channels.map((channel, index) => (
                <ChannelCardInSubscribed
                  key={index}
                  name={channel.name}
                  subscribers={channel.subscribers}
                  imageSrc={channel.imageSrc}
                  alt={channel.alt}
                />
              ))}
            </div>
          </ProfileHeaderWithNavigation>
        </section>
      </div>
    </>
  );
};

export default Subscribed;
