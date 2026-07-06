import uploadOnCloudinary from "../config/cloudinary.js";
import Course from "../model/courseModel.js";

export const createCourse = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "title or category is required" });
    }
    const course = await Course.create({
      title,
      category,
      description,
      creator: req.userId,
    });
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: `create course error ${error}` });
  }
};

export const getPublishedCourse = async (req, res) => {
  try {
    const course = await Course.find({ published: true });
    if (!course) {
      return res.status(400).json({ message: `course is not found` });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to find isPublished ${error}` });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(400).json({ message: `courses is not found` });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to find creator courses${error}` });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, subTitle, description, category, published, level, price } =
      req.body;

    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Course is not found" });
    }

    const updateData = {
      title,

      subTitle,

      description,

      category,

      published,

      level,

      price,
    };

    if (thumbnail) {
      updateData.thumbnail = thumbnail;
    }

    course = await Course.findByIdAndUpdate(courseId, updateData,  {

      returnDocument: "after",
  
    });

    return res.status(200).json(course);
  } catch (error) {
    return res.status(400).json({ message: `failed to edit course ${error}` });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({
      message: `failed to get course ${error}`,
    });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: `Course is not found` });
    }
    course = await Course.findByIdAndDelete(courseId, {
      returnDocument: "after",
    });

    return res.status(200).json({

      message: "Course removed successfully",

    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to remove the course ${error}` });
  }
};

// For Lecture

export const createLecture = async(req,res)=>{
  try {
   const  {lectureTitle} = req.body
   const {courseId} =req.params

   if(lectureTitle || courseId){
    return res.status(400).json({message:"lecture title required"})
   }

   const lecture = await Lecture.create({lectureTitle})
   const course = await Course.findById(courseId)

   if(course){
    course.lectures.push(lecture._id)
   }
   

  } catch (error) {
    
  }
}
