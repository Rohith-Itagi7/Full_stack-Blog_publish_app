import express from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// 👤 View any user's profile
router.get("/:userId", auth, getProfile);

// ✏️ Update own profile
router.put("/", auth, updateProfile);

export default router;
