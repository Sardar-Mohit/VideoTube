function ChannelCardInSubscribed({
  name,
  subscriberCount,
  subscribers,
  imageSrc,
  alt,
}) {
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-x-2">
        <div className="h-14 w-14 shrink-0">
          <img
            src={imageSrc}
            alt={alt}
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="block">
          <h6 className="font-semibold">{name}</h6>
          <p className="text-sm text-gray-300">
            {subscribers}&nbsp;{subscriberCount} Subscribers
          </p>
        </div>
      </div>
      <div className="block">
        <button className="group/btn px-3 py-2 text-black bg-white focus:bg-[#ae7aff]">
          <span className="group-focus/btn:hidden">Subscribe</span>
          <span className="hidden group-focus/btn:inline">Subscribed</span>
        </button>
      </div>
    </div>
  );
}

export default ChannelCardInSubscribed;
