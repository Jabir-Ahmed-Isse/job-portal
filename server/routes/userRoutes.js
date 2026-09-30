// Job-seeker routes, mounted at /api/users. All require a Clerk session.
import express from "express";
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from "../controllers/userController.js";
import upload from "../config/multer.js";
import { requireAuth } from "@clerk/express";



const router = express.Router();

// Get (or create) the logged-in user
router.get("/user",requireAuth(),getUserData);

// Apply for a job
router.post("/apply",requireAuth(),applyForJob);

// List the user's applications
router.get("/applications",requireAuth(),getUserJobApplications);

// Upload a resume (PDF) as multipart field "resume"
router.post("/update-resume",requireAuth(),upload.single("resume"),updateUserResume);

export default router;
