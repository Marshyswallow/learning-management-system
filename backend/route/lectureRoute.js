import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";

import {
  getCourseLecture,
  editLecture,
  removeLecture,
  createLecture,
} from "../controller/lectureController.js";

const lectureRouter = express.Router();

lectureRouter.post("/createlecture/:courseId", isAuth, createLecture);
lectureRouter.get("/courselecture/:courseId", isAuth, getCourseLecture);
lectureRouter.post(
  "/editlecture/:lectureId",
  isAuth,
  upload.single("videoUrl"),
  editLecture
);
lectureRouter.delete("/removelecture/:lectureId", isAuth, removeLecture);

export default lectureRouter;