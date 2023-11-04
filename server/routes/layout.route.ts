import { createLayout, editLayout } from "../controllers/layout.controller";
import express from "express";

import { isAuthenticated, authorizeRoles } from "../middleware/auth";
const layoutRouter = express.Router();

layoutRouter.post(
  "/create-lyout",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);


layoutRouter.put(
    "/edit-lyout",
    isAuthenticated,
    authorizeRoles("admin"),
    editLayout
  );

export default layoutRouter;
