import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaArrowLeft } from 'react-icons/fa'

function Profile() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.userData)

  return (
    <div className='w-[100vw] h-[100vh] bg-gray-100 flex items-center justify-center'>
      <div className='w-[90%] md:w-[550px] bg-white rounded-2xl shadow-lg p-8'>

        {/* back arrow */}
        <FaArrowLeft 
          className='text-xl cursor-pointer mb-4' 
          onClick={() => navigate(-1)} 
        />

        {/* profile photo */}
        <div className='flex flex-col items-center gap-2 mb-6'>
  
  {/* ✅ show first letter if no photo */}
  {user?.photoUrl ? (
    <img
      src={user.photoUrl}
      alt="profile"
      className='w-[100px] h-[100px] rounded-full object-cover border-4 border-black'
    />
  ) : (
    <div className='w-[100px] h-[100px] rounded-full border-4 border-black bg-black flex items-center justify-center'>
      <span className='text-white text-4xl font-bold'>
        {user?.name?.charAt(0).toUpperCase()}
      </span>
    </div>
  )}

  <h1 className='text-2xl font-bold'>{user?.name}</h1>
  <span className='text-gray-500 text-[15px]'>{user?.role}</span>
</div>

        {/* info */}
        <div className='flex flex-col gap-4 mb-8'>
          <p className='text-[16px]'>
            <span className='font-semibold'>Email: </span>
            {user?.email}
          </p>
          <p className='text-[16px]'>
            <span className='font-semibold'>Bio: </span>
            {user?.description || "No bio added"}
          </p>
          <p className='text-[16px]'>
            <span className='font-semibold'>Enrolled Courses: </span>
            {user?.enrolledCourses?.length || 0}
          </p>
        </div>

        {/* edit button */}
        <div className='flex justify-center'>
          <button
            className='bg-black text-white px-[60px] py-[12px] rounded-[10px] text-[16px] cursor-pointer'
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  )
}

export default Profile