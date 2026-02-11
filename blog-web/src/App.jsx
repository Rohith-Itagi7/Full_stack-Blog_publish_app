// // import { Routes, Route } from "react-router-dom";
// // import Home from "./pages/Home";
// // import Login from "./pages/Login";
// // import BlogDetail from "./pages/BlogDetail";
// // import ProtectedRoute from "./routes/ProtectedRoute";
// // import EditBlog from "./pages/EditBlog";
// // import CreateBlog from "./pages/CreateBlog";
// // import landingPage from "./pages/landingpage";



// // export default function App() {
// //   return (
// //     <Routes>
// //       {/* Public route */}
// //       <Route path="/login" element={<Login />} />
// //       <Route path="/blogs/:id/edit" element={<EditBlog />} />
// //       <Route path="/create-blog" element={<CreateBlog />} />
// //       <Route path="/blogs/:id" element={<BlogDetail />} />
      


// //       {/* Protected routes */}
// //       <Route
// //         path="/"
// //         element={
// //           <ProtectedRoute>
// //             <Home />
// //           </ProtectedRoute>
// //         }
// //       />
      
// //       <Route
// //         path="/blogs/:id"
// //         element={
// //           <ProtectedRoute>
// //             <BlogDetail />
// //           </ProtectedRoute>
// //         }
// //       />
// //     </Routes>
// //   );
// // }
// import { Routes, Route } from "react-router-dom";

// import Landing from "./pages/Landing";
// import Story from "./pages/Story";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import Profile from "./pages/Profile";
// import Navbar from "./components/Navbar";
// import BlogDetail from "./pages/BlogDetail";
// import EditBlog from "./pages/EditBlog";
// import CreateBlog from "./pages/CreateBlog";

// import ProtectedRoute from "./routes/ProtectedRoute";

// export default function App() {
//   return (
//     <Routes>
//       {/* 🌍 Public routes */}
//       <Route path="/" element={<Landing />} />
//       <Route path="/our-story" element={<Story />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/blogs/:id" element={<BlogDetail />} />

//       {/* 🔐 Protected routes */}
//       <Route
//         path="/home"
//         element={
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/create-blog"
//         element={
//           <ProtectedRoute>
//             <CreateBlog />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/blogs/:id/edit"
//         element={
//           <ProtectedRoute>
//             <EditBlog />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }
// import { Routes, Route } from "react-router-dom";

// import Landing from "./pages/Landing";
// import Story from "./pages/Story";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import Profile from "./pages/Profile";
// import BlogDetail from "./pages/BlogDetail";
// import EditBlog from "./pages/EditBlog";
// import CreateBlog from "./pages/CreateBlog";

// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./routes/ProtectedRoute";

// export default function App() {
//   return (
//     <>
//       {/* 🔝 Navbar shows on all pages */}
//       <Navbar />

//       {/* 🧭 App routes */}
//       <Routes>
//         {/* 🌍 Public routes */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/our-story" element={<Story />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/blogs/:id" element={<BlogDetail />} />

//         {/* 🔐 Protected routes */}
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/create-blog"
//           element={
//             <ProtectedRoute>
//               <CreateBlog />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/blogs/:id/edit"
//           element={
//             <ProtectedRoute>
//               <EditBlog />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </>
//   );
// }
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Story from "./pages/Story";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BlogDetail from "./pages/BlogDetail";
import EditBlog from "./pages/EditBlog";
import CreateBlog from "./pages/CreateBlog";

import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedLayout from "./layouts/ProtectedLayout";

export default function App() {
  return (
    <Routes>
      {/* 🌍 Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/our-story" element={<Story />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blogs/:id" element={<BlogDetail />} />

      {/* 🔐 Protected routes with Navbar */}
      <Route
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blogs/:id/edit" element={<EditBlog />} />
      </Route>
    </Routes>
  );
}
