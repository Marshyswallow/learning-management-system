import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import img from "../../assets/empty.jpg";

function Dashboard() {
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  const totalCourses = creatorCourseData?.length || 0;

  const publishedCourses =
    creatorCourseData?.filter((course) => course.published).length || 0;

  const draftCourses = totalCourses - publishedCourses;

  const totalEarning =
    creatorCourseData?.reduce(
      (sum, course) => sum + (course.price || 0),
      0
    ) || 0;

  const stats = [
    { label: "Total Courses", value: totalCourses },
    { label: "Published", value: publishedCourses, green: true },
    { label: "Draft Courses", value: draftCourses },
    { label: "Total Earnings", value: `₹${totalEarning}` },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg bg-white hover:bg-gray-50"
        >
          ←
        </button>

        <span className="text-sm text-gray-500">Dashboard</span>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 mb-5 shadow-sm">
        <img
          src={userData?.photoUrl || "/default-avatar.png"}
          alt="profile"
          className="w-14 h-14 rounded-full object-cover border border-gray-200"
        />

        <div className="flex-1">
          <h2 className="text-[17px] font-semibold text-gray-900">
            Welcome, {userData?.name} 👋
          </h2>

          <p className="text-[13px] text-gray-400 mt-0.5 mb-1">
            {userData?.bio || "Educator"}
          </p>

          <p className="text-[13px] text-gray-500">
            Total Earnings:
            <span className="font-medium text-gray-800 ml-1">
              ₹{totalEarning}
            </span>
          </p>
        </div>

        <button
          onClick={() => navigate("/createcourses")}
          className="bg-black text-white text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
        >
          + Create Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {stats.map((item) => (
          <div key={item.label} className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-400 mb-1">{item.label}</p>

            <p
              className={`text-2xl font-semibold ${
                item.green ? "text-green-600" : "text-gray-900"
              }`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Courses Table */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-semibold text-gray-900">
            My Courses
          </h3>

          <button className="text-xs text-gray-400 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
            Filter
          </button>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Course</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {creatorCourseData?.length > 0 ? (
                creatorCourseData.map((course) => (
                  <tr
                    key={course._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={course.thumbnail || img}
                          alt={course.title}
                          className="w-24 h-14 rounded-md object-cover"
                        />

                        <span>{course.title}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      {course.price ? `₹${course.price}` : "₹ NA"}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          course.published
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {course.published ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <FaRegEdit
                        onClick={() =>
                          navigate(`/editcourse/${course._id}`)
                        }
                        className="text-gray-600 hover:text-blue-600 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-8 text-gray-500"
                  >
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex flex-col gap-4">
          {creatorCourseData?.length > 0 ? (
            creatorCourseData.map((course) => (
              <div
                key={course._id}
                className="bg-gray-50 rounded-xl p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={course.thumbnail || img}
                    alt=""
                    className="w-20 h-14 object-cover rounded-md"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{course.title}</p>

                    <p className="text-gray-500 text-sm">
                      {course.price ? `₹${course.price}` : "₹ NA"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      course.published
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {course.published ? "Published" : "Draft"}
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/editcourse/${course._id}`)
                    }
                    className="text-blue-600 text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No courses found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;