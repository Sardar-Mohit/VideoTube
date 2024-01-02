import { userModel } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details ✅
  // vaidation - not empty ✅
  // check if user already exists : username , email ✅
  // check for images, check for avatar ✅
  // upload them to cloudinary, avatar ✅
  // create user object create entry in the db ✅
  // remove password and refresh token field from the response ✅
  // check for user creation ✅
  // return response ✅

  // get user details ✅
  const { fullname, username, password, email } = req.body;

  // vaidation - not empty ✅
  if (
    [fullname, username, password, email].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All the fields are required");
  }

  // check if user already exists : username , email ✅
  const existedUser = userModel.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (existedUser) {
    throw new ApiError(
      409,
      "User already exists with the same email or username"
    );
  }

  // check for images, check for avatar ✅
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImageLocalPath[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  // upload them to cloudinary, avatar ✅
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  console.log(req.files);

  // create user object create entry in the db
  const user = await userModel.create({
    username: username.toLowerCase(),
    fullname,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  // remove password and refresh token field from the response ✅
  const createdUser = await userModel
    .findById(user._id)
    .select("-password -refreshToken");

  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while regietering the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Successfully Created"));
});

export { registerUser };
