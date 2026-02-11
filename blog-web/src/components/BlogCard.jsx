import { useNavigate } from "react-router-dom";
import "../styles/BlogCard.scss";

export default function BlogCard({ blog }) {
  const navigate = useNavigate();

  return (
    <div className="blog-card" onClick={() => navigate(`/blogs/${blog._id}`)}>
      <img src={blog.image} alt={blog.title} />

      <div className="blog-content">
        <h3>{blog.title}</h3>
        <p>{blog.content.slice(0, 100)}...</p>

        <span className="meta">
          By {blog.author.name} ·{" "}
          {new Date(blog.createdAt).toDateString()}
        </span>
      </div>
    </div>
  );
}
