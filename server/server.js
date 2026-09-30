// Express API server: connects to MongoDB and Cloudinary, mounts the company,
// job and user routes, and runs a nightly job that hides expired listings.
// Sentry must be imported first so it can instrument everything else.
import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkMiddleware } from "@clerk/express";
import { clerkwebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRouter.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Used by the nightly cron job below
import cron from "node-cron";
import Job from "./models/Job.js";

// Initialize Express
const app = express();

// Connect to the database and configure Cloudinary before accepting requests
await connectDB();
await connectCloudinary();

// Middlewares (clerkMiddleware reads the Clerk session for job-seeker routes)
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.send("API Is Working");
});

app.get("/debug-sentry", () => {
  throw new Error("My first Sentry error!");
});

app.post("/webhooks", clerkwebhooks);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

// Cron job: hide expired jobs every night at midnight
cron.schedule("0 0 * * *", async () => {
  const now = new Date();
  try {
    const result = await Job.updateMany(
      { expireDate: { $lt: now }, visible: true },
      { $set: { visible: false } }
    );
    console.log(`[CRON] Updated ${result.modifiedCount} expired jobs`);
  } catch (error) {
    console.error("[CRON] Error updating expired jobs:", error.message);
  }
});

// Report unhandled errors to Sentry (must come after all routes)
Sentry.setupExpressErrorHandler(app);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
