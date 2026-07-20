import React, { useEffect, useState } from "react";
import axios from "axios";

import { FaArrowLeft, FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../App";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";

function CreateLecture() {
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");
  const { courseId } = useParams();
  const [loading,setLoading] =useState(false)
  const dispatch =useDispatch()
  const {lectureData} = useSelector(state=>state.lecture)


  const handleCreateLecture = async () => {
    setLoading(true);
  
    try {
      const result = await axios.post(
        serverUrl + `api/lecture/createlecture/${courseId}`,
        { lectureTitle },
        { withCredentials: true }
      );
  
      console.log(result.data);
  
      dispatch(
        setLectureData([...lectureData, result.data.lecture])
      );
  
      setLectureTitle("");
      toast.success("Lecture added");
    } catch (error) {
      console.log(error);
  
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const result = await axios.get(
          serverUrl + `api/lecture/courselecture/${courseId}`,
          { withCredentials: true }
        );
        console.log(result.data);
        dispatch(setLectureData(result.data.lectures));
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to fetch lectures");
      }
    };
    getCourseLecture();
  }, [courseId]);

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-5">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">

        {/* Heading */}

        <h1 className="text-4xl font-bold">

          Let's Add a Lecture

        </h1>

        <p className="text-gray-500 mt-2">

          Enter the title and add your video lectures to enhance your course content.

        </p>

        {/* Input */}

        <input

          type="text"

          placeholder="e.g. Introduction to Mern Stack"

          value={lectureTitle}

          onChange={(e) => setLectureTitle(e.target.value)}

          className="w-full mt-8 border rounded-lg px-5 py-3 outline-none focus:ring-2 focus:ring-black"

        />

        {/* Buttons */}

        <div className="flex gap-4 mt-6">

          <button

            onClick={() => navigate(-1)}

            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition px-6 py-3 rounded-lg font-semibold"

          >

            <FaArrowLeft />

            Back to Course

          </button>

          <button

            onClick={handleCreateLecture}

            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
            disabled={loading}
          >

          {loading? <ClipLoader size={30} color="white"/> :" + Create Lecture"}
          </button>

        </div>

        {/* Lecture List */}

        <div className="mt-10 space-y-4">

          {lectureData?.map((lecture, index) => (

            <div

              key={index}

              className="bg-gray-100 rounded-lg px-6 py-5 flex justify-between items-center hover:bg-gray-200 transition"

            >

              <h2 className="font-semibold text-lg">

                Lecture - {index + 1}: {lecture.lectureTitle}

              </h2>

              <button className="text-gray-700 hover:text-black">

                <FaRegEdit size={20}  onClick={()=>navigate(`/editlecture/${courseId}/${lecture._id}`)}/>

              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default CreateLecture