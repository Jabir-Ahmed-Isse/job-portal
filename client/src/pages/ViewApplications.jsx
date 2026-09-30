import React, { useContext, useEffect, useState } from 'react'
import { FaDownload } from 'react-icons/fa'
import { AppContext } from '../context/appContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ViewApplications = () => {
  const { backEndUrl, companyToken } = useContext(AppContext)
  const [applicants, setApplicants] = useState(false)

  // Function to fetch company received applications data
  const fetchCompanyApplications = async () => {
    try {
      const { data } = await axios.get(backEndUrl + '/api/company/applicants', {
        headers: { Authorization: `Bearer ${companyToken}` }
      })

      if (data.success) {
        setApplicants(data.applications.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Function to update status of an applicant
  const changeJobStatus = async (id, status) => {
    try {
      const { data } = await axios.patch(
        backEndUrl + '/api/company/change-status',
        { id, status },
        { headers: { Authorization: `Bearer ${companyToken}` } }
      )

      if (data.success) {
        // Update local state
        setApplicants(prev =>
          prev.map(app => (app._id === id ? { ...app, status } : app))
        )
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyApplications()
    }
  }, [companyToken])

  return applicants ? applicants.length === 0 ? (
    <div>No applications received yet.</div>
  ) : (
    <div className="p-2">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs border border-gray-200 shadow-sm rounded-md">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-2 py-1">#</th>
              <th className="px-2 py-1">User</th>
              <th className="px-2 py-1">Title</th>
              <th className="px-2 py-1">Location</th>
              <th className="px-2 py-1">Resume</th>
              <th className="px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants
              .filter(item => item.jobId && item.userId)
              .map((applicant, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 text-gray-700">
                  <td className="px-2 py-1">{index + 1}</td>
                  <td className="px-2 py-1 flex items-center gap-2">
                    <img
                      src={applicant.userId.image}
                      alt="user"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>{applicant.userId.name}</span>
                  </td>
                  <td className="px-2 py-1">{applicant.jobId.title}</td>
                  <td className="px-2 py-1">{applicant.jobId.location}</td>
                  <td className="px-2 py-1">
                    <a
                      href={applicant.userId.resume || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-500 hover:underline"
                    >
                      <FaDownload className="text-sm" />
                    </a>
                  </td>
                  <td className="px-2 py-1 flex gap-2">
                    {applicant.status === 'Accepted' || applicant.status === 'Rejected' ? (
                      <button
                        disabled
                        className={`px-2 py-1 rounded text-xs ${
                          applicant.status === 'Accepted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {applicant.status}
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => changeJobStatus(applicant._id, 'Accepted')}
                          className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-xs"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => changeJobStatus(applicant._id, 'Rejected')}
                          className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default ViewApplications
