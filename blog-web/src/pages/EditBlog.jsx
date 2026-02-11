import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchSingleBlog } from "../features/blog/blogSlice";
import { updateBlogAPI } from "../features/blog/blogAPI";
import "../styles/EditBlog.scss";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blog = useSelector((s) => s.blogs.singleBlog);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(fetchSingleBlog(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [blog]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateBlogAPI({
      id,
      data: { title, content },
    });

    navigate(`/blogs/${id}`);
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="edit-blog">
      <h2>Edit Blog</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
        />

        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}
