import express from "express";

import { isAuthenticated, authorizeRoles } from "../middleware/auth";
import {
  editCourse,
  getAllCourses,
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

export default courseRouter;
