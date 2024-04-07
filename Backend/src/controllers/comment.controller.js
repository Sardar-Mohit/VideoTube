import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 30 } = req.query;

  let video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video Not found to get all comment");
  }

  let comments = await Comment.aggregate([
    { $match: { video: new mongoose.Types.ObjectId(videoId) } },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "comment",
        as: "commentReactions",
      },
    },
    {
      $project: {
        "userDetails.email": 0,
        "userDetails.coverImage": 0,
        "userDetails.watchHistory": 0,
        "userDetails.password": 0,
        "userDetails.refreshToken": 0,
        "userDetails.videos": 0,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  res
    .status(200)
    .json(new ApiResponse(200, { comments }, "comments fetched successfully"));
});

const addComment = asyncHandler(async (req, res) => {
  // Got all the things required
  const user = req.user;
  const { content } = req.body;
  const { videoId } = req.params;

  // Checked if the video is present
  let getVideo = await Video.findById({ _id: videoId });
  if (!getVideo) {
    throw new ApiError(404, "Video Not found to comment");
  }

  // Checked if the user is present
  let getUser = await User.findById({ _id: user._id });
  if (!getUser) {
    throw new ApiError(404, "User Not found to comment");
  }

  // Created the comment
  let createComment = await Comment.create({
    content: content,
    video: videoId,
    owner: user._id,
  });
  if (!createComment) {
    throw new ApiError(404, "Comment not created");
  }

  // Send response
  res
    .status(200)
    .json(
      new ApiResponse(200, { createComment }, "Comment created successfully")
    );
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  // get the comment to update
  let commentToUpdate = await Comment.findById({ _id: commentId });
  if (!commentToUpdate) {
    throw new ApiError(404, "Comment not Found to update");
  }

  // Check if the comment if empty
  const trimmedContent = content.trim();
  if (!trimmedContent) {
    throw new ApiError(400, "Comment should not be empty");
  }

  // Check if the new content is different from the existing content
  if (trimmedContent === commentToUpdate.content.trim()) {
    throw new ApiError(
      400,
      "New comment should be different from the existing one"
    );
  }

  // Update the content and save the comment
  commentToUpdate.content = trimmedContent;
  commentToUpdate.save();

  // Send response
  res
    .status(200)
    .json(
      new ApiResponse(200, { commentToUpdate }, "Comment updated successfully")
    );
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  let commentToDelete = await Comment.findByIdAndDelete({ _id: commentId });
  if ((commentToDelete.length = 0)) {
    throw new ApiError(404, "Comment Doesn't Exists");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { commentToDelete }, "Comment Successfully deleted")
    );
});

export { getVideoComments, addComment, updateComment, deleteComment };
