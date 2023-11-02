import {
  getCoursesAnalytics,
  getOrdersAnalytics,
  getUserAnalytics,
} from "../controllers/analytics.controller";
import express from "express";

import { isAuthenticated, authorizeRoles } from "../middleware/auth";
const analyticsRouter = express.Router();

analyticsRouter.get(
  "/analytics-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserAnalytics
);
analyticsRouter.get(
  "/analytics-orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrdersAnalytics
);
analyticsRouter.get(
  "/analytics-courses",
  isAuthenticated,
  authorizeRoles("admin"),
  getCoursesAnalytics
);

export default analyticsRouter;
