// import Company from "../models/Company.js";
// import bcrypt from "bcrypt";
// import { v2 as cloudinary } from "cloudinary";
// import generateToken from "../utils/generateToken.js";
// // import { of } from "svix/dist/openapi/rxjsStub.js";
// import Job from "../models/Job.js";
// import JobApplication from "../models/JobApplication.js";

// // Register a new company
// export const registerCompany = async (req, res) => {
//   const { name, email, password } = req.body;
//   const imageFile = req.file.path;

//   if (!name || !email || !password || !imageFile) {
//     return res.json({ success: false, message: "Missing Details" });
//   }

//   try {
//     // Check if the company already exists
//     const CompanyExists = await Company.findOne({ email });
//     if (CompanyExists) {
//       return res.json({
//         success: false,
//         message: "Company Already Registered",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     const imageupload = await cloudinary.uploader.upload(imageFile);
//     const company = await Company.create({
//       name,
//       email,
//       password: hashPassword,
//       image: imageupload.secure_url,
//     });

//     res.json({
//       success: true,
//       company: {
//         _id: company._id,
//         name: company.name,
//         email: company.email,
//         image: company.image,
//       },
//       token: generateToken(company._id),
//     });
//   } catch (err) {
//     // console.log(err);
//     res.json({ success: false, message: err.message });
//   }
// };

// // Company login
// export const loginCompany = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.json({ success: false, message: "Missing Details" });
//   }
//   try {
//     // Check if the company exists
//     const company = await Company.findOne({ email });
//     if (bcrypt.compare(password, company.password)) {
//       return res.json({
//         success: true,
//         company: {
//           _id: company._id,
//           name: company.name,
//           email: company.email,
//           image: company.image,
//         },
//         token: generateToken(company._id),
//       });
//     } else {
//       return res.json({
//         success: false,
//         message: "Invalid Email or Password",
//       });
//     }
//   } catch (err) {
//     // console.log(err);
//     return res.json({ success: false, message: err.message });
//   }
// };

// // Get Company data
// export const getCompanyData = async (req, res) => {

//   try {
//      const company = req.company;
//     // sucess
//     res.json({ success: true, company });
//   } catch (err) {
//     // console.log(err);
//     res.json({ success: false, message: err.message });
//   } 
// };

// // Post a new job
// export const postJob = async (req, res) => {
//   const { title, description, location, salary, level, category } = req.body;

//   const companyId = req.company._id;

//   // console.log(companyId, { title, description, location, salary });

//   try {
//     if (!title || !description || !location || !salary || !level || !category) {
//       return res.json({ success: false, message: "Missing Details" });
//     }

//     const newJob = new Job({
//       title,
//       description,
//       location,
//       salary,
//       companyId,
//       date: Date.now(),
//       level,
//       category,
//     });
//     await newJob.save();

//     res.json({ success: true, newJob });
//   } catch (err) {
//     // console.log(err);
//     res.json({ success: false, message: err.message });
//   }
// };

// // Get Company Job Applicants
// export const getCompanyJobApplicants = async (req, res) => {
// try {
//   const companyId = req.company._id

//   const applications = await JobApplication.find({companyId})
//   .populate('userId','name image resume')
//   .populate('jobId','title location category level salary')
//   .exec()

//   return res.json({success:true, applications})
  
// } catch (error) {
//  res.json({success:false,message:error.message}) 
// }
// };

// // Get Company Posted Jobs
// export const getCompanyPostedJobs = async (req, res) => {

//   try {
//     const companyId = req.company._id;
//     const jobs = await Job.find({ companyId });
//     if (!jobs) {
//       return res.json({ success: false, message: "No Jobs Found" });
//     }

//     // (Todo) Adding no of applicants info in data

//     res.json({ success: true, jobsData:jobs });
//   } catch (err) {
//     // console.log(err);
//     res.json({ success: false, message: err.message });
//   }
// };

// export const ChangeJobApplicationsStatus = async (req, res) => {
//   try {
//     console.log('Incoming request to change status:', req.body);
//     console.log('Authenticated company:', req.company || 'No company data');

//     const { id, status } = req.body;

//     const updated = await JobApplication.findOneAndUpdate(
//       { _id: id },
//       { status },
//       { new: true }
//     );

//     if (!updated) {
//       console.log('No application found with that ID.');
//       return res.status(404).json({ success: false, message: 'Application not found' });
//     }

//     res.status(200).json({ success: true, message: 'Status changed', application: updated });
//   } catch (error) {
//     console.error('Error changing status:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



// // Change Job Visibility
// export const ChangeVisibility = async (req, res) => {
//   try{
//     const {id} = req.body;
//     const companyId = req.company._id;
//     const job = await Job.findById(id);
//     if(companyId.toString() === job.companyId.toString()){
//       job.visible = !job.visible;
//     }
//      await job.save();
//      res.json({ success: true, job });
//   }catch(err){
//     // console.log(err);
//     res.json({ success: false, message: err.message });
//   }
// };












import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

// Register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file?.path;

  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({ success: false, message: "Company already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile);

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Company login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.json({ success: false, message: "Invalid Email or Password" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Email or Password" });
    }

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Get company data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({ success: true, company });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category, expireDate } = req.body;
  const companyId = req.company._id;

  if (!title || !description || !location || !salary || !level || !category || !expireDate) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      level,
      category,
      date: Date.now(),
      expireDate: new Date(expireDate),
    });

    await newJob.save();

    res.json({ success: true, message: "Job created successfully", newJob });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Get all applicants for company jobs
export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;

    const applications = await JobApplication.find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary");

    res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};




// Get all jobs posted by company
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });

    if (!jobs || jobs.length === 0) {
      return res.json({ success: false, message: "No Jobs Found" });
    }

    res.json({ success: true, jobsData: jobs });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Change job application status
export const ChangeJobApplicationsStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    const updated = await JobApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.json({ success: true, message: "Status changed", application: updated });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Toggle job visibility
export const ChangeVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job = await Job.findById(id);

    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }

    if (job.companyId.toString() !== companyId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    job.visible = !job.visible;
    await job.save();

    res.json({ success: true, job });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
