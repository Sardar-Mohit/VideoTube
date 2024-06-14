import { useNavigate } from 'react-router-dom';

const VideoSuggestion = ({
  id,
  duration,
  title,
  views,
  imageUrl,
  time,
  author,
  authorImg,
  altText,
}) => {
  const navigate = useNavigate();

  const redirectToIndividualPage = () => {
    navigate(`/individual-page`, { state: { id } });
  };

  return (
    <div
      className="w-full gap-x-2 my-[1px] pr-2 md:flex cursor-pointer"
      onClick={redirectToIndividualPage}
    >
      <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
        <div className="w-full pt-[56%]">
          <div className="absolute inset-0">
            <img
              src={imageUrl}
              alt={altText}
              className="h-full w-full bg-center object-contain"
            />
          </div>
          <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
            {duration}
          </span>
        </div>
      </div>
      <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
        <div className="h-24 w-24 shrink-0 md:hidden">
          <img
            src={authorImg}
            alt="reactpatterns"
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="w-full pt-1 md:pt-0">
          <h6 className="mb-1 text-sm font-semibold">{title}</h6>
          <p className="mb-0.5 mt-2 text-sm text-gray-200">{author}</p>
          <p className="flex text-sm text-gray-200">
            {views} Views&nbsp;·&nbsp;{time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoSuggestion;
