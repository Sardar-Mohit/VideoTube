import { updateVideo } from "@/api/videoApi";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const UpdateVideoPopUp = ({ close, video, onVideoUpdated }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title || "",
        description: video.description || "",
        thumbnail: "",
      });
    }
  }, [video]);

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updateData = new FormData();

      updateData.append("title", formData.title);
      updateData.append("description", formData.description);

      if (formData.thumbnail) {
        updateData.append("thumbnail", formData.thumbnail);
      }

      const request = await updateVideo(video._id, updateData);

      console.log(request);

      if (onVideoUpdated) {
        await onVideoUpdated();
      }

      close();
    } catch (error) {
      console.log(error);

      if (error.response?.status === 400) {
        setError(
          error.response?.data?.message ||
            "At least one field should be updated."
        );
      } else if (error.response?.status === 500) {
        setError("Something went wrong while updating the video.");
      } else {
        setError(
          error.response?.data?.message ||
            "Something went wrong while updating the video."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "thumbnail" ? files[0] : value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={submitForm}
        className="w-full max-w-lg rounded-xl border border-gray-300 bg-black p-8 text-white dark:border-gray-700 dark:bg-gray-800"
        encType="multipart/form-data"
      >
        <div className="mb-4 flex items-center justify-between text-xl font-semibold text-white">
          <h2>Update Video</h2>

          <h2 className="cursor-pointer" onClick={close}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              className="pointer-events-none h-full w-full"
            >
              <path
                fill="white"
                d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"
              ></path>
            </svg>
          </h2>
        </div>

        <div className="mb-4">
          <label
            htmlFor="thumbnail"
            className="mb-1 block text-white"
          >
            Change Thumbnail:
          </label>

          <img
            src={video?.thumbnail}
            alt={video?.title}
            className="mb-3 h-40 w-full rounded object-cover"
          />

          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            className="w-full cursor-pointer rounded bg-white px-3 py-2 text-black"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="mb-1 block text-white"
          >
            Title:
          </label>

          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            className="w-full rounded bg-white px-3 py-2 text-black"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-1 block text-white"
          >
            Description:
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            className="w-full rounded bg-white px-3 py-2 text-black"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {error && (
          <div className="mb-4">
            <p className="mb-1 block text-red-600">{error}</p>
          </div>
        )}

        {loading === false ? (
          <button
            type="submit"
            className="flex w-32 items-center justify-center rounded bg-fuchsia-700 px-3 py-2 text-white transition duration-300 hover:bg-fuchsia-800"
          >
            Update
          </button>
        ) : (
          <button
            type="submit"
            disabled
            className="flex w-32 items-center rounded bg-slate-700 px-3 py-2 text-white transition duration-300 hover:bg-slate-800"
          >
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </button>
        )}
      </form>
    </div>
  );
};

export default UpdateVideoPopUp;