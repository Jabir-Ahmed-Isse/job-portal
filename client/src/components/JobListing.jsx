import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/appContext'
import crossicon from '../assets/cross_icon.svg'
import { JobCategories, JobLocations, jobsData } from '../assets/assets'
import JobCards from './JobCards'
import left_arrow_icon from '../assets/left_arrow_icon.svg'
import right_arrow_icon from '../assets/right_arrow_icon.svg'

function JobListing() {
  const { isSearched, searchFilter, setSearchFilter,jobs } = useContext(AppContext)
  const [showFilter,setShowFilter]=useState(true)

  const [currentPage,setCurrentPage]=useState(1)

  const [selectedCategories,setSelectedCategories]=useState([])
  const[selectedLocations,setSelectedLocations]=useState([])
  const[filteredJobs,setFilteredJobs]=useState(jobs)

  const handleCategory = (category) => {
    setSelectedCategories(
        prev => prev.includes(category)? prev.filter(c => c !== category):[...prev,category]
    )
  }
  const handleLocation = (location) => {
    setSelectedLocations(
        prev => prev.includes(location)? prev.filter(c => c !== location):[...prev,location]
    )
  }
  useEffect(()=>{
    const matchCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)
    const matchLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)
    const matchTitle =  job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
    const matchSearchLocation =  job =>searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase()) 
    const newFilteredJobs = jobs.slice().reverse().filter(
      job => matchCategory(job) && matchLocation(job) && matchTitle(job) && matchSearchLocation(job)
    )
    setFilteredJobs(newFilteredJobs)
    setCurrentPage(1)
  },[jobs,selectedCategories,selectedLocations,searchFilter])

  return (
    <div className="flex flex-col md:flex-row gap-8 px-4 md:px-10 py-6">

      {/* Sidebar Filters */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6">
        {/* Current search filters */}
        {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Current Search</h3>
            <div className="flex flex-wrap gap-3">
              {searchFilter.title && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {searchFilter.title}
                  <img
                    src={crossicon}
                    alt="clear"
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2">
                  {searchFilter.location}
                  <img
                    src={crossicon}
                    alt="clear"
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                  />
                </span>
              )}
            </div>
          </>
        )}
        <button onClick={ e=> setShowFilter(prev => !prev)}>
            {showFilter?"close":"filters"}
        </button>

        {/* Job Categories */}
        <div className={showFilter ? "block" : "hidden lg:block"}>


          <h4 className="text-md font-medium text-gray-700 mb-2">Search by Categories</h4>
          <ul className="space-y-2">
            {JobCategories.map((category, index) => (
              <li key={index} className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-500"  onChange={()=> handleCategory(category)}
                checked={selectedCategories.includes(category)}
                />
                <label className="text-gray-600">{category}</label>
              </li>
            ))}
          </ul>
        </div>

        {/* Job Locations */}
        <div className={showFilter ? "block" : "hidden lg:block"}>

          <h4 className="text-md font-medium text-gray-700 mb-2">Search by Locations</h4>
          <ul className="space-y-2">
            {JobLocations.map((loc, index) => (
  <li key={index} className="flex items-center gap-2">
    <input
      type="checkbox"
      className="accent-green-500"
      onChange={() => handleLocation(loc)}
      checked={selectedLocations.includes(loc)}
    />
    <label className="text-gray-600">{loc}</label>
  </li>
))}
          </ul>
        </div>
      </div>

      {/* Job Listings */}
      <section className="w-full " id='joblist'>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Shaqooyinkii Ugu Dambeeyay</h3>
        <p className="text-gray-500 mb-6">Ka hel shaqooyinka jeceshahay oo meesha rabo ah iyo shirkadaha ugu sareeyo</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.slice((currentPage -1)*6,currentPage*6).map((job, index) => (
            <JobCards key={index} job={job} />
          ))}
        </div>
        {/* pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
  {/* Left Arrow */}
  <a href="#joblist" className="p-2 hover:bg-gray-200 rounded-full transition" > 
    <img src={left_arrow_icon} alt="Previous" className="w-5 h-5" onClick={()=> setCurrentPage(Math.max(currentPage-1,1))}/>
  </a>

  {/* Page Numbers */}
  {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
    <a href="#joblist" key={index}>
      <button onClick={()=> setCurrentPage(index+1)}   className={`px-3 py-1 rounded-md border border-gray-300 text-sm hover:bg-blue-500 hover:text-white transition ${currentPage === index+1?'bg-green-300 text-black':'text-gray-500'}`}>
        {index + 1}
      </button>
    </a>
  ))}

  {/* Right Arrow */}
  <a href="#joblist" className="p-2 hover:bg-gray-200 rounded-full transition">
    <img src={right_arrow_icon} alt="Next" className="w-5 h-5" onClick={()=> setCurrentPage(Math.max(1,Math.min(currentPage+1,Math.ceil(filteredJobs.length / 6))))}/>
  </a>
</div>

      </section>

    </div>
  )
}

export default JobListing
