
// import "./config/instrument.js";
// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./config/db.js";
// import * as Sentry from "@sentry/node";
// import { clerkMiddleware } from "@clerk/express";
// import { clerkwebhooks } from "./controllers/webhooks.js";
// import companyRoutes from "./routes/companyRouter.js";
// import connectCloudinary from "./config/cloudinary.js";
// import jobRoutes from "./routes/jobRoutes.js";
// import userRoutes from "./routes/userRoutes.js";


// const app = express();

// // ✅ Initialize Sentry (without tracing)




// // Connect to database and cloudinary
// await connectDB();
// await connectCloudinary();

// // Standard middlewares
// app.use(cors());
// app.use(express.json());

// // ✅ Clerk middleware before protected routes
// app.use(clerkMiddleware());

// // Public route
// app.get("/", (req, res) => {
//   res.send("API Is Working");
// });

// // Route to test Sentry error logging
// app.get("/debug-sentry", () => {
//   throw new Error("My first Sentry error!");
// });

// // Clerk webhook
// app.post("/webhooks", clerkwebhooks);

// // Protected API routes
// app.use("/api/company", companyRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/users", userRoutes);

// // ✅ Sentry request handler — must come early
//  Sentry.setupExpressErrorHandler(app);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });




// server.js

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

// ✅ New: Cron and Job model import
import cron from "node-cron";
import Job from "./models/Job.js";

// Initialize Express
const app = express();

// ✅ Initialize DB and Cloudinary
await connectDB();
await connectCloudinary();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// ✅ Routes
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

// ✅ Cron Job: Hide expired jobs every night at midnight
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

// ✅ Sentry error handler
Sentry.setupExpressErrorHandler(app);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
