import {
  getCoursesAnalytics,
  getOrdersAnalytics,
  getUserAnalytics,
} from "../controllers/analytics.controller";
import express from "express";

import { isAuthenticated, authorizeRoles } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controller";
const analyticsRouter = express.Router();

analyticsRouter.get(
  "/analytics-users",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getUserAnalytics
);
analyticsRouter.get(
  "/analytics-orders",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getOrdersAnalytics
);
analyticsRouter.get(
  "/analytics-courses",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getCoursesAnalytics
);

export default analyticsRouter;
