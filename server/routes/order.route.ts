import express from "express";

import { authorizeRoles, isAuthenticated } from "../middleware/auth";

import { createOrder, getOrders } from "../controllers/order.controller";
import { updateAccessToken } from "../controllers/user.controller";

const orderRouter = express.Router();
//order
orderRouter.post(
  "/create-order",
  updateAccessToken,
  isAuthenticated,
  createOrder
);

orderRouter.get(
  "/all-orders-admin",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getOrders
);

export default orderRouter;
