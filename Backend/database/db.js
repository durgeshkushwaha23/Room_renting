import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
      autoIndex: false, // Disable automatic index creation in production
      maxPoolSize: 10, // Maintain up to 10 connections in the pool
      retryWrites: true, // Enable retryable writes
    });

    console.log("✅ MongoDB Connected Successfully");

    // Connection Events
    mongoose.connection.on("connected", () => {
      console.log("🟢 MongoDB Connection Established");
    });

    mongoose.connection.on("error", (err) => {
      console.error("🔴 MongoDB Connection Error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("🟡 MongoDB Disconnected! Reconnecting...");
      connectDB(); // Reconnect automatically
    });
  } catch (err) {
    console.log("err", err);
  }
};

export default connectDB;
