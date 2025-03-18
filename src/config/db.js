import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://chittoravaibhav70:xWs79XlbwvJejV3Y@cluster0.nfuam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
