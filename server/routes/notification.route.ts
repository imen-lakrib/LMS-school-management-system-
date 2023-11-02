import express from "express";

import { isAuthenticated, authorizeRoles } from "../middleware/auth";
import { getNotifications } from "../controllers/notification.controller";

const notificationRouter = express.Router();
//course
notificationRouter.get(
  "/get-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);

export default notificationRouter;
