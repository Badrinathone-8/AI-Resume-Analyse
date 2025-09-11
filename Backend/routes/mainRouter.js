// backend/routes/mainRouter.js
import express from "express";
import resumeRouter from "./resumeRouter.js";
import userController from "../controllers/userController.js"; // if you have it


const router = express.Router();

// mount resume routes under /resume -> final endpoints like /api/resume/upload
//router.use("/resume", resumeRouter);

// auth endpoints (example)
router.use(resumeRouter);
router.post("/signup", userController.signup);
router.post("/login", userController.login);

export default router;
