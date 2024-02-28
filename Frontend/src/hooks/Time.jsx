const Time = (videoCreatedAt) => {
  const createdAt = new Date(videoCreatedAt);
  const currentTime = new Date();
  const elapsedTime = currentTime - createdAt;
  const elapsedSeconds = elapsedTime / 1000;
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  let timeAgo;
  if (elapsedDays > 0) {
    timeAgo = `${elapsedDays} day${elapsedHours > 1 ? "s" : ""} ago`;
  } else if (elapsedHours > 0) {
    timeAgo = `${elapsedHours} hour${elapsedHours > 1 ? "s" : ""} ago`;
  } else if (elapsedMinutes > 0) {
    timeAgo = `${elapsedMinutes} minute${elapsedHours > 1 ? "s" : ""} ago`;
  } else {
    timeAgo = "Just now";
  }

  return timeAgo;
};

export default Time;
