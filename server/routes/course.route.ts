import express from "express";

import { isAuthenticated, authorizeRoles } from "../middleware/auth";
import {
  addAnswer,
  addQuestion,
  addReplayToReview,
  addReview,
  deleteCoure,
  editCourse,
  getAllCourses,
  getCourseByUser,
  getCourses,
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
courseRouter.put("/add-answer", isAuthenticated, addAnswer);
courseRouter.put("/add-review/:id", isAuthenticated, addReview);
courseRouter.put(
  "/add-review-replay",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplayToReview
);

courseRouter.get(
  "/all-courses-admin",
  isAuthenticated,
  authorizeRoles("admin"),
  getCourses
);

courseRouter.delete(
  "/delete-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCoure
);

export default courseRouter;
