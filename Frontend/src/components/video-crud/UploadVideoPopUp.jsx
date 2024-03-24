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
        className="bg-gray-800 rounded-lg w-full max-w-lg p-8"
        enctype="multipart/form-data"
      >
        <div className="text-xl font-semibold text-white mb-4 flex items-center justify-between">
          <h2>Upload Video</h2>
          <h2 className="cursor-pointer text-red-600" onClick={close}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="36"
              height="36"
              viewBox="0 0 48 48"
            >
              <path
                fill="#F44336"
                d="M21.5 4.5H26.501V43.5H21.5z"
                transform="rotate(45.001 24 24)"
              ></path>
              <path
                fill="#F44336"
                d="M21.5 4.5H26.5V43.501H21.5z"
                transform="rotate(135.008 24 24)"
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
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
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
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
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
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
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
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
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
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
          >
            Upload
          </button>
        ) : (
          <Button disabled size="xlg">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        )}
      </form>
    </div>
  );
};

export default UploadVideoPopUp;
