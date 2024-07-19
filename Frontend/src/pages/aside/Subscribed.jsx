import React, { useEffect, useState } from "react";
import { getSubscribedChannelsApi } from "@/api/subscriptionApi";
import { ChannelCardInSubscribed } from "@/components";
import ProfilesWrapper from "../profile-pages/ProfilesWrapper";

const Subscribed = () => {
  const [channels, setChannels] = useState([]);

  const getSubscribedChannels = async () => {
    try {
      const request = await getSubscribedChannelsApi(userData._id);
      const response = request.statusCode.subscribedChannelsList;
      setChannels(response);
      if (response.length === 0) setChannels(null);
    } catch (error) {
      console.error("Error fetching subscribed channels:", error);
    }
  };

  useEffect(() => {
    getSubscribedChannels();
  }, []);

  return (
    <ProfilesWrapper>
      <div className="flex flex-col gap-y-4 py-4">
        <div className="relative mb-2 rounded-lg py-2 pl-8 pr-4 shadow-sm">
          {channels?.map((channel) => (
            <ChannelCardInSubscribed key={channel._id} channel={channel} />
          ))}
          {channels.length === 0 && (
            <section className="w-full  h-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
              <div className="flex items-center justify-center">
                <div className="w-full max-w-sm text-center">
                  <h5 className="mb-2 font-semibold">
                    No subscribed available
                  </h5>
                  <p>There are no subscribed channels here available.</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </ProfilesWrapper>
  );
};

export default Subscribed;
