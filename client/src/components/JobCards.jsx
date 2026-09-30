// import React from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'

// function JobCards({ job }) {
//   const navigate=useNavigate()
//   return (
//     <div className="bg-white shadow-md rounded-2xl p-5 w-full transition hover:shadow-xl">
//       <div className="flex items-center gap-4 mb-3">
//         <img src={job.companyId?.image} alt="logo" className="w-12 h-12 object-contain" />
//         <div className="flex-1">
//           <h4 className="text-xl font-semibold text-gray-800">{job.title}</h4>
//           {/* Flex container for badges */}
//           <div className="flex gap-2 mt-2">
//             <span className="flex items-center bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
//               {job.location}
//             </span>
//             <span className="flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
//               {job.level}
//             </span>
//           </div>
//         </div>
//       </div>

//       <p
//         className="text-gray-600 text-sm mb-4"
//         dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) + '...' }}
//       />

//       <div className="flex gap-3">
//         <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium">
//           Codso
//         </button>
//         <button onClick={()=> {navigate(`/applied-jobs/${job._id}`); scrollTo(0,0)}}className="border border-green-500 text-green-600 px-4 py-2 rounded-xl font-medium hover:bg-green-50">
//           Faahfaahin
//         </button>
//       </div>
//     </div>
//   )
// }

// export default JobCards











import React from 'react'
import { useNavigate } from 'react-router-dom'

function JobCards({ job }) {
  const navigate = useNavigate()

  // Format expireDate if exists, else show "No expiration"
  const expireDate = job.expireDate
    ? new Date(job.expireDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'No expiration'

  // Plain-text preview: slicing the HTML directly can cut tags in half
  const text = new DOMParser()
    .parseFromString(job.description.replace(/<\/(p|h\d|li)>/g, '$& '), 'text/html')
    .body.textContent.replace(/\s+/g, ' ')
    .trim()
  const preview = text.length > 150 ? text.slice(0, 150) + '...' : text

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 w-full transition hover:shadow-xl">
      <div className="flex items-center gap-4 mb-3">
        <img src={job.companyId?.image} alt="logo" className="w-12 h-12 object-contain" />
        <div className="flex-1">
          <h4 className="text-xl font-semibold text-gray-800">{job.title}</h4>
          {/* Flex container for badges */}
          <div className="flex gap-2 mt-2">
            <span className="flex items-center bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
              {job.location}
            </span>
            <span className="flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
              {job.level}
            </span>
          </div>
          {/* Expire date display */}
          <p className="mt-2 text-red-600 text-xs font-semibold">
            Expire Date: {expireDate}
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{preview}</p>

      <div className="flex gap-3">
        <button
          onClick={() => {
            navigate(`/applied-jobs/${job._id}`)
            scrollTo(0, 0)
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium"
        >
          Codso
        </button>
        <button
          onClick={() => {
            navigate(`/applied-jobs/${job._id}`)
            scrollTo(0, 0)
          }}
          className="border border-green-500 text-green-600 px-4 py-2 rounded-xl font-medium hover:bg-green-50"
        >
          Faahfaahin
        </button>
      </div>
    </div>
  )
}

export default JobCards










