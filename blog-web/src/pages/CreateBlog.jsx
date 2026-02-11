import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  createBlog,
  generateAI,
  clearAIPreview,
} from "../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";
import "../styles/CreateBlog.scss"; // make sure this is imported

export default function CreateBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const aiPreview = useSelector((s) => s.blogs.aiPreview);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mode, setMode] = useState(null); // manual | ai

  const publish = async () => {
    if (!title || !content) return alert("Title & content required");
    await dispatch(createBlog({ title, content })).unwrap();
    dispatch(clearAIPreview());
    navigate("/home");
  };

  const handleGenerateAI = async () => {
    if (!title.trim()) {
      alert("Enter title first");
      return;
    }

    try {
      const aiContent = await dispatch(generateAI(title)).unwrap();
      setContent(aiContent);
    } catch (err) {
      console.error("AI Error:", err);
      alert("AI generation failed");
    }
  };

  return (
    <div className="create-blog-page">
      {/* TITLE */}
      <h2 className="page-title">Create Blog</h2>

      {/* BLOG TITLE INPUT */}
      <input
        className="title-input"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* MODE BUTTONS */}
      <div className="mode-buttons">
        <button
          className={mode === "manual" ? "active" : ""}
          onClick={() => setMode("manual")}
        >
          Manual Writing
        </button>

        <button
          className={mode === "ai" ? "active" : ""}
          onClick={() => setMode("ai")}
        >
          Generate AI
        </button>
      </div>

      {/* CONTENT AREA */}
      {mode && (
        <>
          {mode === "ai" && (
            <button className="ai-generate-btn" onClick={handleGenerateAI}>
              Generate AI Content
            </button>
          )}

          <textarea
            className="content-box"
            rows="15"
            placeholder="Write blog content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button className="publish-btn" onClick={publish}>
            Publish Blog
          </button>
        </>
      )}
    </div>
  );
}
// export default function CreateBlog() {
//   return (
//     <div className="create-blog">
//       <h1>Create Blog</h1>
//       <p>Blog creation form coming soon 🚀</p>
//     </div>
//   );
// }
