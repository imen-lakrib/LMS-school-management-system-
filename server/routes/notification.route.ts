import express from "express";

import { isAuthenticated, authorizeRoles } from "../middleware/auth";
import {
  getNotifications,
  updateNotifications,
} from "../controllers/notification.controller";

const notificationRouter = express.Router();

//course
notificationRouter.get(
  "/get-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);

notificationRouter.put(
  "/update-notifications/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotifications
);

export default notificationRouter;
