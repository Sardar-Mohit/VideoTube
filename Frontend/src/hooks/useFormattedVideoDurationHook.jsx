import { useMemo } from "react";

const useFormattedVideoDurationHook = (seconds) => {
  return useMemo(() => {
    if (!seconds && seconds !== 0) return "";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    if (formattedHours === "00") {
      return `${formattedMinutes}:${formattedSeconds}`;
    }

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }, [seconds]);
};

export default useFormattedVideoDurationHook;
