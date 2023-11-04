// protect route:
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

//authenticated user
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;
    console.log("middleware protect cookies", req.cookies);
    if (!access_token) {
      //user not logged in
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }
    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decoded) {
      //not valid
      return new ErrorHandler("Access token is not valid", 400);
    }

    //search the user in redis cuz we stored our data in redis cache
    const user = await redis.get(decoded.id);

    if (!user) {
      return new ErrorHandler("Please login to access this resourse", 400);
    }
    req.user = JSON.parse(user);
    // here probably user type not defind so craete folder @types to declare his type
    next();
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
