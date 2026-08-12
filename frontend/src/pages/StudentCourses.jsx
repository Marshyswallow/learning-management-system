import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Card from "../component/Card";
import img from "../assets/empty.jpg";

function StudentCourses() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { courseData } = useSelector((state) => state.course);

  const enrolledCourseIds = useMemo(
    () => new Set((userData?.enrolledCourses || []).map((id) => String(id))),
    [userData]
  );

  const enrolledCourses = useMemo(
    () => (courseData || []).filter((course) => enrolledCourseIds.has(String(course._id))),
    [courseData, enrolledCourseIds]
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaArrowLeft
          className="w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl font-semibold">My Enrolled Courses</h1>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-4">
          <img src={img} alt="No courses" className="w-40 h-40 object-contain opacity-60" />
          <p className="text-gray-500 text-lg">You are not enrolled in any courses yet.</p>
          <button
            onClick={() => navigate("/allcourses")}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
          {enrolledCourses.map((course) => (
            <Card
              key={course._id}
              thumbnail={course.thumbnail}
              title={course.title}
              category={course.category}
              price={course.price}
              id={course._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentCourses;
