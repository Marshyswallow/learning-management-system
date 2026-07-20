import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setLectureData } from '../redux/lectureSlice'

function useGetCreatorCourse(courseId) {
  const dispatch = useDispatch()

  useEffect(() => {
    const courseLecture = async () => {
      try {
        const result = await axios.get(serverUrl + `api/course/${courseId}/lecture`, { withCredentials: true })
        console.log(result.data)
        dispatch(setLectureData(result.data))
      } catch (error) {
        console.log(error)
      }
    }
    courseLecture()
  }, [])
}

export default useGetCreatorCourse