import { createVideo } from "@/api/videoApi";
import { useState } from "react";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

const UploadVideoPopUp = ({ close }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoFile: "",
    thumbnail: "",
  });

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(formData);

    try {
      const request = await createVideo(formData);
      console.log(request);
      close();
    } catch (error) {
      if (error.response.status === 400) {
        setError("Thumnail and video is required.");
      } else if (error.response.status === 500) {
        setError("Something went wrong while uploading the video.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    // Update form data based on input changes
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "videoFile" || name === "thumbnail" ? files[0] : value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <form
        onSubmit={submitForm}
        className=" bg-black text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl w-full max-w-lg p-8"
        encType="multipart/form-data"
      >
        <div className="text-xl font-semibold text-white mb-4 flex items-center justify-between">
          <h2>Upload Video</h2>
          <h2 className="cursor-pointer " onClick={close}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              className="pointer-events-none w-full h-full"
            >
              <path
                fill="white"
                d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"
              ></path>
            </svg>
          </h2>
        </div>
        <div className="mb-4">
          <label htmlFor="upload-video" className="block text-white mb-1">
            Select Video File:
          </label>
          <input
            type="file"
            id="upload-video"
            name="videoFile"
            className="w-full bg-white rounded px-3 py-2 text-black cursor-pointer"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-white mb-1">
            Select Thumbnail:
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            className="w-full bg-white rounded px-3 py-2 text-black cursor-pointer"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-white mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full bg-white rounded px-3 py-2 text-black"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block text-white mb-1">
            Description:
          </label>
          <textarea
            id="desc"
            name="description"
            className="w-full bg-white rounded px-3 py-2 text-black"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        {error && (
          <div className="mb-4">
            <p className="block text-red-600 mb-1">{error}</p>
          </div>
        )}

        {loading == false ? (
          <button
            type="submit"
            className="w-32 flex justify-center items-center bg-fuchsia-700 text-white px-3 py-2 rounded hover:bg-fuchsia-800 transition duration-300"
          >
            Upload
          </button>
        ) : (
          <button
            type="submit"
            className="w-32 flex items-center bg-slate-700 text-white px-3 py-2 rounded hover:bg-slate-800 transition duration-300"
          >
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </button>
        )}
      </form>
    </div>
  );
};

export default UploadVideoPopUp;
