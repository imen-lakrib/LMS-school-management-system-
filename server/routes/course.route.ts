import express from "express";

import { isAuthenticated, authorizeRoles } from "../middleware/auth";
import { uploadCourse } from "../controllers/course.controller";

const courseRouter = express.Router();
//course
courseRouter.post(
  "/create-course", isAuthenticated,authorizeRoles("admin"),uploadCourse);

export default courseRouter;
