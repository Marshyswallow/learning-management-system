import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setCourseData } from "../redux/courseSlice";

function useGetPublishedCourse() {
  const dispatch = useDispatch();

  useEffect(() => {
    const publishedCourses = async () => {
      try {
        const result = await axios.get(
          serverUrl + "api/course/getpublished",
          { withCredentials: true }
        );

        console.log("Published API result:", result.data);

        const courses =
          result.data?.courses ||
          result.data?.courseData ||
          result.data?.publishedCourses ||
          result.data?.data ||
          result.data;

        dispatch(setCourseData(Array.isArray(courses) ? courses : []));
      } catch (error) {
        console.error("Published course error:", error);
        dispatch(setCourseData([]));
      }
    };

    publishedCourses();
  }, [dispatch]);
}

export default useGetPublishedCourse;