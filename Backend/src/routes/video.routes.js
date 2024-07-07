import { Router } from "express";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  getUserVideos,
  togglePublishStatus,
  updateVideo,
  getUserWatchedVideos,
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Routes accessible without login
router.get("/", getAllVideos);
router.get("/:videoId", getVideoById);

// Routes that require JWT verification
router.use(verifyJWT);

// Routes accessible after login
router.post(
  "/",
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);

router.get("/c/:userId", getUserVideos);
router.get("/history", getUserWatchedVideos);
router.delete("/:videoId", deleteVideo);
router.patch("/:videoId", upload.single("thumbnail"), updateVideo);
router.patch("/toggle/publish/:videoId", togglePublishStatus);

export default router;
