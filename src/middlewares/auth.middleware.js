import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { userModel } from "../models/userModel.js";

export const verifyJWT = asyncHandler(
  async (req, _ /* we can change res to _ if not being used*/, next) => {
    try {
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
      console.log(token);
      if (!token) {
        throw new ApiError(401, "Unauthorized request");
      }

      const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await userModel
        .findById(decodedUser?._id)
        .select("-password -refreshToken");

      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }

      req.body = user;
      next();
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid access token");
    }
  }
);
