import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { updateCommentApi } from "@/api/commentsApi";

const UpdateCommentCard = ({
  close,
  commentId,
  comment,
  fetchVideoComments,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commentData, setCommentData] = useState({
    content: comment || "",
  });

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(commentData);

    try {
      if (commentData.content === comment) {
        setError("You should change comment to update comment.");
        return false;
      }

      if (commentData.content.trim() === "") {
        setError("Comment cannot be empty.");
        return false;
      }

      const request = await updateCommentApi(commentId, commentData);
      console.log(request);
      fetchVideoComments();
      close();
    } catch (error) {
      if (error.response === 500) {
        setError("Something went wrong while updating comment details.");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <form
        onSubmit={submitForm}
        className="bg-gray-800 rounded-lg w-full max-w-lg p-8"
      >
        <div className="text-xl font-semibold text-white mb-4 flex items-center justify-between">
          <h2>Update Comment</h2>
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
          <label htmlFor="desc" className="block text-white mb-1">
            Comment:
          </label>
          <textarea
            id="desc"
            name="content"
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
            onChange={handleChange}
            defaultValue={comment}
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
            Update Comment
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

export default UpdateCommentCard;
