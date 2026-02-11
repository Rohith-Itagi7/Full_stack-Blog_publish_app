import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  searchBlogs,
  toggleLikeBlog,
  toggleBookmarkBlog,
  addComment,
  deleteComment,
} from "../controllers/blog.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/* ======================
   PUBLIC ROUTES
====================== */

// Search blogs
router.get("/search", searchBlogs);

// Get single blog (optional: can also protect later)
router.get("/:id", authMiddleware, getBlogById);
/* ======================
   PROTECTED ROUTES
====================== */

// ✅ Get all blogs WITH like status
router.get("/", authMiddleware, getAllBlogs);

// Create blog
router.post("/", authMiddleware, createBlog);

// Update blog
router.put("/:id", authMiddleware, updateBlog);

// Delete blog
router.delete("/:id", authMiddleware, deleteBlog);

// Like / Unlike blog
router.put("/:id/like", authMiddleware, toggleLikeBlog);

// Bookmark blog
router.put("/:id/bookmark", authMiddleware, toggleBookmarkBlog);

// Add comment
router.post("/:id/comment", authMiddleware, addComment);

// Delete comment
router.delete(
  "/:blogId/comment/:commentId",
  authMiddleware,
  deleteComment
);

export default router;
