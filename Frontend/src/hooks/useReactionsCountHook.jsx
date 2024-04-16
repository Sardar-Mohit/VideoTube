export const useReactionsCountHook = (video, fieldName) => {
  const reactions = video.filter((reaction) => reaction[fieldName]);
  return reactions?.length;
};