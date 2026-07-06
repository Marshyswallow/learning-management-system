import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setCourseData } from '../redux/courseSlice'

function useGetPublishedCourse() {
  const dispatch = useDispatch()

  useEffect(() => {
    const publishedCourses = async () => {
      try {
        const result = await axios.get(serverUrl + "api/course/getpublished", { withCredentials: true })
        console.log(result.data)
        dispatch(setCourseData(result.data))
      } catch (error) {
        console.log(error)
      }
    }
    publishedCourses()
  }, [])
}

export default useGetPublishedCourse