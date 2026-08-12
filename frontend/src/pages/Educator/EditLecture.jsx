import { useEffect, useState } from "react";
import axios from "axios";

import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../App";
import { ClipLoader } from "react-spinners";
import { updateLecture, removeLecture, setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";

function EditLecture() {
  const navigate = useNavigate();
  const { courseId, lectureId } = useParams();
  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);

  const [lectureTitle, setLectureTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  // Fetch this course's lectures if we don't already have them in redux
  useEffect(() => {
    const alreadyHave = lectureData?.some((l) => l._id === lectureId);
    if (alreadyHave || !courseId) return;

    const fetchLectures = async () => {
      setFetchLoading(true);
      try {
        const result = await axios.get(
          serverUrl + `api/lecture/courselecture/${courseId}`,
          { withCredentials: true }
        );
        // Adjust this line if your controller returns a different shape,
        // e.g. result.data.course.lectures or result.data directly
        dispatch(setLectureData(result.data.lectures ?? result.data));
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to load lecture");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchLectures();
  }, [courseId, lectureId, dispatch, lectureData]);

  // Pre-fill fields once lectureData has the lecture
  useEffect(() => {
    const existingLecture = lectureData?.find((l) => l._id === lectureId);
    if (existingLecture) {
      setLectureTitle(existingLecture.lectureTitle || "");
      setIsFree(existingLecture.isPreviewFree || false);
    }
  }, [lectureData, lectureId]);

  const handleUpdateLecture = async () => {
    setUpdateLoading(true);

    try {
      const formData = new FormData();
      formData.append("lectureTitle", lectureTitle);
      formData.append("isPreviewFree", isFree);
      if (videoFile) {
        formData.append("videoUrl", videoFile); // matches upload.single("videoUrl")
      }

      const result = await axios.post(
        serverUrl + `api/lecture/editlecture/${lectureId}`,
        formData,
        { withCredentials: true }
      );

      dispatch(updateLecture(result.data));
      toast.success("Lecture updated");
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleRemoveLecture = async () => {
    setRemoveLoading(true);

    try {
      await axios.delete(
        serverUrl + `api/lecture/removelecture/${lectureId}`,
        { withCredentials: true }
      );

      dispatch(removeLecture(lectureId));
      toast.success("Lecture removed");
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setRemoveLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-5">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-700 hover:text-black"
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Update Your Lecture</h1>
        </div>

        {fetchLoading && (
          <p className="text-sm text-gray-500 mb-4">Loading lecture...</p>
        )}

        {/* Remove Lecture */}
        <button
          onClick={handleRemoveLecture}
          disabled={removeLoading}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition mb-8"
        >
          {removeLoading ? (
            <ClipLoader size={18} color="white" />
          ) : (
            "Remove Lecture"
          )}
        </button>

        {/* Title */}
        <label className="block font-semibold text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          className="w-full border rounded-lg px-5 py-3 outline-none focus:ring-2 focus:ring-black mb-6 " required
        />

        {/* Video */}
        <label className="block font-semibold text-gray-700 mb-2">
          Video <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-4 border rounded-lg px-3 py-2 mb-1">
          <label className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer text-sm font-medium">
            Choose File
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="hidden"
            />
          </label>
          <span className="text-gray-500 text-sm truncate">
            {videoFile ? videoFile.name : "No file chosen"}
          </span>
        </div>

        {/* Is Free */}
        <div className="flex items-center gap-2 mt-4 mb-8">
          <input
            type="checkbox"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-gray-700">Is this video FREE</label>
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdateLecture}
          disabled={updateLoading}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          {updateLoading ? (
            <ClipLoader size={24} color="white" />
          ) : (
            "Update Lecture"
          )}
        </button>
      </div>
    </div>
  );
}

export default EditLecture;
