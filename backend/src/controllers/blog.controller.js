import Blog from "../models/Blog.js";
import User from "../models/User.js";
import { generateAIContent } from "../services/ai.service.js";

/* ==========================
   CREATE BLOG
========================== */
export const createBlog = async (req, res) => {
  try {
    const { title, content, tags, image, useAI } = req.body;

    let finalContent = content;

    if (useAI === true) {
      if (!title) {
        return res.status(400).json({
          message: "Title is required for AI-generated blog",
        });
      }

      finalContent = await generateAIContent(
        `Write a detailed blog about ${title}`
      );
    }

    const blog = await Blog.create({
      author: req.user.id,
      title,
      content: finalContent,
      tags,
      image,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================
   GET ALL BLOGS
========================== */
export const getAllBlogs = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;
    const total = await Blog.countDocuments();

    const blogs = await Blog.find()
      .populate("author", "_id name email profilePic")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const userId = req.user?.id;

    const blogsWithStatus = blogs.map((blog) => {
      const blogObj = blog.toObject();

      return {
        ...blogObj,
        likesCount: blogObj.likes.length,
        isLiked: userId ? blogObj.likes.includes(userId) : false,
        isBookmarked: userId
          ? blogObj.bookmarks?.includes(userId)
          : false,
      };
    });

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      blogs: blogsWithStatus,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================
   GET SINGLE BLOG  ✅ FIXED
========================== */
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "_id name email profilePic")
      .populate("comments.user", "_id name email profilePic");

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const userId = req.user?.id;
    const blogObj = blog.toObject();

    res.json({
      ...blogObj,
      likesCount: blogObj.likes.length,
      isLiked: userId ? blogObj.likes.includes(userId) : false,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================
   UPDATE BLOG
========================== */
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    const { title, content, tags, image } = req.body;

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;
    blog.image = image || blog.image;

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================
   DELETE BLOG
========================== */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================
   SEARCH BLOGS
========================== */
export const searchBlogs = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query)
      return res.status(400).json({ message: "Query parameter is required" });

    const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    }).populate("author", "name email profilePic");

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================
   LIKE / UNLIKE BLOG  ✅ FIXED
========================== */
export const toggleLikeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const userId = req.user.id;
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes.pull(userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    res.json({
      likesCount: blog.likes.length,
      isLiked: !alreadyLiked,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================
   BOOKMARK / UNBOOKMARK
========================== */
export const toggleBookmarkBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const userId = req.user.id;
    const index = blog.bookmarks.indexOf(userId);

    if (index === -1) {
      blog.bookmarks.push(userId);
    } else {
      blog.bookmarks.splice(index, 1);
    }

    await blog.save();

    res.json({
      bookmarks: blog.bookmarks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================
   ADD COMMENT
========================== */
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ message: "Comment text is required" });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.comments.push({
      user: req.user.id,
      text,
    });

    await blog.save();

    res.status(201).json({
      message: "Comment added",
      comments: blog.comments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ==========================
   DELETE COMMENT
========================== */
export const deleteComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = blog.comments.id(req.params.commentId);
    if (!comment)
      return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    comment.deleteOne();
    await blog.save();

    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
