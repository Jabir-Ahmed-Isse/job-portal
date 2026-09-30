import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { FaBriefcase, FaUsers, FaBuilding } from 'react-icons/fa'
import { MdAdd, MdManageAccounts, MdVisibility } from 'react-icons/md'
import { AppContext } from '../context/appContext'
import { HiDocumentText } from 'react-icons/hi2'
import axios from 'axios'

function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { companyData, setCompanyToken, setCompanyData } = useContext(AppContext)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [stats, setStats] = useState({
    jobs: 0,
    applicants: 0,
    companies: 0,
    users: 0,
  })

  // Hide cards when sidebar routes are active (anything under /dashboard except the main dashboard page)
  // Assuming dashboard main page is '/dashboard' only
  const showCards = location.pathname === '/dashboard'

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/dashboard/stats')
        setStats(res.data)
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err)
      }
    }

    if (showCards) {
      fetchStats()
    }
  }, [showCards])

  const logOut = () => {
    setCompanyToken(null)
    localStorage.removeItem('companyToken')
    setCompanyData(null)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-3 bg-white h-16 relative">
        <div
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <FaBriefcase className="text-lime-500 text-xl" />
          <span className="text-lg font-semibold text-black">
            Job <b className="text-lime-500">Portal</b>
          </span>
        </div>

        {companyData && (
          <div className="relative">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <p className="text-sm text-gray-700">Welcome, {companyData.name}</p>
              <img
                src={companyData.image}
                alt="Company Icon"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white shadow-md rounded-md z-10 w-40">
                <ul className="text-sm text-gray-600">
                  <li
                    onClick={logOut}
                    className="px-4 py-2 hover:bg-gray-100 text-red-500 font-medium cursor-pointer"
                  >
                    Log out
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Layout: Sidebar + Main */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-48 bg-white p-4 space-y-2">
          <NavLink
            to="/dashboard/addjob"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2 text-sm rounded-md transition ${
                isActive ? 'bg-lime-200 text-lime-800' : 'text-gray-700 hover:bg-lime-100'
              }`
            }
          >
            <MdAdd className="text-lg" />
            <p className="font-medium">Add Job</p>
          </NavLink>

          <NavLink
            to="/dashboard/managejobs"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2 text-sm rounded-md transition ${
                isActive ? 'bg-lime-200 text-lime-800' : 'text-gray-700 hover:bg-lime-100'
              }`
            }
          >
            <MdManageAccounts className="text-lg" />
            <p className="font-medium">Manage Jobs</p>
          </NavLink>

          <NavLink
            to="/dashboard/viewapplications"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2 text-sm rounded-md transition ${
                isActive ? 'bg-lime-200 text-lime-800' : 'text-gray-700 hover:bg-lime-100'
              }`
            }
          >
            <MdVisibility className="text-lg" />
            <p className="font-medium">View Applications</p>
          </NavLink>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          {/* Stat Cards - only show on dashboard root */}
          {showCards && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Card 1 */}
              <div className="bg-white shadow-xl rounded-xl p-6">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="bg-lime-100 text-lime-600 p-3 rounded-full">
                    <HiDocumentText className="text-2xl" />
                  </div>
                  <h3 className="flex items-center text-lg text-gray-700">
                    <span className="font-semibold">Jobs</span>
                  </h3>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-1">23</h2>
                <p className="text-sm text-gray-500">Total posted jobs</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white shadow-xl rounded-xl p-6">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                    <FaUsers className="text-2xl" />
                  </div>
                  <h3 className="flex items-center text-lg text-gray-700">
                    <span className="font-semibold">Applicants</span>
                  </h3>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-1">3</h2>
                <p className="text-sm text-gray-500">People who applied</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white shadow-xl rounded-xl p-6">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
                    <FaBuilding className="text-2xl" />
                  </div>
                  <h3 className="flex items-center text-lg text-gray-700">
                    <span className="font-semibold">Companies</span>
                  </h3>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-1">12</h2>
                <p className="text-sm text-gray-500">Registered organizations</p>
              </div>

              {/* Card 4 */}
              <div className="bg-white shadow-xl rounded-xl p-6">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="bg-pink-100 text-pink-600 p-3 rounded-full">
                    <FaUsers className="text-2xl" />
                  </div>
                  <h3 className="flex items-center text-lg text-gray-700">
                    <span className="font-semibold">Users</span>
                  </h3>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-1">3</h2>
                <p className="text-sm text-gray-500">Platform members</p>
              </div>
            </div>
          )}

          {/* Outlet renders nested dashboard routes */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Dashboard
