import express from "express";

import { authorizeRoles, isAuthenticated } from "../middleware/auth";

import {
  createOrder,
  getOrders,
  newPayment,
  sendStripePublishableKey,
} from "../controllers/order.controller";

const orderRouter = express.Router();
//order
orderRouter.post("/create-order", isAuthenticated, createOrder);

orderRouter.get(
  "/all-orders-admin",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrders
);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);
orderRouter.post("/payment", isAuthenticated, newPayment);

export default orderRouter;
