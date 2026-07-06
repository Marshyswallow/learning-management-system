import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import img from "../../assets/empty.jpg";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { setCreatorCourseData } from "../../redux/courseSlice";
import { useDispatch } from "react-redux";

function Courses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [course, setCourses] = useState([]);
  const { creatorCourseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    if (!userData) return;
  
    const creatorCourses = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}api/course/creatorCourses`,
          { withCredentials: true }
        );
  
        console.log("Fetched Courses:", result.data);
  
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
  
    creatorCourses();
  }, [userData, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div className="flex items-center gap-3">
          <FaArrowLeft
            className="w-[22px] h-[22px] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl font-semibold">Courses</h1>
        </div>
        <button
          onClick={() => navigate("/createcourses")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Create course
        </button>
      </div>

      {/* table */}
      <div className="hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4">Courses</th>
              <th className="text-left py-3 px-4">Prices</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {creatorCourseData?.map((course, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-3 px-4 flex items-center gap-4">
                  {course?.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt=""
                      className="w-24 h-14 object-cover rounded-md"
                    />
                  ) : (
                    <img
                      src={img}
                      alt=""
                      className="w-24 h-14 object-cover rounded-md"
                    />
                  )}
                  <span>{course.title}</span>
                </td>
                {course?.price ? (
                  <td className="px-4 py-3">{course.price}</td>
                ) : (
                  <td className="px-4 py-3">₹ Na</td>
                )}
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      course.published
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    } `}
                  >
                    {course.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <FaRegEdit
                    onClick={() => navigate(`/editcourse/${course._id}`)}
                    className="text-gray-600 hover:text-blue-600 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {creatorCourseData?.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={course?.thumbnail || img}
                alt=""
                className="w-20 h-14 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="font-medium">{course.title}</p>
                <p className="text-gray-500 text-sm">
                  {course?.price ? `₹ ${course.price}` : "₹ Na"}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  course.published
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {course.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => navigate(`/editcourse/${course._id}`)}
                className="text-sm px-3 py-1 border rounded-md hover:bg-gray-50"
              >
                Edit
              </button>
              <button className="text-sm px-3 py-1 border rounded-md text-red-600 hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
