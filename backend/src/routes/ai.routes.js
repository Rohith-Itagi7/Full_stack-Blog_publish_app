import express from "express";
import { aiPreview } from "../controllers/ai.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// AI Preview (protected)
router.post("/preview", authMiddleware, aiPreview);

export default router;
