// Job details page: loads one job by ID and lets a logged-in job seeker apply.
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import Loading from '../components/Loading';
import Navbar from '../components/navbar';
import { assets } from '../assets/assets';
import kConvert from 'k-convert'; // formats salary, e.g. 1400 -> 1.4k
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';

function Applyjob() {
  const { id } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const { jobs, backEndUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backEndUrl + `/api/jobs/${id}`);
      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error('Log in to apply for jobs');
      }

      if (!userData.resume) {
        navigate('/applications');
        return toast.error('Upload resume to apply');
      }

      const token = await getToken();

      const { data } = await axios.post(
        backEndUrl + '/api/users/apply',
        { jobId: jobData._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Something went wrong';
      toast.error(message);
    }
  };

  const checkApplied = () => {
    if (!jobData) return;
    const hasApplied = userApplications.some(item => item.jobId?._id === jobData._id);
    setIsAlreadyApplied(hasApplied);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    if (userApplications.length > 0 && jobData) {
      checkApplied();
    }
  }, [jobData, userApplications, id]);

  // Format expire date if exists
  const formattedExpireDate = jobData?.expireDate
    ? moment(jobData.expireDate).format('MMM D, YYYY')
    : 'No expiration date';

  return jobData ? (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 mt-8 bg-white rounded-2xl shadow-md">
        {/* Header Section */}
        <div className="flex items-center gap-6 mb-6">
          <img src={jobData.companyId.image} alt="Company Logo" className="w-16 h-16 object-contain" />
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{jobData.title}</h1>
            <div className="flex flex-wrap gap-4 text-gray-600 mt-2">
              <span className="flex items-center gap-2">
                <img src={assets.suitcase_icon} alt="" className="w-5" />
                {jobData.companyId.name}
              </span>
              <span className="flex items-center gap-2">
                <img src={assets.location_icon} alt="" className="w-5" />
                {jobData.location}
              </span>
              <span className="flex items-center gap-2">
                <img src={assets.money_icon} alt="" className="w-5" />
                ${kConvert.convertTo(jobData.salary)}
              </span>
            </div>
          </div>
        </div>

        {/* Action & Time */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={applyHandler}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium shadow"
            disabled={isAlreadyApplied || (jobData.expireDate && moment().isAfter(jobData.expireDate))}
            title={
              isAlreadyApplied
                ? "You have already applied for this job"
                : jobData.expireDate && moment().isAfter(jobData.expireDate)
                ? "This job posting has expired"
                : ""
            }
          >
            {isAlreadyApplied ? 'Already applied' : 'Apply now'}
          </button>
          <div className="text-sm text-gray-500 space-y-1">
            <p>Posted {moment(jobData.date).fromNow()}</p>
            <p>Expires on {formattedExpireDate}</p>
          </div>
        </div>

        {/* Job Description */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Description</h2>
          <div
  className="max-w-none text-left"
  style={{ whiteSpace: 'pre-wrap' }}
  dangerouslySetInnerHTML={{ __html: jobData.description }}
/>

          <div className="mt-6">
            <button
              onClick={applyHandler}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium shadow"
              disabled={isAlreadyApplied || (jobData.expireDate && moment().isAfter(jobData.expireDate))}
            >
              {isAlreadyApplied ? 'Already applied' : 'Apply now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Applyjob;
