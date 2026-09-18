import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { updatePlaylistApi } from "@/api/playlistApi";
import { Button } from "../ui/button";

const UpdatePlaylistCard = ({
  close,
  name,
  description,
  playlistId,
  onPlaylistUpdated,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: name || "",
    description: description || "",
  });

  const submitForm = async (event) => {
    event.preventDefault();

    setError(null);

    const trimmedName = formData.name.trim();
    const trimmedDescription = formData.description.trim();

    if (trimmedName === "" || trimmedDescription === "") {
      setError("Name and description cannot be empty.");
      return;
    }

    if (
      trimmedName === name.trim() &&
      trimmedDescription === description.trim()
    ) {
      setError(
        "You should change name or description to update playlist."
      );
      return;
    }

    setLoading(true);

    try {
      const request = await updatePlaylistApi(playlistId, {
        name: trimmedName,
        description: trimmedDescription,
      });

      console.log(request);

      // Update the parent data before closing the modal
      if (onPlaylistUpdated) {
        await onPlaylistUpdated();
      }

      close();
    } catch (error) {
      console.error("Error updating playlist:", error);

      if (error.response?.status === 500) {
        setError(
          "Something went wrong while updating playlist details."
        );
      } else {
        setError(
          error.response?.data?.message ||
            "Something went wrong while updating playlist."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={submitForm}
        className="w-full max-w-lg rounded-lg bg-gray-800 p-8"
        encType="multipart/form-data"
      >
        <div className="mb-4 flex items-center justify-between text-xl font-semibold text-white">
          <h2>Update Playlist</h2>

          <button
            type="button"
            className="cursor-pointer text-red-600"
            onClick={close}
          >
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
              />

              <path
                fill="#F44336"
                d="M21.5 4.5H26.5V43.501H21.5z"
                transform="rotate(135.008 24 24)"
              />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-1 block text-white"
          >
            Name:
          </label>

          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            className="w-full rounded bg-gray-700 px-3 py-2 text-white"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="desc"
            className="mb-1 block text-white"
          >
            Description:
          </label>

          <textarea
            id="desc"
            name="description"
            value={formData.description}
            className="w-full rounded bg-gray-700 px-3 py-2 text-white"
            onChange={handleChange}
          />
        </div>

        {error && (
          <div className="mb-4">
            <p className="mb-1 block text-red-600">
              {error}
            </p>
          </div>
        )}

        {!loading ? (
          <button
            type="submit"
            className="rounded bg-purple-600 px-4 py-2 text-white transition duration-300 hover:bg-purple-700"
          >
            Update Playlist
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

export default UpdatePlaylistCard;