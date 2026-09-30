// Fills the database with demo companies, jobs, users and applications.
// Safe to re-run: it only replaces data belonging to the demo companies/users.
//
// Demo company login (local development only):
//   email:    somtel@demo.test
//   password: demo1234
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import connectDB from "../config/db.js";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";

const DEMO_PASSWORD = "demo1234";
const DAY = 24 * 60 * 60 * 1000;

// Simple generated logo so the seed has no external image dependencies
const logo = (initials, color) =>
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" rx="20" fill="${color}"/><text x="48" y="60" font-family="Arial" font-size="36" font-weight="bold" fill="#fff" text-anchor="middle">${initials}</text></svg>`
  ).toString("base64");

const companies = [
  { name: "Somtel", email: "somtel@demo.test", image: logo("ST", "#0f766e") },
  { name: "Hormuud", email: "hormuud@demo.test", image: logo("HT", "#16a34a") },
  { name: "Premier Bank", email: "premier@demo.test", image: logo("PB", "#1e3a8a") },
];

const users = [
  { _id: "user_demo_amina", name: "Amina Yusuf", email: "amina@demo.test", image: logo("AY", "#db2777"), resume: "" },
  { _id: "user_demo_abdi", name: "Abdi Warsame", email: "abdi@demo.test", image: logo("AW", "#7c3aed"), resume: "" },
  { _id: "user_demo_hodan", name: "Hodan Ali", email: "hodan@demo.test", image: logo("HA", "#ea580c"), resume: "" },
];

const desc = (intro, items) =>
  `<p>${intro}</p><h3><strong>Key responsibilities</strong></h3><ul>${items
    .map((i) => `<li>${i}</li>`)
    .join("")}</ul>`;

const jobs = [
  ["Somtel", "Full Stack Developer", "Programming", "Mogadishu", "Intermediate level", "1500",
    desc("Build and maintain customer-facing web apps for our mobile services.", ["Develop React and Node.js features", "Design REST APIs", "Write tests and review code"])],
  ["Somtel", "Network Engineer", "Networking", "Bosaso", "Senior level", "2000",
    desc("Keep our 4G network fast and reliable across Puntland.", ["Monitor and optimise network performance", "Configure routers and switches", "Lead incident response"])],
  ["Hormuud", "Data Analyst", "Data Science", "Mogadishu", "Beginner level", "900",
    desc("Turn EVC Plus transaction data into insights for the business.", ["Build dashboards and reports", "Clean and model data", "Present findings to managers"])],
  ["Hormuud", "UI/UX Designer", "Designing", "Kismayo", "Intermediate level", "1200",
    desc("Design simple, accessible experiences for millions of users.", ["Create wireframes and prototypes", "Run user research", "Maintain the design system"])],
  ["Hormuud", "Cybersecurity Specialist", "Cybersecurity", "Mogadishu", "Senior level", "2500",
    desc("Protect our systems and customers from security threats.", ["Run vulnerability assessments", "Respond to incidents", "Train staff on security"])],
  ["Premier Bank", "Marketing Officer", "Marketing", "Jowhar", "Beginner level", "800",
    desc("Grow awareness of our banking products across the region.", ["Plan campaigns", "Manage social media", "Track campaign results"])],
  ["Premier Bank", "Branch Manager", "Management", "Beidoa", "Senior level", "1800",
    desc("Lead a branch team and deliver excellent customer service.", ["Manage branch staff", "Hit sales and service targets", "Ensure compliance"])],
  ["Premier Bank", "Backend Developer", "Programming", "Guriel", "Intermediate level", "1400",
    desc("Build secure services for our mobile banking platform.", ["Develop Node.js services", "Integrate payment systems", "Improve performance"])],
];

await connectDB();

const hash = await bcrypt.hash(DEMO_PASSWORD, 10);
const companyEmails = companies.map((c) => c.email);
const oldCompanies = await Company.find({ email: { $in: companyEmails } });
const oldIds = oldCompanies.map((c) => c._id);
await JobApplication.deleteMany({ companyId: { $in: oldIds } });
await Job.deleteMany({ companyId: { $in: oldIds } });
await Company.deleteMany({ _id: { $in: oldIds } });
await User.deleteMany({ _id: { $in: users.map((u) => u._id) } });

const created = await Company.insertMany(companies.map((c) => ({ ...c, password: hash })));
const byName = Object.fromEntries(created.map((c) => [c.name, c._id]));
await User.insertMany(users);

const now = Date.now();
const createdJobs = await Job.insertMany(
  jobs.map(([company, title, category, location, level, salary, description], i) => ({
    title, category, location, level, salary, description,
    companyId: byName[company],
    date: now - i * 2 * DAY,
    expireDate: new Date(now + (30 - i) * DAY),
    visible: true,
  }))
);

const job = (title) => createdJobs.find((j) => j.title === title);
const applications = [
  ["user_demo_amina", "Full Stack Developer", "Pending"],
  ["user_demo_abdi", "Full Stack Developer", "Accepted"],
  ["user_demo_hodan", "Network Engineer", "Pending"],
  ["user_demo_amina", "Data Analyst", "Rejected"],
  ["user_demo_hodan", "Marketing Officer", "Pending"],
];
await JobApplication.insertMany(
  applications.map(([userId, title, status], i) => ({
    userId, status,
    jobId: job(title)._id,
    companyId: job(title).companyId,
    date: now - i * DAY,
  }))
);

console.log(`Seeded ${created.length} companies, ${createdJobs.length} jobs, ${users.length} users, ${applications.length} applications.`);
await mongoose.disconnect();
