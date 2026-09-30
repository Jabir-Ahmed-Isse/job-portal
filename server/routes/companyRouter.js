import express from 'express';
import { getCompanyData, loginCompany, registerCompany ,postJob} from '../controllers/companyController.js';
import { getCompanyJobApplicants, getCompanyPostedJobs,ChangeJobApplicationsStatus,ChangeVisibility } from '../controllers/companyController.js'; 
import upload from '../config/multer.js';
import { protectCompany } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register a Company
router.post('/register',upload.single('image'),registerCompany);

// Company Login
router.post('/login', loginCompany);

// Get Company Data
router.get('/company', protectCompany,getCompanyData)

// Post a  Job
router.post('/post-job',protectCompany, postJob);

// Get Applicants Data of Company
router.get('/applicants',protectCompany, getCompanyJobApplicants);

// Get Company job Listed
router.get('/list-jobs',protectCompany,getCompanyPostedJobs);

// Change Application Status
router.patch('/change-status',protectCompany,ChangeJobApplicationsStatus);   

// Change Job Visibility    
router.post('/change-visibility',protectCompany, ChangeVisibility);


export default router;