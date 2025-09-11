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

app.use(cors()); // you can lock this down to your frontend origin later
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
