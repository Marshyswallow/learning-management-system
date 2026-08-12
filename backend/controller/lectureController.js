import uploadOnCloudinary from "../config/cloudinary.js";
import Course from "../model/courseModel.js";
import Lecture from "../model/lectureModel.js"
import User from "../model/userModel.js";

const getCreatorId = (creator) =>
  String(Array.isArray(creator) ? creator[0]?._id || creator[0] : creator?._id || creator);

const getOwnedCourse = async (courseId, userId) => {
  const course = await Course.findById(courseId).populate("creator");
  if (!course || getCreatorId(course.creator) !== String(userId)) return null;
  return course;
};

// For Lecture

export const createLecture = async(req,res)=>{
  try {
   const  {lectureTitle} = req.body
   const {courseId} =req.params
   if (!lectureTitle || !courseId) {
    return res.status(400).json({
        message: "Lecture title and Course ID are required"
    });
}

   const course = await getOwnedCourse(courseId, req.userId);
   if (!course) return res.status(403).json({ message: "Only the course educator can manage lectures" });

   const lecture = await Lecture.create({lectureTitle})

   if(course){
    course.lectures.push(lecture._id)
   }
  await course.populate("lectures")
  await  course.save()
   return res.status(201).json({lecture,course})

  } catch (error) {

    return res
    .status(500)
    .json({ message: `failed to create lecture ${error}` });
    
  }
}


export const getCourseLecture = async (req,res) => {
  try {
    const {courseId} = req.params
    const course = await Course.findById(courseId).populate([
      { path: "lectures" },
      { path: "creator", select: "name email description photoUrl role" },
    ])

    if(!course){
      return res.status(404).json({message:"course is not found"})
    }

    const user = await User.findById(req.userId).select("enrolledCourses");
     const isCourseCreator = getCreatorId(course.creator) === String(req.userId);
    const isEnrolled = user?.enrolledCourses?.some(
      (enrolledCourseId) => String(enrolledCourseId) === String(courseId)
    );

    // Only preview lectures are exposed before enrolment. Do not return paid
    // lecture video URLs to a user who has not enrolled in the course.
    if (!isCourseCreator && !isEnrolled) {
      course.lectures.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.videoUrl = undefined;
        }
      });
    }

   return res.status(200).json(course)
  } catch (error) {
    return res
    .status(500)
    .json({ message: `failed to get course lecture ${error}` });
  }
}

export const editLecture = async (req,res) => {
  try {
    const {lectureId} = req.params
    const {isPreviewFree, lectureTitle}=req.body
     const lecture = await Lecture.findById(lectureId)
     if(!lecture){
       return res.status(404).json({message:"Lecture is not found"})
     }
     const course = await Course.findOne({ lectures: lectureId }).populate("creator");
     if (!course || getCreatorId(course.creator) !== String(req.userId)) {
       return res.status(403).json({ message: "Only the course educator can manage lectures" });
     }
    let videoUrl
    if(req.file){
      videoUrl = await uploadOnCloudinary(req.file.path)
      lecture.videoUrl = videoUrl
    }
    if(lectureTitle){
      lecture.lectureTitle = lectureTitle
    }
    lecture.isPreviewFree = isPreviewFree === "true" || isPreviewFree === true;

    await lecture.save()
    return res.status(200).json(lecture)
  } catch (error) {
    return res
    .status(500)
    .json({ message: `failed to edit lecture ${error}` });
  }
}

export const removeLecture = async (req,res) => {
  try {
    const {lectureId} = req.params
    const lecture = await Lecture.findById(lectureId)

     if(!lecture){
       return res.status(404).json({message:"lecture not found"})
     }
     const course = await Course.findOne({ lectures: lectureId }).populate("creator");
     if (!course || getCreatorId(course.creator) !== String(req.userId)) {
       return res.status(403).json({ message: "Only the course educator can manage lectures" });
     }
    await Course.updateOne(
      {lectures:lectureId},
      {$pull:{lectures:lectureId}}
    )
    await Lecture.findByIdAndDelete(lectureId);

    return res.status(200).json({message:"lecture is removed"})
  } catch (error) {
    return res
    .status(500)
    .json({ message: `failed to remove lecture ${error}` });
  }
}
