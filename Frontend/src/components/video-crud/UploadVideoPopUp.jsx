import { createVideo } from "@/api/videoApi";
import { useState } from "react";

const UploadVideoPopUp = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoFile: "",
    thumbnail: "",
  });

  const submitForm = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      const request = await createVideo(formData);
      console.log("request");
      console.log(request);
    } catch (error) {
      if (error.response.status === 400) {
        setError("Thumnail and video is required.");
      } else if (error.response.status === 500) {
        setError("Something went wrong while uploading the video.");
      }
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    // Update form data based on input changes
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "videoFile" || name === "thumbnail" ? files[0] : value,
    }));
    console.log(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <form
        onSubmit={submitForm}
        className="bg-gray-800 rounded-lg w-full max-w-lg p-8"
        enctype="multipart/form-data"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Upload Video</h2>
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
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadVideoPopUp;
