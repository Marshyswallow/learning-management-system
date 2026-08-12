import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaArrowLeft } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import Card from '../component/Card'

function Profile() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.userData)
  const [courses, setCourses] = useState([])
  const [loadingCourses, setLoadingCourses] = useState(false)

  useEffect(() => {
    if (!user) return
    const loadCourses = async () => {
      setLoadingCourses(true)
      try {
        const endpoint = user.role === 'educator'
          ? `${serverUrl}api/course/creatorCourses`
          : `${serverUrl}api/user/getenrolledcourses`
        const result = await axios.get(endpoint, { withCredentials: true })
        setCourses(result.data.courses || result.data || [])
      } catch (error) {
        console.error('Failed to load profile courses', error)
      } finally {
        setLoadingCourses(false)
      }
    }
    loadCourses()
  }, [user])

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-8'>
      <div className='mx-auto w-full max-w-5xl rounded-2xl bg-white p-6 shadow-lg md:p-8'>

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

        <div className='mb-8 grid gap-4 border-y border-gray-100 py-6 sm:grid-cols-2'>
          <p className='text-[16px]'>
            <span className='font-semibold'>Email: </span>
            {user?.email}
          </p>
          <p className='text-[16px]'>
            <span className='font-semibold'>Bio: </span>
            {user?.description || "No bio added"}
          </p>
          <p className='text-[16px]'>
            <span className='font-semibold'>
              {user?.role === 'educator' ? 'Uploaded Courses: ' : 'Enrolled Courses: '}
            </span>
            {courses.length || user?.enrolledCourses?.length || 0}
          </p>
        </div>

        <div className='flex justify-center sm:justify-start'>
          <button
            className='bg-black text-white px-[60px] py-[12px] rounded-[10px] text-[16px] cursor-pointer'
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        </div>

        <section className='mt-10'>
          <div className='flex items-end justify-between gap-4'>
            <div>
              <h2 className='text-2xl font-semibold'>
                {user?.role === 'educator' ? 'Your courses and videos' : 'Your learning'}
              </h2>
              <p className='mt-1 text-sm text-gray-500'>
                {user?.role === 'educator'
                  ? 'Open a course to manage all of its uploaded lectures.'
                  : 'Continue watching the courses you have enrolled in.'}
              </p>
            </div>
          </div>
          {loadingCourses ? (
            <p className='mt-6 text-gray-500'>Loading courses...</p>
          ) : courses.length ? (
            <div className='mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {courses.map((course) => (
                <div key={course._id}>
                  <Card thumbnail={course.thumbnail} title={course.title} category={course.category} price={course.price} id={course._id} />
                  <button
                    onClick={() => navigate(user?.role === 'educator' ? `/createlecture/${course._id}` : `/viewlectures/${course._id}`)}
                    className='mt-2 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800'
                  >
                    {user?.role === 'educator' ? 'Manage videos' : 'Watch course'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className='mt-6 rounded-lg border border-dashed p-6 text-sm text-gray-500'>
              {user?.role === 'educator' ? 'You have not uploaded a course yet.' : 'You have not enrolled in a course yet.'}
            </p>
          )}
        </section>

      </div>
    </div>
  )
}

export default Profile
