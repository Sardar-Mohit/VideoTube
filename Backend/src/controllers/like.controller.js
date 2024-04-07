import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const user = req.user;

  // User unliking a video
  let unlike = await Like.findOneAndDelete({
    likedBy: user._id,
    video: videoId,
  });

  if (unlike) {
    res
      .status(200)
      .json(new ApiResponse(200, { unlike }, "Video unliked successfully"));
  } else {
    // User liking a video
    let like = await Like.create({
      video: videoId,
      likedBy: user?._id,
    });

    if (like) {
      res
        .status(200)
        .json(new ApiResponse(200, { like }, "Video liked successfully"));
    } else {
      throw new ApiError(403, "You don't have permission to like this video");
    }
  }
});

const toggleVideoDislike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const user = req.user;

  // User unliking a video
  let undisliked = await Like.findOneAndDelete({
    dislikedBy: user._id,
    video: videoId,
  });

  if (undisliked) {
    res
      .status(200)
      .json(
        new ApiResponse(200, { undisliked }, "Video undisliked successfully")
      );
  } else {
    // User liking a video
    let dislike = await Like.create({
      video: videoId,
      dislikedBy: user?._id,
    });

    if (dislike) {
      res
        .status(200)
        .json(new ApiResponse(200, { dislike }, "Video disliked successfully"));
    } else {
      throw new ApiError(403, "You don't have permission to like this video");
    }
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const user = req.user;

  // User unliking a comment
  let unlike = await Like.findOneAndDelete({
    likedBy: user._id,
    comment: commentId,
  });

  if (unlike) {
    res
      .status(200)
      .json(new ApiResponse(200, { unlike }, "Comment unliked successfully"));
  } else {
    // User liking a comment
    let like = await Like.create({
      comment: commentId,
      likedBy: user?._id,
    });

    if (like) {
      res
        .status(200)
        .json(new ApiResponse(200, { like }, "comment liked successfully"));
    } else {
      throw new ApiError(404, "You can't like this comment");
    }
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const user = req.user;

  // User unliking a Tweet
  let unlike = await Like.findOneAndDelete({
    tweet: tweetId,
    likedBy: user._id,
  });

  if (unlike) {
    res
      .status(200)
      .json(new ApiResponse(200, { unlike }, "Tweet unliked successfully"));
  } else {
    // User liking a Tweet
    let like = await Like.create({
      tweet: tweetId,
      likedBy: user?._id,
    });

    if (like) {
      res
        .status(200)
        .json(new ApiResponse(200, { like }, "Tweet liked successfully"));
    } else {
      throw new ApiError(404, "You can't like this Tweet");
    }
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  let user = req.user;

  let likedVideos = await Like.aggregate([
    {
      $match: { video: { $exists: true }, likedBy: user._id },
    },
    {
      $lookup: {
        from: "videos", // Assuming videos are stored in a "videos" collection
        localField: "video",
        foreignField: "_id",
        as: "videoData",
      },
    },
    { $unwind: "$videoData" },
    {
      $lookup: {
        from: "users",
        localField: "videoData.owner", // Correct field for referencing owner in the video document
        foreignField: "_id",
        as: "videoData.ownerData",
      },
    },
    {
      $unwind: "$videoData.ownerData", // Optional, if you want to flatten the owner data
    },
  ]);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { likedVideos },
        "Successfully fetched all liked videos"
      )
    );
});

export {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoDislike,
  toggleVideoLike,
  getLikedVideos,
};
