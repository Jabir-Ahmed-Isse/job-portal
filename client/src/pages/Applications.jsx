import React, { useContext, useState } from 'react';
import Navbar from '../components/navbar';
import { assets } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';
import { AppContext } from '../context/appContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Applications() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isEdit, setEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const { backEndUrl, userData, userApplications = [], fetchUserData } = useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append('resume', resume);

      const token = await getToken();
      const { data } = await axios.post(
        `${backEndUrl}/api/users/update-resume`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setEdit(false);
    setResume(null);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-6 p-4">
        <h2 className="text-lg font-semibold mb-4">Your Resume</h2>

        <div className="bg-white shadow rounded p-3 mb-6 text-sm">
          {isEdit || (userData && !userData.resume) ? (
            <>
              <label htmlFor="resumeupload" className="flex items-center gap-2 cursor-pointer">
                <span>{resume ? resume.name : 'Select resume'}</span>
                <input
                  id="resumeupload"
                  onChange={e => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="" className="w-6 h-6" />
              </label>
              <button
                onClick={updateResume}
                className="mt-3 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <a
                href={userData?.resume || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                View Resume
              </a>
              <button
                onClick={() => setEdit(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className="text-lg font-semibold mb-3">Jobs Applied</h2>

        <table className="w-full table-auto border-collapse text-sm bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2 border-b">Company</th>
              <th className="p-2 border-b">Title</th>
              <th className="p-2 border-b">Location</th>
              <th className="p-2 border-b">Date</th>
              <th className="p-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {userApplications.length > 0 ? (
              userApplications.map((job, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border-b flex items-center gap-2">
                    <img src={job.companyId.image} alt="" className="w-6 h-6" />
                    <span>{job.companyId.name}</span>
                  </td>
                  <td className="p-2 border-b">{job.jobId.title}</td>
                  <td className="p-2 border-b">{job.jobId.location}</td>
                  <td className="p-2 border-b">{moment(job.date).format('ll')}</td>
                  <td className="p-2 border-b">
                    <span
                      className={`
                        px-2 py-0.5 rounded-full text-xs font-medium
                        ${job.status === 'Accepted'
                          ? 'bg-green-100 text-green-700'
                          : job.status === 'Rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'}
                      `}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No job applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default Applications;
