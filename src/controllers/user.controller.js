import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler((req, res) => {
  res.send(200).json({ message: "done" });
});

export { registerUser };
