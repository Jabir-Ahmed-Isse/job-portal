// import express from "express";
// import {
//   applyForJob,
//   getUserData,
//   getUserJobApplications,
//   updateUserResume,
// } from "../controllers/userController.js";
// import upload from "../config/multer.js";

// const router = express.Router();

// // Get user data
// router.get("/user", getUserData);

// // Apply for a job
// router.post("/apply", applyForJob);

// // get applied jobs data
// router.get("/applications", getUserJobApplications);

// // Update user profile (resume)
// router.post("update-resume", upload.single("resume"), updateUserResume);

// export default router;
// userRoutes.js
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

// Protect routes with Clerk authentication middleware
router.get("/user",requireAuth(),getUserData);

router.post("/apply",requireAuth(),applyForJob);

router.get("/applications",requireAuth(),getUserJobApplications);

// Added missing slash before update-resume and applied requireAuth middleware
router.post("/update-resume",requireAuth(),upload.single("resume"),updateUserResume);

export default router;
