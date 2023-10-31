import express from "express";

import { isAuthenticated, authorizeRoles } from "../middleware/auth";
import {
  addQuestion,
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";

const courseRouter = express.Router();
//course
courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);
courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);

courseRouter.get("/all-courses", getAllCourses);
courseRouter.get("/single-course/:id", getSingleCourse);
courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseByUser);
courseRouter.put("/add-question", isAuthenticated, addQuestion);

export default courseRouter;
