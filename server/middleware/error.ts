// defind some error // calling errorhandler that accept 2 argements : message and statusCode

import ErrorHandler from "../utils/ErrorHandler";
import express, { NextFunction, Request, Response } from "express";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if satatus code is existing then take its value otherwise take 500, same with message
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error ";

  //Wrong mongoDb id error:  (ps: mongodb id called 'castError)
  if (err.name === "castError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try agian`;
    err = new ErrorHandler(message, 400);
  }

  //JWT expired error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired, try agian`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
