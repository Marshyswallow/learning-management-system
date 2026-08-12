import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaLock,
  FaPlayCircle,
  FaStar,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import Card from "../component/Card";
import img from "../assets/empty.jpg";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";

const creatorId = (creator) => (Array.isArray(creator) ? creator[0]?._id || creator[0] : creator?._id || creator);

function ViewCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${serverUrl}api/lecture/courselecture/${courseId}`,
          { withCredentials: true }
        );
        setCourse(response.data);
      } catch {
        // Keep the page usable with the published-course data if lecture loading fails.
        setCourse(courseData.find((item) => item._id === courseId) || null);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId, courseData]);

  const lectures = course?.lectures || [];
  const relatedCourses = useMemo(() => {
    if (!course) return [];
    const courseCreatorId = creatorId(course.creator);
    return courseData
      .filter((item) => item._id !== course._id && creatorId(item.creator) === courseCreatorId)
      ;
  }, [course, courseData]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500">Loading course…</div>;
  }

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
        <h1 className="text-xl font-semibold">Course not found</h1>
        <button onClick={() => navigate(-1)} className="rounded-md bg-black px-5 py-2 text-white">Go back</button>
      </div>
    );
  }

  const educator = Array.isArray(course.creator) ? course.creator[0] : course.creator;
  const educatorName = educator?.name || "Course educator";
  const currentUserId = userData?._id;
  const isCourseCreator = creatorId(course.creator) === currentUserId;
  const isEnrolled = userData?.enrolledCourses?.some(
    (enrolledCourse) => String(enrolledCourse?._id || enrolledCourse) === String(course._id)
  );
  const canPlayLecture = (lecture) => Boolean(
    isCourseCreator || isEnrolled || lecture?.isPreviewFree
  );
  const visibleLectures = isCourseCreator || isEnrolled
    ? lectures
    : lectures.filter((lecture) => lecture.isPreviewFree && lecture.videoUrl);
  const firstPlayableLecture = visibleLectures[0];
  const activeLecture = selectedLecture && visibleLectures.includes(selectedLecture)
    ? selectedLecture
    : firstPlayableLecture;

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      const orderResult = await axios.post(
        `${serverUrl}api/order/create`,
        { courseId: course._id },
        { withCredentials: true }
      );

      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      const razorpay = new window.Razorpay({
        key: orderResult.data.keyId,
        amount: orderResult.data.order.amount,
        currency: orderResult.data.order.currency,
        name: "LMS Course",
        description: course.title,
        order_id: orderResult.data.order.id,
        handler: async (payment) => {
          try {
            const result = await axios.post(
              `${serverUrl}api/order/verify`,
              { ...payment, courseId: course._id },
              { withCredentials: true }
            );
            dispatch(setUserData({
              ...userData,
              enrolledCourses: [...(userData?.enrolledCourses || []), course._id],
            }));
            const updatedCourse = await axios.get(
              `${serverUrl}api/lecture/courselecture/${course._id}`,
              { withCredentials: true }
            );
            setCourse(updatedCourse.data);
            toast.success(result.data.message);
          } catch (error) {
            toast.error(error.response?.data?.message || "Payment verification failed");
          }
        },
        theme: { color: "#000000" },
      });

      razorpay.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to start payment");
    } finally {
      setEnrolling(false);
    }
  };

  const handleWatchCourse = () => {
    navigate(`/viewlectures/${course._id}`);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-3 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <button onClick={() => navigate(-1)} className="mb-5 flex items-center gap-2 text-lg font-semibold hover:text-gray-600">
          <FaArrowLeft /> Back
        </button>

        <section className="grid gap-8 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <img src={course.thumbnail || img} alt={course.title} className="h-64 w-full rounded-xl object-cover sm:h-80" />
          <div>
            <h1 className="text-3xl font-bold text-gray-950 sm:text-4xl">{course.title}</h1>
            <p className="mt-3 text-lg text-gray-500">{course.subTitle || course.category}</p>
            <div className="mt-4 flex items-center gap-2 text-gray-500"><FaStar className="text-yellow-400" /><span>0 (0 reviews)</span></div>
            <p className="mt-3 text-2xl font-bold">₹{course.price || 0}</p>
            <div className="mt-6 space-y-3 text-gray-600">
              <p className="flex items-center gap-2"><FaCheckCircle className="text-green-400" />{lectures.length || "10+"}+ hours of video content</p>
              <p className="flex items-center gap-2"><FaCheckCircle className="text-green-400" />Lifetime access to course materials</p>
            </div>
            <button onClick={isEnrolled || isCourseCreator ? handleWatchCourse : handleEnroll} disabled={enrolling} className="mt-7 rounded-md bg-black px-7 py-3 font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400">
              {isEnrolled || isCourseCreator
                ? "Watch videos"
                : enrolling
                  ? "Opening payment..."
                  : "Enroll to watch videos"}
            </button>
          </div>
        </section>

        <section className="mt-10 space-y-7 border-b border-gray-300 pb-8 text-gray-600">
          <div><h2 className="text-2xl font-bold text-gray-900">What You’ll Learn</h2><p className="mt-3 leading-7">{course.description || "Learn practical, job-ready skills with guided lessons and projects."}</p></div>
          <div><h2 className="text-2xl font-bold text-gray-900">Requirements</h2><p className="mt-3">Basic programming knowledge is helpful but not required.</p></div>
          <div><h2 className="text-2xl font-bold text-gray-900">Who This Course is For</h2><p className="mt-3">Beginners, aspiring developers, and professionals looking to upgrade skills.</p></div>
        </section>

        <section className="grid gap-6 py-8 lg:grid-cols-2">
          <div className="min-h-[310px] rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Course Curriculum</h2>
            <p className="mt-1 text-gray-500">{visibleLectures.length} Available Lectures</p>
            {!isEnrolled && !isCourseCreator && (
              <p className="mt-3 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
                Watch the free preview videos below. Enroll to unlock the complete course.
              </p>
            )}
            <div className="mt-5 space-y-3">
              {visibleLectures.length ? visibleLectures.map((lecture, index) => (
                <button key={lecture._id || index} onClick={() => setSelectedLecture(lecture)} className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition ${activeLecture?._id === lecture._id ? "border-black bg-gray-50" : "border-gray-200 hover:bg-gray-50"}`}>
                  {canPlayLecture(lecture) ? <FaPlayCircle className="text-gray-600" /> : <FaLock className="text-gray-500" />}
                  <span>
                    {lecture.lectureTitle || lecture.title || `Lecture ${index + 1}`}
                    {lecture.isPreviewFree && <small className="ml-2 text-green-600">Free preview</small>}
                  </span>
                  {!canPlayLecture(lecture) && <span className="ml-auto text-xs font-medium text-gray-500">Locked</span>}
                </button>
              )) : <p className="rounded-lg border border-dashed p-4 text-gray-500">Free preview videos will be added soon.</p>}
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            {activeLecture?.videoUrl && canPlayLecture(activeLecture) ? <video key={activeLecture._id} controls className="aspect-video w-full rounded-xl bg-black"><source src={activeLecture.videoUrl} /></video> : <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-xl bg-black p-6 text-center text-white">{activeLecture ? <><FaLock className="text-2xl" /><span>This lecture is locked. Enroll in the course to watch it.</span></> : "Select a preview lecture to watch"}</div>}
            <h3 className="mt-5 text-xl font-bold">{activeLecture?.lectureTitle || activeLecture?.title || "Lecture Title"}</h3>
            <p className="mt-1 text-gray-500">{course.title}</p>
          </div>
        </section>

        <section className="border-t border-gray-300 py-8">
          <h2 className="text-2xl font-bold">Write a Review</h2>
          <div className="mt-3 flex gap-1">{[1, 2, 3, 4, 5].map((star) => <button key={star} onClick={() => setRating(star)} aria-label={`${star} star rating`}><FaStar className={star <= rating ? "text-yellow-400" : "text-gray-200"} /></button>)}</div>
          <textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Write your comment here…" className="mt-4 min-h-28 w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-black" />
          <button disabled={!rating || !comment.trim()} className="mt-4 rounded-md bg-black px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300">Submit Review</button>
        </section>

        <section className="border-t border-gray-300 pt-7">
          <div className="flex items-center gap-4"><img src={educator?.photoUrl || img} alt="" className="h-14 w-14 rounded-full object-cover" /><div><h2 className="text-lg font-bold">{educatorName}</h2><p className="text-gray-500">Educator</p></div></div>
          {relatedCourses.length > 0 && <><h2 className="mt-6 text-2xl font-bold">Other Published Courses by the Educator</h2><div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{relatedCourses.map((item) => <Card key={item._id} thumbnail={item.thumbnail} title={item.title} category={item.category} price={item.price} id={item._id} />)}</div></>}
        </section>
      </div>
    </main>
  );
}

export default ViewCourses;
