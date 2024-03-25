import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  let user = req.user;

  if (!user) {
    throw new ApiError(200, "User not found for Stats");
  }

  // Get subscription count
  const subscriptionStats = await Subscription.aggregate([
    {
      $match: { channel: user._id },
    },
    {
      $count: "subsCount",
    },
  ]);

  // Get total videos count
  const totalVideosCount = await Video.countDocuments({ owner: user._id });

  // Calculate total likes for the user's videos
  const totalLikes = await Video.aggregate([
    {
      $match: { owner: user._id },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "videoLikes",
      },
    },
    {
      $unwind: "$videoLikes", // Unwind the array of likes
    },
    {
      $match: { "videoLikes.likedBy": { $exists: true } }, // Filter only the liked documents
    },
    {
      $group: {
        _id: null, // Group all documents
        totalLikes: { $sum: 1 }, // Count the total likes for all videos
      },
    },
  ]);

  // Calculate total video views
  const totalVideoViews = await Video.aggregate([
    {
      $match: { owner: user._id },
    },
    {
      $group: {
        _id: null,
        totalViews: { $sum: "$views" },
      },
    },
  ]);

  // Prepare the response
  const stats = {
    subscriptionStats:
      subscriptionStats.length > 0 ? subscriptionStats[0].subsCount : 0,
    totalVideosCount,
    totalLikes: totalLikes.length > 0 ? totalLikes[0].totalLikes : 0,
    totalVideoViews:
      totalVideoViews.length > 0 ? totalVideoViews[0].totalViews : 0,
  };

  return res.status(200).json({
    success: true,
    message: "All stats fetched successfully",
    stats,
  });
});

const getChannelVideos = asyncHandler(async (req, res) => {
  let user = req.user;
  if (!user) {
    throw new ApiError(200, "User not found while getting videos");
  }

  const videos = await Video.aggregate([
    {
      $match: {
        owner: user._id,
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "videosReactions",
      },
    },
    {
      $addFields: {
        reactions: { $size: "$videosReactions" },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "All videos fetched successfully"));
});

export { getChannelStats, getChannelVideos };
