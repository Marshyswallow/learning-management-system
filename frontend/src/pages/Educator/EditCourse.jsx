import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaTrash, FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { CiFileOff } from "react-icons/ci";
import axios from "axios";
import emptyImg from "../../assets/empty.jpg";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { updateCourse, removeCourse } from "../../redux/courseSlice";

function EditCourse() {
  const navigate = useNavigate();
  const dispatch= useDispatch()
  const { courseId } = useParams();
  const [isPublished, setIsPublished] = useState(false);
  const [frontendImage, setFrontendImage] = useState(emptyImg);
  const [backendImage, setBackendImage] = useState(null);
  const [selectCourse, setSelectCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    level: "",
    price: "",
    thumbnail: "",
  });

  const categories = [
    "Web development",
    "UI UX designing",
    "App development",
    "Ethical hacking",
    "AI / ML",
    "Data science",
    "Data analytics",
    "AI tools",
  ];

  const getCourseById = async () => {
    console.log(`${serverUrl}api/course/getcoursebyid/${courseId}`, courseId);
    try {
      const result = await axios.get(
        `${serverUrl}api/course/getcoursebyid/${courseId}`,
        {
          withCredentials: true,
        }
      );
      console.log("API result:", result.data);
      setSelectCourse(result.data);
    } catch (error) {
      console.log("API Error:", error);
    }
  };

  useEffect(() => {
    getCourseById();
  }, []);

  useEffect(() => {
    if (selectCourse) {
      setCourseData({
        title: selectCourse.title || "",
        subTitle: selectCourse.subTitle || "",
        description: selectCourse.description || "",
        category: selectCourse.category || "",
        level: selectCourse.level || "",
        price: selectCourse.price || "",
        thumbnail: selectCourse.thumbnail || "",
      });
      setIsPublished(selectCourse.published || false);
      if (selectCourse.thumbnail) setFrontendImage(selectCourse.thumbnail);
    }
  }, [selectCourse]);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleEditCourse = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", courseData.title);
      formData.append("subTitle", courseData.subTitle);
      formData.append("description", courseData.description);
      formData.append("category", courseData.category);
      formData.append("level", courseData.level);
      formData.append("price", courseData.price);
      formData.append("published", isPublished);

      if (backendImage) {
        formData.append("thumbnail", backendImage);
      }

      const result = await axios.post(
        `${serverUrl}api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true }
      );

      console.log("Updated Course:", result.data);

      dispatch(updateCourse(result.data));

      toast.success("Course updated successfully");

      navigate("/courses"); // Go back to courses page
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleRemoveCourse = async () => {
    setLoading1(true);
    try {
      const result = await axios.delete(
        serverUrl + `api/course/remove/${courseId}`,
        { withCredentials: true }
      );
      console.log(result.data);
      dispatch(removeCourse(courseId));
      toast.success("Course Removed");
      navigate("/courses");
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FaArrowLeft
              className="cursor-pointer text-lg"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-2xl font-semibold">Edit Course</h1>
          </div>
          <button
            onClick={() => navigate("/lectures")}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
          >
            Go to Lectures
          </button>
        </div>

        {/* Top Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          {isPublished ? (
            <button
              onClick={() => setIsPublished((prev) => !prev)}
              className="flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 px-4 py-2.5 rounded-lg font-medium hover:bg-orange-100 transition-all duration-200"
            >
              <CiFileOff /> Unpublish Course
            </button>
          ) : (
            <button
              onClick={() => setIsPublished((prev) => !prev)}
              className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-2.5 rounded-lg font-medium hover:bg-green-100 transition-all duration-200"
            >
              <FaCloudUploadAlt /> Publish Course
            </button>
          )}
          <button
            className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-4 py-2.5 rounded-lg font-medium hover:bg-red-100 transition-all duration-200"
            onClick={handleRemoveCourse}
          >
            <FaTrash /> Delete Course
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleChange}
              placeholder="Enter course title"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Subtitle</label>
            {/* ✅ Fixed: name="subTitle" */}
            <input
              type="text"
              name="subTitle"
              value={courseData.subTitle}
              onChange={handleChange}
              placeholder="Enter subtitle"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>
            <textarea
              rows="5"
              name="description"
              value={courseData.description}
              onChange={handleChange}
              placeholder="Course description..."
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Category</label>
              <select
                name="category"
                value={courseData.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-3"
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Course Level
              </label>
              <select
                name="level"
                value={courseData.level}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-3"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={courseData.price}
                onChange={handleChange}
                placeholder="499"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block mb-3 text-sm font-medium">
              Course Thumbnail
            </label>
            <div className="relative w-[250px] h-[180px] border rounded-xl overflow-hidden">
              <img
                src={frontendImage}
                alt=""
                className="w-full h-full object-cover"
              />
              <label className="absolute top-3 right-3 bg-white p-2 rounded-full shadow cursor-pointer">
                <FaEdit />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleThumbnail}
                />
              </label>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => navigate(-1)}
              className="border px-5 py-2 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleEditCourse}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              {loading ? <ClipLoader size={30} color="white" /> : "save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
