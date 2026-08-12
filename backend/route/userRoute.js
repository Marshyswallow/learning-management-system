import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser, getEnrolledCourses, updateProfile } from "../controller/userController.js"
import upload from "../middleware/multer.js"


const userRouter = express.Router()

userRouter.get("/getcurrentuser",isAuth,getCurrentUser)
userRouter.get("/getenrolledcourses", isAuth, getEnrolledCourses)
userRouter.put("/update", isAuth, upload.single("photoUrl"), updateProfile)


export default userRouter
