import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import LayoutModel from "../models/layout.model";
import cloudinary from "cloudinary";

// create layout
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await LayoutModel.findOne({ type });

      // so admin can create type just one time and then can update it
      if (isTypeExist) {
        return next(new ErrorHandler(`${type} already exist`, 400));
      }
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          image: { public_id: myCloud.public_id, url: myCloud.secure_url },
          title,
          subTitle,
        };

        await LayoutModel.create(banner);
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );

        await LayoutModel.create({ type: "FAQ", faq: faqItems });
      }

      if (type === "Qategories") {
        const { qategories } = req.body;

        const categoriesItems = await Promise.all(
          qategories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );

        await LayoutModel.create({
          type: "Qategories",
          qategories: categoriesItems,
        });
      }

      res.status(201).json({
        success: true,
        message: "layout successfully created",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
