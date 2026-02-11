import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

// 👉 IMPORT PROFILE ROUTES
import profileRoutes from "./routes/profile.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect DB FIRST
connectDB();

// 👉 REGISTER PROFILE ROUTE
app.use("/api/profile", profileRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
