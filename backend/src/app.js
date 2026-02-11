import express from "express";
import cors from "cors";

// Routes
import profileRoutes from "./routes/profile.routes.js";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import aiRoutes from "./routes/ai.routes.js"; // ✅ fixed

const app = express();

/* ======================
   GLOBAL MIDDLEWARE
====================== */
app.use(cors());
app.use(express.json());

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (req, res) => {
  res.status(200).send("Blog Platform API is running 🚀");
});

/* ======================
   API ROUTES
====================== */
app.use("/uploads", express.static("uploads"));
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/ai", aiRoutes); // ✅ AI route mounted

/* ======================
   404 HANDLER
====================== */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ======================
   ERROR HANDLER
====================== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
