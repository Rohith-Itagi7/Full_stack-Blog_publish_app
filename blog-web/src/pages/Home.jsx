
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { getAllBlogsAPI, searchBlogsAPI } from "../features/blog/blogAPI";
// // import "../styles/home.scss";

// // export default function Home() {
// //   const [blogs, setBlogs] = useState([]); // always array
// //   const [query, setQuery] = useState("");
// //   const navigate = useNavigate();

// //   // Load all blogs initially
// //   useEffect(() => {
// //     fetchAllBlogs();
// //   }, []);

// //   const fetchAllBlogs = async () => {
// //     try {
// //       const res = await getAllBlogsAPI();
// //       setBlogs(res?.blogs || []);
// //     } catch (err) {
// //       console.error(err);
// //       setBlogs([]);
// //     }
// //   };

// //   // 🔍 Search handler
// //   const handleSearch = async (e) => {
// //     const value = e.target.value;
// //     setQuery(value);

// //     if (!value.trim()) {
// //       fetchAllBlogs();
// //       return;
// //     }

// //     try {
// //       const res = await searchBlogsAPI(value);
// //       setBlogs(Array.isArray(res) ? res : []);
// //     } catch (err) {
// //       console.error(err);
// //       setBlogs([]);
// //     }
// //   };

// //   return (
// //     <div className="home-container">
// //       {/* ===== TOP BAR ===== */}
// //       <div className="home-top">
// //         <h1>All Blogs</h1>

// //         <button
// //           className="create-btn"
// //           onClick={() => navigate("/create-blog")}
// //         >
// //           ✍️ Create Blog
// //         </button>
// //       </div>

// //       {/* ===== SEARCH ===== */}
// //       <div className="search-bar">
// //         <input
// //           type="text"
// //           placeholder="Search blogs..."
// //           value={query}
// //           onChange={handleSearch}
// //         />
// //         <button className="search-btn">🔍</button>
// //       </div>

// //       {/* ===== BLOG LIST ===== */}
// //       <div className="blog-list">
// //         {blogs.length === 0 && (
// //           <p className="empty">No blogs found</p>
// //         )}

// //         {blogs.map((blog) => (
// //           <div
// //             key={blog._id}
// //             className="blog-card"
// //             onClick={() => navigate(`/blogs/${blog._id}`)}
// //           >
// //             <h2>{blog.title}</h2>

// //             <p className="excerpt">
// //               {blog.content?.slice(0, 120)}...
// //             </p>

// //             <div className="meta">
// //               By {blog.author?.name} •{" "}
// //               {new Date(blog.createdAt).toDateString()}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { getAllBlogsAPI, searchBlogsAPI } from "../features/blog/blogAPI";
// // import "../styles/home.scss";

// // export default function Home() {
// //   const [blogs, setBlogs] = useState([]);
// //   const [query, setQuery] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchAllBlogs();
// //   }, []);

// //   const fetchAllBlogs = async () => {
// //     try {
// //       const res = await getAllBlogsAPI();
// //       setBlogs(res?.blogs || []);
// //     } catch (err) {
// //       console.error(err);
// //       setBlogs([]);
// //     }
// //   };

// //   const handleSearch = async (e) => {
// //     const value = e.target.value;
// //     setQuery(value);

// //     if (!value.trim()) {
// //       fetchAllBlogs();
// //       return;
// //     }

// //     try {
// //       const res = await searchBlogsAPI(value);
// //       setBlogs(res?.blogs || []);
// //     } catch (err) {
// //       console.error(err);
// //       setBlogs([]);
// //     }
// //   };

// //   return (
// //     <div className="home-container">
// //       {/* ===== HEADER ===== */}
// //       <div className="home-header">
// //         <h1>All Blogs</h1>

// //         <button
// //           className="create-blog-btn"
// //           onClick={() => navigate("/create-blog")}
// //         >
// //           Create Blog ✍️
// //         </button>
// //       </div>

// //       {/* ===== SEARCH ===== */}
// //       <div className="search-wrapper">
// //         <input
// //           type="text"
// //           placeholder="Search blogs..."
// //           value={query}
// //           onChange={handleSearch}
// //         />
// //       </div>

// //       {/* ===== BLOG LIST ===== */}
// //       <div className="blog-list">
// //         {blogs.length === 0 && (
// //           <p className="empty">No blogs found</p>
// //         )}

// //         {blogs.map((blog) => (
// //           <div
// //             key={blog._id}
// //             className="blog-card"
// //             onClick={() => navigate(`/blogs/${blog._id}`)}
// //           >
// //             <img
// //               src={
// //                 blog.image ||
// //                 "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
// //               }
// //               alt={blog.title}
// //             />

// //             <div className="blog-info">
// //               <h2>{blog.title}</h2>

// //               <p>
// //                 {blog.content?.replace(/[#*_]/g, "").slice(0, 110)}...
// //               </p>

// //               <span>
// //                 By {blog.author?.name} ·{" "}
// //                 {new Date(blog.createdAt).toDateString()}
// //               </span>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllBlogsAPI, searchBlogsAPI } from "../features/blog/blogAPI";
// import "../styles/home.scss";

// export default function Home() {
//   const [blogs, setBlogs] = useState([]);
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAllBlogs();
//   }, []);

//   const fetchAllBlogs = async () => {
//     try {
//       const res = await getAllBlogsAPI();
//       setBlogs(res?.blogs || []);
//     } catch (err) {
//       console.error(err);
//       setBlogs([]);
//     }
//   };

//   const handleSearch = async (e) => {
//     const value = e.target.value;
//     setQuery(value);

//     if (!value.trim()) {
//       fetchAllBlogs();
//       return;
//     }

//     try {
//       const res = await searchBlogsAPI(value);
//       setBlogs(res?.blogs || []);
//     } catch (err) {
//       console.error(err);
//       setBlogs([]);
//     }
//   };

//   return (
//     <div className="home-container">
//       {/* ===== HEADER ===== */}
//       <div className="home-header">
//         <h1>All Blogs</h1>

//         <button
//           className="create-blog-btn"
//           onClick={() => navigate("/create-blog")}
//         >
//           ✍️ Create Blog
//         </button>
//       </div>

//       {/* ===== SEARCH ===== */}
//       <div className="search-wrapper">
//         <input
//           type="text"
//           placeholder="Search blogs..."
//           value={query}
//           onChange={handleSearch}
//         />
//       </div>

//       {/* ===== BLOG LIST ===== */}
//       <div className="blog-list">
//         {blogs.length === 0 && (
//           <p className="empty">No blogs found</p>
//         )}

//         {blogs.map((blog) => {
//           // 🔥 SMART UNSPLASH IMAGE (by title)
//           const smartImage = blog.image
//             ? blog.image
//             : `https://source.unsplash.com/600x400/?${encodeURIComponent(
//                 blog.title
//               )}`;

//           return (
//             <div
//               key={blog._id}
//               className="blog-card"
//               onClick={() => navigate(`/blogs/${blog._id}`)}
//             >
//               <img src={smartImage} alt={blog.title} />

//               <div className="blog-info">
//                 <h2>{blog.title}</h2>

//                 <p>
//                   {blog.content
//                     ?.replace(/[#*_]/g, "")
//                     .slice(0, 110)}
//                   ...
//                 </p>

//                 <span>
//                   By {blog.author?.name} ·{" "}
//                   {new Date(blog.createdAt).toDateString()}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBlogsAPI, searchBlogsAPI } from "../features/blog/blogAPI";
import "../styles/home.scss";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    try {
      const res = await getAllBlogsAPI();
      setBlogs(res?.blogs || []);
    } catch (err) {
      console.error(err);
      setBlogs([]);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      fetchAllBlogs();
      return;
    }

    try {
      const res = await searchBlogsAPI(value);
      setBlogs(res?.blogs || []);
    } catch (err) {
      console.error(err);
      setBlogs([]);
    }
  };

  return (
    <div className="home-container">
      {/* ===== HEADER ===== */}
      <div className="home-header">
        <h1>All Blogs</h1>

        <button
          className="create-blog-btn"
          onClick={() => navigate("/create-blog")}
        >
          ✍️ Create Blog
        </button>
      </div>

      {/* ===== SEARCH ===== */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search blogs..."
          value={query}
          onChange={handleSearch}
        />
      </div>

      {/* ===== BLOG LIST ===== */}
      <div className="blog-list">
        {blogs.length === 0 && <p className="empty">No blogs found</p>}

        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="blog-card"
            onClick={() => navigate(`/blogs/${blog._id}`)}
          >
            <div className="blog-info">
              <h2>{blog.title}</h2>

              <p>
                {blog.content
                  ?.replace(/[#*_]/g, "")
                  .slice(0, 110)}
                ...
              </p>

              <span>
                By {blog.author?.name} ·{" "}
                {new Date(blog.createdAt).toDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
