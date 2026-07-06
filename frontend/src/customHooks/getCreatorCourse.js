import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setCreatorCourseData } from '../redux/courseSlice'

function useGetCreatorCourse() {
  const dispatch = useDispatch()

  useEffect(() => {
    const creatorCourses = async () => {
      try {
        const result = await axios.get(serverUrl + "api/course/creatorCourses", { withCredentials: true })
        console.log(result.data)
        dispatch(setCreatorCourseData(result.data))
      } catch (error) {
        console.log(error)
      }
    }
    creatorCourses()
  }, [])
}

export default useGetCreatorCourse