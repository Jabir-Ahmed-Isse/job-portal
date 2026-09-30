import Job from "../models/Job.js";

// Get all visible, unexpired jobs (public job board)
export const getJobs = async (req, res) => {
  try {
    const today = new Date();

    const jobs = await Job.find({
      visible: true,
      expireDate: { $gt: today } // Only jobs that haven't expired
    }).populate({
      path: "companyId",
      select: "-password",
    });

    res.json({ success: true, jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single visible, unexpired job by ID (job details page)
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const today = new Date();

    const job = await Job.findOne({
      _id: id,
      visible: true,
      expireDate: { $gt: today }, // Job must be unexpired
    }).populate({
      path: "companyId",
      select: "-password",
    });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job Not Found or Expired" });
    }

    res.json({ success: true, job });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
