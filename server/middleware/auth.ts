// protect route:
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { updateAccessToken } from "../controllers/user.controller";

//authenticated user
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
    console.log("middleware protect cookies", req.cookies);
    if (!access_token) {
      //user not logged in
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }
    const decoded = jwt.decode(access_token) as JwtPayload;

    if (!decoded) {
      //not valid
      return next(new ErrorHandler("Access token is not valid", 400));
    }

    //check if the access token is expired
    if (decoded.exp && decoded.exp <= Date.now() / 1000) {
      try {
        await updateAccessToken(req, res, next);
      } catch (error) {
        return next(error);
      }
    } else {
      //search the user in redis cuz we stored our data in redis cache
      const user = await redis.get(decoded.id);

      if (!user) {
        return next(
          new ErrorHandler("Please login to access this resourse", 400)
        );
      }
      req.user = JSON.parse(user);
      // here probably user type not defind so craete folder @types to declare his type
      next();
    }
  }
);

//Authorization roles
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allowed to access this resource`,
          400
        )
      );
    }

    next();
  };
};
