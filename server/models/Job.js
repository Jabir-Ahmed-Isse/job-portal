// A job posting that belongs to a company.
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, required: true },
  salary: { type: String, required: true },
  date: { type: Number, required: true }, // posted time in ms since epoch
  visible: { type: Boolean, default: true },
  expireDate: { type: Date, required: true }, // hidden from the job board after this date
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;

