import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, updateProfilePic, updateProfile } from "../controllers/user.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.post("/update-profile-pic", protectRoute, upload.single("profilePic"), updateProfilePic);
router.patch("/update-profile", protectRoute, updateProfile);
export default router;
