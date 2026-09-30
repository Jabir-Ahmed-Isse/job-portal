// import React, { useContext, useEffect, useState } from 'react';
// import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/appContext';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// function ManageJobs() {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const { backEndUrl, companyToken } = useContext(AppContext);

//   // ✅ Use correct Authorization header with Bearer
//   const authHeader = {
//     headers: {
//       Authorization: `Bearer ${companyToken}`,
//     },
//   };

//   // Fetch company jobs
//   const fetchCompanyJobs = async () => {
//     try {
//       const { data } = await axios.get(`${backEndUrl}/api/company/list-jobs`, authHeader);
//       if (data.success) {
//         const updatedJobs = data.jobsData.reverse().map((job) => ({
//           ...job,
//           applicants: Array.isArray(job.applicants) ? job.applicants.length : 0,
//         }));
//         setJobs(updatedJobs);
//         console.log(updatedJobs);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   // Toggle job visibility
//   const changeJobVisibilty = async (id) => {
//     try {
//       const { data } = await axios.post(
//         `${backEndUrl}/api/company/change-visibility`,
//         { id },
//         authHeader
//       );
//       if (data.success) {
//         toast.success(data.message);
//         fetchCompanyJobs();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     fetchCompanyJobs();
//   }, []);

//   return (
//     <div className="p-4">
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm text-left border border-gray-200 shadow-md rounded-md">
//           <thead className="bg-gray-100 text-gray-700 uppercase">
//             <tr>
//               <th className="px-4 py-2 border-b">#</th>
//               <th className="px-4 py-2 border-b">Job Title</th>
//               <th className="px-4 py-2 border-b">Date</th>
//               <th className="px-4 py-2 border-b">Location</th>
//               <th className="px-4 py-2 border-b">Applicants</th>
//               <th className="px-4 py-2 border-b">Visible</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job, index) => (
//               <tr
//                 key={job._id}
//                 className="hover:bg-gray-50 transition duration-150 border-b"
//               >
//                 <td className="px-4 py-2">{index + 1}</td>
//                 <td className="px-4 py-2 font-medium text-gray-800">{job.title}</td>
//                 <td className="px-4 py-2 text-gray-600">{moment(job.date).format('ll')}</td>
//                 <td className="px-4 py-2">{job.location}</td>
//                 <td className="px-4 py-2 text-center">{job.applicants}</td>
//                 <td className="px-4 py-2 text-center">
//                   <input
//                     onChange={() => changeJobVisibilty(job._id)}
//                     type="checkbox"
//                     className="accent-green-500 w-4 h-4"
//                     checked={job.visible}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-4">
//         <button
//           onClick={() => navigate('/dashboard/addjob')}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Add New Job
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ManageJobs;





import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function ManageJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const { backEndUrl, companyToken } = useContext(AppContext);

  const authHeader = {
    headers: {
      Authorization: `Bearer ${companyToken}`,
    },
  };

  // Fetch company jobs
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(`${backEndUrl}/api/company/list-jobs`, authHeader);
      if (data.success) {
        setJobs(data.jobsData.reverse());
      } else {
        toast.error(data.message || "Failed to fetch jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch company job applications
  const fetchCompanyApplications = async () => {
    try {
      const { data } = await axios.get(`${backEndUrl}/api/company/applicants`, authHeader);
      if (data.success) {
        setApplications(data.applications);
      } else {
        toast.error(data.message || "Failed to fetch applications");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Count how many applicants per job
  const getApplicantCount = (jobId) => {
    return applications.filter(app => app.jobId === jobId || app.jobId?._id === jobId).length;
  };

  // Toggle job visibility
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        `${backEndUrl}/api/company/change-visibility`,
        { id },
        authHeader
      );
      if (data.success) {
        toast.success(data.message || "Job visibility updated");
        fetchCompanyJobs();
        fetchCompanyApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
      fetchCompanyApplications();
    }
  }, [companyToken]);

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200 shadow-md rounded-md">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Job Title</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Location</th>
              <th className="px-4 py-2 border-b">Applicants</th>
              <th className="px-4 py-2 border-b">Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={job._id}
                className="hover:bg-gray-50 transition duration-150 border-b"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-medium text-gray-800">{job.title}</td>
                <td className="px-4 py-2 text-gray-600">{moment(job.date).format('ll')}</td>
                <td className="px-4 py-2">{job.location}</td>
                <td className="px-4 py-2 text-center">{getApplicantCount(job._id)}</td>
                <td className="px-4 py-2 text-center">
                  <input
                    onChange={() => changeJobVisibility(job._id)}
                    type="checkbox"
                    className="accent-green-500 w-4 h-4"
                    checked={job.visible}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          onClick={() => navigate('/dashboard/addjob')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Job
        </button>
      </div>
    </div>
  );
}

export default ManageJobs;
