// Dashboard page for posting a new job. The description uses the Quill rich-text editor.
import  { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { JobCategories, JobLocations } from '../assets/assets'
import axios from 'axios'
import { AppContext } from '../context/appContext'
import { toast } from 'react-toastify'

function AddJob() {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('Mogadishu')
  const [category, setCategory] = useState('Programming')
  const [level, setLevel] = useState('Beginner level')
  const [salary, setSalary] = useState(0)
  const [expireDays, setExpireDays] = useState(30) // default 30 days

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const { backEndUrl, companyToken } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!quillRef.current.getText().trim()) {
      return toast.error('Please add a job description')
    }
    try {
      const description = quillRef.current.root.innerHTML
      const expireDate = new Date(Date.now() + expireDays * 24 * 60 * 60 * 1000)

      const { data } = await axios.post(
        backEndUrl + '/api/company/post-job',
        {
          title,
          description,
          location,
          salary,
          category,
          level,
          expireDate,
        },
        {
          headers: {
            Authorization: `Bearer ${companyToken}`,
          },
        }
      )

      if (data.success) {
        toast.success(data.message)
        setTitle('')
        setSalary(0)
        setExpireDays(30)
        quillRef.current.root.innerHTML = ''
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  return (
    <div className="p-4 mx-auto max-w-md bg-white shadow rounded-md">
      <form onSubmit={onSubmitHandler} className="space-y-4 text-sm">
        {/* Job Title */}
        <div>
          <label className="block mb-1 font-medium">Job Title</label>
          <input
            type="text"
            placeholder="e.g. Web Developer"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-lime-500 text-sm"
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <div ref={editorRef} className="bg-white h-32 border rounded text-sm" />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full border rounded px-2 py-1 text-sm"
          >
            {JobCategories.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <select
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            className="w-full border rounded px-2 py-1 text-sm"
          >
            {JobLocations.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div>
          <label className="block mb-1 font-medium">Level</label>
          <select
            onChange={(e) => setLevel(e.target.value)}
            value={level}
            className="w-full border rounded px-2 py-1 text-sm"
          >
            <option value="Beginner level">Beginner</option>
            <option value="Intermediate level">Intermediate</option>
            <option value="Senior level">Senior</option>
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block mb-1 font-medium">Salary (USD)</label>
          <input
            type="number"
            placeholder="e.g. 1000"
            onChange={(e) => setSalary(e.target.value)}
            value={salary}
            min={1}
            required
            className="w-full border rounded px-2 py-1 text-sm"
          />
        </div>

        {/* Expire Days */}
        <div>
          <label className="block mb-1 font-medium">Expires in</label>
          <select
            value={expireDays}
            onChange={(e) => setExpireDays(parseInt(e.target.value))}
            className="w-full border rounded px-2 py-1 text-sm"
          >
            <option value={1}>1 Days</option>
            <option value={7}>7 Days</option>
            <option value={14}>14 Days</option>
            <option value={30}>30 Days</option>
            <option value={60}>60 Days</option>
          </select>
        </div>

        {/* Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-lime-500 text-white font-semibold px-4 py-1 rounded text-sm hover:bg-lime-600"
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddJob
