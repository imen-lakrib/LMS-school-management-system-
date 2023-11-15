import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controller";
import express from "express";

import { isAuthenticated, authorizeRoles } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controller";
const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);

layoutRouter.put(
  "/edit-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  editLayout
);
layoutRouter.get("/get-layout", getLayoutByType);

export default layoutRouter;
