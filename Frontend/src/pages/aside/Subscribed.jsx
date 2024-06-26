import { getSubscribedChannelsApi } from "@/api/subscriptionApi";
import {
  Aside,
  ChannelCardInSubscribed,
  ProfileHeaderWithNavigation,
} from "@/components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Subscribed = () => {
  const [channels, setChannels] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const getSubscribedChannels = async () => {
    const request = await getSubscribedChannelsApi(user._id);
    const response = request.statusCode.subscribedChannelsList;
    console.log("response");
    console.log(response.length);
    setChannels(response);
    response.length === 0 && setChannels(null);
  };

  useEffect(() => {
    getSubscribedChannels();
  }, []);

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
              {channels &&
                channels.length > 0 &&
                channels?.map((channel) => (
                  <ChannelCardInSubscribed
                    key={channel._id}
                    name={channel.username}
                    imageSrc={channel.avatar}
                    subscriberCount={channel.subscriberCount}
                    alt={channel.username}
                  />
                ))}

              {channels === null && (
                <div className="flex justify-center p-4">
                  <div className="w-full max-w-sm text-center">
                    <p className="mb-3 w-full">
                      <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                        <span className="inline-block w-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                            />
                          </svg>
                        </span>
                      </span>
                    </p>
                    <h5 className="mb-2 font-semibold">
                      No channels subscribered
                    </h5>
                    <p>
                      This channel has yet to <strong>subscribe</strong> a new
                      channel.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ProfileHeaderWithNavigation>
        </section>
      </div>
    </>
  );
};

export default Subscribed;
