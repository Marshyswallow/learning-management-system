import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { serverUrl } from '../../App'
import { ClipLoader } from 'react-spinners'
import axios from 'axios'
import { toast } from 'react-toastify'

function CreateCourse() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [loading,setLoading]=useState(false)

  const categories = [
    "Web development",
    "UI UX designing",
    "App development",
    "Ethical hacking",
    "AI / ML",
    "Data science",
    "Data analytics",
    "AI tools"
  ]

  const handleCreate = async () => {
    setLoading(true)
    try {
      const result = await axios.post(
        serverUrl + "api/course/create",
        { title, category },
        { withCredentials: true }
      )
      console.log(result.data)
      toast.success("course created")
      navigate("/courses") // optional: redirect after success
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Failed to create course")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-sm w-full max-w-2xl p-6 sm:p-8'>

        {/* header */}
        <div className='relative flex items-center justify-center mb-8'>
          <FaArrowLeft
            className='absolute left-0 w-5 h-5 cursor-pointer'
            onClick={() => navigate(-1)}
          />
          <h1 className='text-2xl font-bold'>Create Course</h1>
        </div>

        {/* course title */}
        <div className='mb-6'>
          <label className='block text-sm text-gray-500 mb-2'>Course Title</label>
          <input
            type='text'
            placeholder='Enter course title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus-[black]'
          />
        </div>

        {/* category */}
        <div className='mb-8'>
          <label className='block text-sm text-gray-500 mb-2'>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus-[black]'
          >
            <option value="" disabled>Select category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* create button */}
        <button
          onClick={handleCreate}
          className='w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors' disabled={loading}
        >
        {loading ?<ClipLoader size={30} color='white'/> : "Create"}
        </button>

      </div>
    </div>
  )
}

export default CreateCourse