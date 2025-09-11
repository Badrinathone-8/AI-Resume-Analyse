// backend/app.js
import dotenv from "dotenv";
dotenv.config(); // make sure env is loaded before other code that uses process.env

import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import mainRouter from "./routes/mainRouter.js";

const app = express();
const PORT = process.env.PORT || 9000;

const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://resumechecker-badr.onrender.com/" // production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // serve uploaded files

app.use("/", mainRouter);

app.get("/", (req, res) => res.send("AI Resume Checker backend running"));

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { });
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server", err);
    process.exit(1);
  }
}

start();
