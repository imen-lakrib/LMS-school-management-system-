import express from "express";

import { isAuthenticated, authorizeRoles } from "../middleware/auth";
import { editCourse, uploadCourse } from "../controllers/course.controller";

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

export default courseRouter;
