// One application by a user to a job. status is Pending, Accepted or Rejected.
// companyId is copied from the job so companies can query their applicants directly.
import mongoose from 'mongoose'

const JobApplicationSchema = new mongoose.Schema({
    userId :{type:String , ref:'User',required:true},
    companyId :{type:mongoose.Schema.Types.ObjectId , ref:'Company',required:true},
    jobId :{type:mongoose.Schema.Types.ObjectId , ref:'Job',required:true},
    status:{type:String , default:'Pending'},
    date:{type:Number ,required:true},
})

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);


export default JobApplication;