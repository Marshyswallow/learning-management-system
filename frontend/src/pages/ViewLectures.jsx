import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft, FaPlayCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import img from "../assets/empty.jpg";

function ViewLectures() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}api/lecture/courselecture/${courseId}`,
          { withCredentials: true }
        );
        setCourse(result.data);
        setSelectedLecture(result.data.lectures?.[0] || null);
      } catch (error) {
        console.error("Unable to load lectures", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-100 text-gray-500">Loading course…</div>;
  }

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100">
        <p className="text-lg font-semibold">Course not found</p>
        <button onClick={() => navigate(-1)} className="rounded-md bg-black px-5 py-2 text-white">Go back</button>
      </div>
    );
  }

  const lectures = course.lectures || [];
  const instructor = Array.isArray(course.creator) ? course.creator[0] : course.creator;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-7 sm:px-7 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-sm bg-white p-5 shadow-sm sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(310px,1fr)]">
          <section className="rounded-2xl border border-gray-100 p-6 shadow-md">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} aria-label="Back" className="text-xl hover:text-gray-500"><FaArrowLeft /></button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
                <p className="mt-2 text-sm text-gray-500">Category: {course.category || "General"} <span className="ml-3">Level: {course.level || "Beginner"}</span></p>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl bg-black">
              {selectedLecture?.videoUrl ? (
                <video key={selectedLecture._id} controls autoPlay className="aspect-video w-full bg-black">
                  <source src={selectedLecture.videoUrl} />
                  Your browser does not support video playback.
                </video>
              ) : (
                <div className="flex aspect-video items-center justify-center text-center text-gray-300">Select a lecture to start watching</div>
              )}
            </div>
            <h2 className="mt-5 text-lg font-semibold text-gray-700">{selectedLecture?.lectureTitle || "No lecture selected"}</h2>
          </section>

          <aside className="h-fit rounded-2xl border border-gray-100 p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-800">All Lectures</h2>
            <div className="mt-5 space-y-3">
              {lectures.map((lecture, index) => (
                <button
                  key={lecture._id || index}
                  onClick={() => setSelectedLecture(lecture)}
                  className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left font-medium transition ${selectedLecture?._id === lecture._id ? "border-gray-400 bg-gray-100" : "border-gray-200 hover:bg-gray-50"}`}
                >
                  <span>{lecture.lectureTitle || `Lecture ${index + 1}`}</span>
                  <FaPlayCircle className="text-lg text-black" />
                </button>
              ))}
              {!lectures.length && <p className="text-sm text-gray-500">No lectures available.</p>}
            </div>

            <div className="mt-6 border-t border-gray-400 pt-5">
              <h3 className="font-semibold text-gray-700">Instructor</h3>
              <div className="mt-4 flex items-center gap-4">
                <img src={instructor?.photoUrl || img} alt={instructor?.name || "Instructor"} className="h-14 w-14 rounded-full border object-cover" />
                <div>
                  <p className="font-semibold text-gray-800">{instructor?.name || "Course Educator"}</p>
                  <p className="text-sm text-gray-500">{instructor?.role || "Educator"}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default ViewLectures;
