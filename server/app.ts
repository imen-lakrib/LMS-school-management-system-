import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import useRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";
require("dotenv").config();
export const app = express();

//body parser
app.use(express.json({ limit: "50mb" }));

//cookies parser
app.use(cookieParser());

//cors
app.use(
  cors({
    origin: ["http://localhost:3000", "https://res.cloudinary.com"],
    credentials: true,
  })
);

//routes:
app.use(
  "/api/v1",
  useRouter,
  courseRouter,
  orderRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter
);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Api is working well",
  });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`) as any;
  error.statusCode = 404;
  next(error);
});

app.use(ErrorMiddleware);
