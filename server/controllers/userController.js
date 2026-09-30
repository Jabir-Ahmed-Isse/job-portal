
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

// Correct Clerk import
import { clerkClient } from "@clerk/express";

// ✅ Get User Data — create if not in DB
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.auth;

    // Check if user exists in MongoDB
    let user = await User.findById(userId);

    if (!user) {
      // Fetch from Clerk API
      const clerkUser = await clerkClient.users.getUser(userId);
      const { emailAddresses, imageUrl, firstName, lastName } = clerkUser;

      const email = emailAddresses?.[0]?.emailAddress;
      const fullName = `${firstName || ""} ${lastName || ""}`.trim();

      if (!email || !imageUrl || !fullName) {
        return res.status(400).json({ success: false, message: "Missing user data from Clerk" });
      }

      // Create new user in MongoDB
      user = await User.create({
        _id: userId,
        name: fullName,
        email,
        image: imageUrl,
      });

      console.log("✅ Created new user:", user.email);
    } else {
      console.log("✅ User exists:", user.email);
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("❌ Error in getUserData:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch or create user",
    });
  }
};

// ✅ Apply for a job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth?.userId;

  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });

    if (isAlreadyApplied.length > 0) {
      return res.status(400).json({ success: false, message: "You have already applied for this job" });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    await JobApplication.create({
      userId,
      companyId: jobData.companyId,
      jobId,
      date: Date.now()
    });

    res.json({ success: true, message: "Applied for the job successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get user's job applications
export const getUserJobApplications = async (req, res) => {
  const userId = req.auth?.userId;

  try {
    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications || applications.length === 0) {
      return res.status(404).json({ success: false, message: "No applications found" });
    }

    res.json({ success: true, applications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Upload resume
export const updateUserResume = async (req, res) => {
  const userId = req.auth?.userId;

  try {
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const resumeFile = req.file;
    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
        resource_type: "auto"
      });
      userData.resume = resumeUpload.secure_url;
      await userData.save();
      return res.json({ success: true, message: "Resume updated successfully" });
    }

    return res.status(400).json({ success: false, message: "No file uploaded" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

