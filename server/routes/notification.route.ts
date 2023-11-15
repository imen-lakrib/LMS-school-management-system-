import express from "express";

import { isAuthenticated, authorizeRoles } from "../middleware/auth";
import {
  getNotifications,
  updateNotifications,
} from "../controllers/notification.controller";
import { updateAccessToken } from "../controllers/user.controller";

const notificationRouter = express.Router();

//course
notificationRouter.get(
  "/get-notifications",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);

notificationRouter.put(
  "/update-notifications/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotifications
);

export default notificationRouter;
