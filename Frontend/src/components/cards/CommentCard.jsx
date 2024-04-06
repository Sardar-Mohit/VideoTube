import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCommentApi } from "@/api/commentsApi";
import UpdateCommentCard from "../updateCommentCard";

const CommentCard = ({
  imgSrc,
  ownerId,
  comment,
  altText,
  timeAgo,
  fullName,
  username,
  commentId,
  fetchVideoComments,
}) => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.statusCode?.user?._id;
  const [updateComment, setUpdateComment] = useState(false);

  const handleUpdateCommentToggle = () => {
    setUpdateComment(!updateComment);
  };

  const deleteComment = async (commentId) => {
    try {
      const deletedComment = await deleteCommentApi(commentId);
      console.log("Comment deleted:", deletedComment);
      fetchVideoComments();
    } catch (error) {
      console.error("Error deleting Comment:", error);
    }
  };

  useEffect(() => {
    console.log(ownerId)
    console.log(userId)
  }, [])
  
  return (
    <div>
      <div className="flex gap-x-4 justify-between">
        <div className="flex gap-x-4 ">
          <div className="mt-2 h-11 w-11 shrink-0">
            <img
              src={imgSrc}
              alt={altText}
              className="h-full w-full object-cover bg-center rounded-full cursor-pointer"
            />
          </div>
          <div className="block cursor-pointer">
            <p className="flex items-center text-gray-200 ">
              {fullName}&nbsp;·&nbsp;
              <span className="text-sm">{timeAgo}</span>
            </p>
            <p className="text-sm text-gray-200">@{username}</p>
            <p className="mt-3 text-sm cursor-text">{comment}</p>
          </div>
        </div>
        {userId === ownerId && (
          <div className="flex items-baseline gap-x-2 mr-4">
            <AlertDialog className="new-york">
              <AlertDialogTrigger>
                <button className="h-5 w-5 hover:text-[#ae7aff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure you want to delete the comment?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      deleteComment(commentId);
                    }}
                    className="text-red-500 hover:text-red-600 hover:bg-[#e8686820] focus:text-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <button
              className="h-5 w-5 hover:text-[#ae7aff]"
              onClick={handleUpdateCommentToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </button>
            {updateComment && (
              <UpdateCommentCard
                fetchVideoComments={fetchVideoComments}
                commentId={commentId}
                close={handleUpdateCommentToggle}
                comment={comment}
              />
            )}
          </div>
        )}
      </div>
      <hr className="my-4 border-white" />
    </div>
  );
};

export default CommentCard;
