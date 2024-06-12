import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Like } from "../models/like.model.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query,
    sortBy,
    sortType = "desc",
    userId,
    duration,
    uploadDate,
  } = req.query;

  // Construct the base query
  const baseQuery = {};

  // Apply search query if provided
  if (query) {
    baseQuery.title = { $regex: query, $options: "i" };
  }

  // Apply user ID query if provided
  if (userId) {
    baseQuery.owner = userId;
  }

  // Apply duration filter if provided
  let durationQuery = {};
  if (duration) {
    if (duration === "Under 4 minutes") {
      durationQuery.duration = { $lt: 240 };
    } else if (duration === "4–20 minutes") {
      durationQuery.duration = { $gte: 240, $lt: 1200 };
    } else if (duration === "Over 20 minutes") {
      durationQuery.duration = { $gte: 1200 };
    }
  }

  // Apply upload date filter if provided
  let uploadDateQuery = {};
  if (uploadDate) {
    const today = new Date();
    if (uploadDate === "Last hour") {
      uploadDateQuery.createdAt = { $gte: new Date(today - 3600000) };
    } else if (uploadDate === "Today") {
      uploadDateQuery.createdAt = {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
      };
    } else if (uploadDate === "This week") {
      const firstDayOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      uploadDateQuery.createdAt = { $gte: firstDayOfWeek };
    } else if (uploadDate === "This month") {
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      uploadDateQuery.createdAt = { $gte: firstDayOfMonth };
    } else if (uploadDate === "This year") {
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      uploadDateQuery.createdAt = { $gte: firstDayOfYear };
    }
  }

  let sortByQuery = {};
  if (sortBy) {
    if (sortBy === "Newest") {
      sortByQuery.createdAt = -1; // Sort by newest first
    } else if (sortBy === "Oldest") {
      sortByQuery.createdAt = 1; // Sort by oldest first
    } else if (sortBy === "View count") {
      sortByQuery.views = -1; // Sort by views in descending order
    } else if (sortBy === "Rating") {
      sortByQuery.totalLikes = -1; // Sort by total likes in descending order
    }
  }

  // Combine all queries
  const combinedQuery = {
    ...baseQuery,
    ...durationQuery,
    ...uploadDateQuery,
  };

  console.log("combinedQuery");
  console.log(combinedQuery);

  // Define sortOptions including sortByQuery
  const sortOptions = {
    ...sortByQuery,
    [sortBy]: sortType === "desc" ? -1 : 1,
  };

  // Find videos based on the combined query
  let videos = await Video.aggregate([
    {
      $match: combinedQuery,
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likesDetails",
      },
    },
    {
      $addFields: {
        totalLikes: { $size: "$likesDetails" },
      },
    },
    {
      $sort: sortOptions, // Use sortOptions here
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: Number(limit),
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
      },
    },
    {
      $addFields: {
        ownerDetails: { $arrayElemAt: ["$ownerDetails", 0] },
      },
    },
    {
      $project: {
        likesDetails: 0,
        __v: 0,
        owner: 0,
        "ownerDetails.videos": 0,
        "ownerDetails.coverImage": 0,
        "ownerDetails.watchHistory": 0,
        "ownerDetails.password": 0,
        "ownerDetails.createdAt": 0,
        "ownerDetails.updatedAt": 0,
        "ownerDetails._id": 0,
        "ownerDetails.email": 0,
        "ownerDetails.fullName": 0,
        "ownerDetails.__v": 0,
        "ownerDetails.refreshToken": 0,
      },
    },
  ]);

  // Return response
  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  // Get title and description
  const { title, description } = req.body;

  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(401, "Title and Description is required");
  }

  // Get video file
  const videoFilePath = req.files?.videoFile[0]?.path;
  if (!videoFilePath) {
    throw new ApiError(400, "Video is required");
  }

  // Get thumbnail file
  const thumbnailPath = req.files?.thumbnail[0]?.path;
  if (!thumbnailPath) {
    throw new ApiError(400, "Thumbnail is required");
  }

  // Upload video file to Cloudinary
  let videoFile = await uploadOnCloudinary(videoFilePath, {
    resource_type: "video",
  });
  if (!videoFile.url) {
    throw new ApiError(400, "Video File is required");
  }

  // Upload thumbnail file to Cloudinary
  let thumbnail = await uploadOnCloudinary(thumbnailPath);
  if (!thumbnail) {
    throw new ApiError(400, "Thumbnail is required");
  }

  const user = req.user;

  // Create video document
  const uploadedVideo = await Video.create({
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    title: title,
    description: description,
    duration: videoFile.duration,
    owner: user._id,
  });

  if (!uploadedVideo) {
    throw new ApiError(500, "Something went wrong while uploading the video");
  }

  // Connect video to the user
  await User.updateOne(
    { _id: user._id },
    { $push: { videos: uploadedVideo._id } }
  );

  // store response in variable
  const userProfile = await User.findOne({ _id: user._id }).populate("videos");

  // return response
  return res
    .status(201)
    .json(
      new ApiResponse(200, { user: userProfile }, "Video uploaded successfully")
    );
});

const getUserVideos = asyncHandler(async (req, res) => {
  let { userId } = req.params;
  let user = await User.findById({ _id: userId });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const videos = await Video.find({
    owner: user._id,
  });

  res
    .status(200)
    .json(new ApiResponse(200, { videos }, "Videos found Successfully"));
});

const getUserWatchedVideos = asyncHandler(async (req, res) => {
  let user = req.user;

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  let videos = user.watchHistory.populate();
  console.log(videos);
  res
    .status(200)
    .json(new ApiResponse(200, { videos }, "Videos found Successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  // Get video
  let video = await Video.findOne({
    _id: new mongoose.Types.ObjectId(videoId), // Ensure videoId is converted to ObjectId
  });

  // Check if video exists
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  // Start a timer to update watch history and increase view count after 4 seconds
  setTimeout(async () => {
    // Check if the user is authenticated and the video is not in their watch history
    if (req.user && !req.user.watchHistory.includes(videoId)) {
      // Update user's watch history
      req.user.watchHistory.push(videoId);
      await req.user.save();

      // Increase the view count of the video
      video.views += 1;
      await video.save();
    }
  }, 4000);

  // Get video reactions
  let videoReactions = await Like.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
  ]);

  // Check if user is subscribed to the channel
  let isSubscribed = await Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(req.user._id),
        channel: new mongoose.Types.ObjectId(video.owner),
      },
    },
  ]);

  // Get user
  let user = await User.aggregate([
    {
      $match: {
        _id: video.owner,
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscriberCount",
      },
    },
    {
      $addFields: {
        subscriberCount: { $size: "$subscriberCount" },
        videos: video,
        videoReactions: videoReactions,
        isSubscribed: isSubscribed,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Video Found Successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  // Get video
  let videoToUpdate = await Video.findById(videoId);

  if (!videoToUpdate) {
    throw new ApiError(404, "Video not found to update");
  }

  // Get title or description
  const { title, description } = req.body;

  // check if something is updated or not if not return res
  if (!req.file && title.trim() === "" && description.trim() === "") {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          {},
          "At least one field (title, description, or file) should be updated"
        )
      );
  }

  // Update the fields if updated by the user
  if (title.trim() !== "") {
    videoToUpdate.title = title;
  }

  if (description.trim() !== "") {
    videoToUpdate.description = description;
  }

  if (req.file && req.file.path) {
    let thumbnail = req.file.path;
    let uploadedThumbnail = await uploadOnCloudinary(thumbnail);
    // console.log(uploadedThumbnail)
    videoToUpdate.thumbnail = uploadedThumbnail.url;
  }

  // save changes in the document
  await videoToUpdate.save();

  // return res
  return res
    .status(200)
    .json(new ApiResponse(200, videoToUpdate, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  // Get the video and delete it
  const deletedVideo = await Video.deleteOne({ _id: videoId });

  // console.log(deleteVideo);

  if (deletedVideo.deletedCount === 0) {
    throw new ApiError(404, "Video not found to delete");
  }

  // Return res
  return res
    .status(200)
    .json(new ApiResponse(200, deletedVideo, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  // get video
  const existingVideo = await Video.findById(videoId);
  if (!existingVideo) {
    throw new ApiError(404, "Video not found to update public state");
  }

  // Toggle isPublished
  existingVideo.isPublished = !existingVideo.isPublished;

  // save changes
  const updatedVideo = await existingVideo.save();

  // return res
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedVideo,
        "Video public status changed successfully"
      )
    );
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  getUserVideos,
  updateVideo,
  deleteVideo,
  getUserWatchedVideos,
  togglePublishStatus,
};
