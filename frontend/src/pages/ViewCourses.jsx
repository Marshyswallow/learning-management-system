import React, { useEffect } from "react";
import { FaArrowLeft, FaCheckCircle, FaPlayCircle, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCourse } from "../redux/courseSlice";
import img from "../assets/empty.jpg";

function ViewCourses() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const { courseData, selectedCourse } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    if (!courseData?.length) return;

    const foundCourse = courseData.find(
      (course) => course._id === courseId
    );

    dispatch(setSelectedCourse(foundCourse || null));
  }, [courseData, courseId, dispatch]);

  if (!selectedCourse) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
        <h1 className="text-xl font-semibold">Course not found</h1>

        <button
          onClick={() => navigate(-1)}
          className="rounded-md bg-black px-5 py-2 text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-8 rounded-xl bg-white p-6 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <FaArrowLeft />
          Back
        </button>

        <section className="grid gap-8 md:grid-cols-2">
          <img
            src={selectedCourse.thumbnail || img}
            alt={selectedCourse.title}
            className="h-[320px] w-full rounded-xl object-cover"
          />

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedCourse.title}
            </h1>

            <p className="mt-2 text-lg capitalize text-gray-500">
              {selectedCourse.category}
            </p>

            <div className="mt-4 flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <span className="text-gray-600">
                {selectedCourse.rating || 0} (0 reviews)
              </span>
            </div>

            <p className="mt-3 text-2xl font-bold">
              ₹{selectedCourse.price}
            </p>

            <div className="mt-5 space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                10+ hours of video content
              </p>

              <p className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Lifetime access to course materials
              </p>
            </div>

            <button className="mt-6 w-fit rounded-md bg-black px-6 py-3 font-semibold text-white">
              Enroll Now
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">What You'll Learn</h2>
          <p className="mt-3 text-gray-600">
            {selectedCourse.whatYouWillLearn ||
              "Learn practical concepts from beginner to advanced level."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Requirements</h2>
          <p className="mt-3 text-gray-600">
            {selectedCourse.requirements ||
              "Basic programming knowledge is helpful but not required."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Who This Course is For</h2>
          <p className="mt-3 text-gray-600">
            Beginners, aspiring developers, and professionals looking to upgrade skills.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="min-h-[300px] rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold">Course Curriculum</h2>
            <p className="mt-1 text-gray-500">
              {selectedCourse.lectures?.length || 0} Lectures
            </p>

            <div className="mt-5 space-y-3">
              {selectedCourse.lectures?.map((lecture, index) => (
                <button
                  key={lecture._id || index}
                  className="flex w-full items-center gap-3 rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50"
                >
                  <FaPlayCircle />
                  {lecture.title}
                </button>
              ))}

              {!selectedCourse.lectures?.length && (
                <p className="text-gray-500">No lectures available.</p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex h-64 items-center justify-center rounded-xl bg-black text-white">
              Select a preview lecture to watch
            </div>

            <h3 className="mt-5 text-xl font-bold">Lecture Title</h3>
            <p className="mt-1 text-gray-500">{selectedCourse.title}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ViewCourses;