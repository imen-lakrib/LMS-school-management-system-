require("dotenv").config();

import { NextFunction, Request, Response } from "express";

import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { IOrder } from "../models/order.model";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import NotificationModel from "../models/notification.model";

import ejs from "ejs";
import path from "path";
import sendEmail from "../utils/sendMail";
import { getAllOrders, newOrder } from "../services/order.service";

// create order:
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get info from body
      const { courseId, payment_info } = req.body as IOrder;

      // find user:
      const user = await userModel.findById(req.user?._id);

      // check if this user purshised this course or not -- TO NOT PURSHASE THE SAME COURSE AGAIN--
      const isCourseExistsInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (isCourseExistsInUser) {
        return next(
          new ErrorHandler("You have already purchased this course!", 400)
        );
      }

      //search for course
      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found!", 400));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      // send mail to the client :
      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendEmail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }

      // after sending email to the client -- update user courses list
      user?.courses.push(course?._id);

      await user?.save();

      // then in the same time we gonna send notification to the admin:
      await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You have a new order for "${course.name}"`,
      });

      // increase purchased by 1:
      course.purchased ? (course.purchased += 1) : course.purchased;

      await course.save();

      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get all orders
export const getOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrders(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
