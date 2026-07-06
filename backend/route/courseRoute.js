import express from "express"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"
import { 
  createCourse,
  removeCourse, 
  getCourseById,
  editCourse,
  getCreatorCourses,
  getPublishedCourse
} from "../controller/courseController.js"

const courseRouter = express.Router()

courseRouter.post("/create", isAuth, upload.single("thumbnail"), createCourse)
courseRouter.get("/getpublished", getPublishedCourse)
courseRouter.get("/creatorCourses", isAuth, getCreatorCourses)
courseRouter.post("/editcourse/:courseId", isAuth, upload.single("thumbnail"), editCourse)
courseRouter.get("/getcoursebyid/:courseId", isAuth, getCourseById)
courseRouter.delete("/remove/:courseId", isAuth, removeCourse)

export default courseRouter