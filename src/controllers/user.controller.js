import { userModel } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const TokenGenerator = asyncHandler(async (userId) => {
  try {
    let user = await userModel.findById({ userId });
    let accessToken = await user.generateAccessToken({ userId });
    let refreshToken = await user.generateRefreshToken({ userId });

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while creating the refresh token"
    );
  }
});

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
    [fullname, username, password, email].some(
      (field) => !field || !field.trim()
    )
  ) {
    throw new ApiError(400, "All the fields are required");
  }

  // check if user already exists : username , email ✅
  const existedUser = await userModel.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (existedUser) {
    throw new ApiError(
      409,
      "User already exists with the same email or username"
    );
  }

  // check for images, check for avatar ✅
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  // upload them to cloudinary, avatar ✅
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required ::");
  }

  // console.dir("hellp " + req.files);

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

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie
  const { username, email, password } = req.body;
  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await userModel.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  let isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = TokenGenerator(user._id);

  let userDetails = await userModel
    .findById(user._id)
    .select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {});

export { registerUser };
