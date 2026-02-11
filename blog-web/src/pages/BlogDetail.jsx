
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/BlogDetail.scss";
import {
  fetchSingleBlog,
  clearSingleBlog,
  toggleLikeLocal,
  toggleBookmarkLocal,
  addComment,
  removeComment,
} from "../features/blog/blogSlice";

import {
  toggleLikeAPI,
  toggleBookmarkAPI,
  addCommentAPI,
  deleteCommentAPI,
  deleteBlogAPI,
} from "../features/blog/blogAPI";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleBlog: blog, loading } = useSelector((s) => s.blogs);
  const userId = useSelector((s) => s.auth.user?.id);

  const [commentText, setCommentText] = useState("");

  // normalize logged-in user id
  const loggedInUserId =
    typeof userId === "string" ? userId : userId?._id;

  useEffect(() => {
    dispatch(fetchSingleBlog(id));
    return () => dispatch(clearSingleBlog());
  }, [id, dispatch]);

  if (loading || !blog) return <p>Loading...</p>;

  // normalize blog author id
  const blogAuthorId =
    typeof blog.author === "string"
      ? blog.author
      : blog.author?._id;

  console.log("LOGGED IN:", loggedInUserId);
  console.log("BLOG AUTHOR:", blogAuthorId);

  /* ❤️ LIKE */
  const handleLike = async () => {
    try {
      const res = await toggleLikeAPI(blog._id);
      dispatch(toggleLikeLocal(res));
    } catch (err) {
      console.error(err);
    }
  };

  /* 🔖 BOOKMARK */
  const handleBookmark = async () => {
    try {
      const res = await toggleBookmarkAPI(blog._id);
      dispatch(toggleBookmarkLocal(res.bookmarks));
    } catch (err) {
      console.error(err);
    }
  };

  /* ✏️ EDIT BLOG */
  const handleEditBlog = () => {
    navigate(`/blogs/${blog._id}/edit`, {
      state: { blog },
    });
  };

  /* 🗑 DELETE BLOG */
  const handleDeleteBlog = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await deleteBlogAPI(blog._id);
      navigate("/Home");
    } catch (err) {
      console.error("Delete blog failed:", err);
    }
  };

  /* 💬 ADD COMMENT */
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await addCommentAPI(blog._id, commentText.trim());
      dispatch(addComment(res.comments));
      setCommentText("");
    } catch (err) {
      console.error("Add comment failed:", err);
    }
  };

  /* 🗑 DELETE COMMENT */
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteCommentAPI(blog._id, commentId);
      dispatch(removeComment(commentId));
    } catch (err) {
      console.error("Delete comment failed:", err);
    }
  };

  const isBookmarked =
    blog.bookmarks && loggedInUserId
      ? blog.bookmarks.includes(loggedInUserId)
      : false;

  return (
  <div className="blog-detail">
    {/* ===== HEADER ===== */}
    <div className="blog-header">
      <div>
        <h1>{blog.title}</h1>
        <p className="author">By {blog.author?.name}</p>
      </div>

      {/* ===== TOP RIGHT ACTIONS ===== */}
      <div className="top-actions">
        <button className="icon-btn" onClick={handleLike}>
          {blog.isLiked ? "❤️" : "🤍"} {blog.likes.length}
        </button>

        <button
          className={`icon-btn ${isBookmarked ? "active" : ""}`}
          onClick={handleBookmark}
        >
          🔖
        </button>

        {blogAuthorId === loggedInUserId && (
          <>
            <button className="icon-btn" onClick={handleEditBlog}>
              ✏️
            </button>

            <button className="icon-btn danger" onClick={handleDeleteBlog}>
              🗑
            </button>
          </>
        )}
      </div>
    </div>

    {/* ===== CONTENT ===== */}
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: blog.content }}
    />

    {/* ===== COMMENTS ===== */}
    <hr />
    <h3>Comments</h3>

    <form onSubmit={handleAddComment} className="comment-form">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        required
      />
      <button type="submit" className="black-btn">
        Post Comment
      </button>
    </form>

    <div className="comments">
      {blog.comments?.length === 0 && <p>No comments yet</p>}

      {blog.comments?.map((comment) => {
        const commentUserId =
          typeof comment.user === "string"
            ? comment.user
            : comment.user?._id;

        return (
          <div key={comment._id} className="comment">
            <p>{comment.text}</p>
            <small>
              {new Date(comment.createdAt).toLocaleString()}
            </small>

            {commentUserId === loggedInUserId && (
              <button
                className="black-btn small"
                onClick={() => handleDeleteComment(comment._id)}
              >
                🗑 Delete
              </button>
            )}
          </div>
        );
      })}
    </div>
  </div>
  );
}