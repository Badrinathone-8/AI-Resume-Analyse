// backend/routes/resumeRouter.js
import express from "express";
import multer from "multer";
//import { analyzeResumeFromFile } from "../controllers/aiController.js";
import Resume from "../models/resumeModel.js";
import {addResume,upload} from "../controllers/resumeController.js"
const router = express.Router();



router.post("/upload", upload.single("resume"), addResume);

export default router;