import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
  // Connect to MongoDB Atlas
  connectDB();
});
