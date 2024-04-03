import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  let user = await User.findById({ _id: req.user?._id });

  if (!user) {
    throw new ApiError(404, "User not found while creating tweet");
  }

  let tweet = await Tweet.create({
    content: req.body.content,
    owner: user._id,
  });

  if (!tweet) {
    throw new ApiError(404, "Tweet not created");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { tweet }, "Tweet Created Successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const tweets = await Tweet.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(userId) }, // Ensure matching by ObjectId
    },
    {
      $lookup: {
        from: "users", // Assuming 'users' is the collection name for User
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
      },
    },
    {
      $lookup: {
        from: "likes", // Assuming 'likes' is the collection name for Like
        let: { tweetId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$tweet", "$$tweetId"] }],
              },
            },
          },
          {
            $count: "likesCount",
          },
        ],
        as: "likesDetails",
      },
    },
    {
      $unwind: "$ownerDetails",
    },
    {
      $addFields: {
        likesCount: {
          $ifNull: [{ $arrayElemAt: ["$likesDetails.likesCount", 0] }, 0],
        },
      },
    },
    {
      $project: {
        "ownerDetails.email": 0,
        "ownerDetails.password": 0,
        "ownerDetails.refreshToken": 0,
        "ownerDetails.videos": 0,
        "ownerDetails.watchHistory": 0,
        "ownerDetails.__v": 0,
        "ownerDetails.coverImage": 0,
        "ownerDetails.createdAt": 0,
        "ownerDetails.fullName": 0,
      },
    },
  ]);

  res
    .status(200)
    .json(new ApiResponse(200, { tweets }, "Tweets found successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  let { tweetId } = req.params;
  const tweet = await Tweet.findOne({
    _id: tweetId,
  });

  if (!tweet) {
    res
      .status(200)
      .json(new ApiResponse(200, {}, "Tweet Updated Successfully"));
  }

  let updatedTweet = await Tweet.findByIdAndUpdate(
    tweet._id,
    { content: req.body.content },
    { new: true }
  );

  if (!updatedTweet) {
    throw new ApiError(400, "Tweet is not updated");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { updatedTweet }, "Tweet Updated Successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  const deletedTweet = await Tweet.findByIdAndDelete({ _id: tweetId });

  if (!deletedTweet) {
    return res.status(404).json({ error: "Tweet not found" });
  }

  res
    .status(200)
    .json(new ApiResponse(200, { deletedTweet }, "Tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
