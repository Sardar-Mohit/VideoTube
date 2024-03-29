import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  let playlist = await Playlist.create({
    name: name,
    description: description,
    owner: req.user?._id,
  });
  if (!playlist) {
    throw new ApiError(400, "Error occured while creating the playlist");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { playlist }, "playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  let userPlaylists = await Playlist.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "videos", // Assuming the name of the videos collection is "videos"
        localField: "videos",
        foreignField: "_id",
        as: "videoDetails",
      },
    },
    {
      $addFields: {
        totalViews: { $sum: "$videoDetails.views" },
      },
    },
  ]);

  if (!userPlaylists) {
    throw new ApiError(404, "User playlist not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { userPlaylists }, "playlist fetched successfully")
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  let getPlaylistData = await Playlist.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(playlistId) },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videoDetails",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerData",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "owner",
        foreignField: "channel",
        as: "subscribersCount",
      },
    },
    {
      $addFields: {
        totalViews: { $sum: "$videoDetails.views" },
        subscribersCount: { $sum: "$subscribersCount" },
        ownerData: {
          $map: {
            input: "$ownerData",
            as: "ownerData",
            in: {
              name: "$$ownerData.username",
              avatar: "$$ownerData.avatar",
            },
          },
        },
      },
    },
  ]);

  if (!getPlaylistData) {
    throw new ApiError(404, "Playlist not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, { getPlaylistData }, "playlist fetched successfully")
    );
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { videoId, playlistId } = req.params;

  // Get playlist
  let playlist = await Playlist.findById({
    _id: new mongoose.Types.ObjectId(playlistId),
  });

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  // Get video
  let videoToAdd = await Video.findById({ _id: videoId });
  if (!videoToAdd) {
    throw new ApiError(404, "Video not found to add to playlist");
  }

  // check if video is already present
  let isVideoAlreadyInPlaylist = await playlist.videos.some(
    (video) => video.toString() == videoId
  );
  if (isVideoAlreadyInPlaylist) {
    throw new ApiError(400, "Video is already in the playlist");
  }

  // Update playlist
  let playlistToAddVideoIn = await Playlist.findByIdAndUpdate(
    { _id: playlistId },
    { $push: { videos: videoToAdd } },
    { new: true }
  );
  if (!playlistToAddVideoIn) {
    throw new ApiError(404, "Playlist not found to add to video");
  }

  // send response
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { playlistToAddVideoIn },
        "Video successfully added to the Playlist"
      )
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  let playlistBeforeUpdate = await Playlist.findById(playlistId);
  // Error if video not present
  if (!playlistBeforeUpdate.videos.includes(videoId)) {
    throw new ApiError(400, "Video not found in the playlist");
  }

  // Get playlist
  let playlist = await Playlist.findByIdAndUpdate(
    { _id: playlistId },
    { $pull: { videos: videoId } },
    { new: true }
  );
  if (!playlist) {
    throw new ApiError(404, "Playlist not found to delete video");
  }

  // send response
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { playlist },
        "Video successfully removed from the playlist"
      )
    );
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  let getPlaylistsToDelete = await Playlist.findByIdAndDelete({
    _id: playlistId,
  });
  if (!getPlaylistsToDelete) {
    throw new ApiError(404, "Playlist not found to delete");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { getPlaylistsToDelete },
        "playlist deleted successfully"
      )
    );
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;

  let PlaylistsToUpdate = await Playlist.findById({ _id: playlistId });
  if (!PlaylistsToUpdate) {
    throw new ApiError(404, "Playlist not found to update");
  }

  // Check if both name and description are empty
  const trimmedName = name.trim();
  const trimmedDescription = description.trim();

  if (!trimmedName && !trimmedDescription) {
    throw new ApiError(
      400,
      "Playlist name and description both can't be empty"
    );
  }

  // Check if both name and description are unchanged
  if (
    trimmedName === PlaylistsToUpdate.name.trim() &&
    trimmedDescription === PlaylistsToUpdate.description.trim()
  ) {
    throw new ApiError(400, "Playlist name and description are unchanged");
  }

  // Check and update name if it is not empty and different
  if (trimmedName !== "" && trimmedName !== PlaylistsToUpdate.name.trim()) {
    PlaylistsToUpdate.name = name;
  }

  // Check and update description if it is not empty and different
  if (
    trimmedDescription !== "" &&
    trimmedDescription !== PlaylistsToUpdate.description.trim()
  ) {
    PlaylistsToUpdate.description = description;
  }

  PlaylistsToUpdate.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { PlaylistsToUpdate },
        "Playlist updated successfully"
      )
    );
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
