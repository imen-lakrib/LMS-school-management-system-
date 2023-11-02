import { Response } from "express";
import { redis } from "../utils/redis";
import userModel from "../models/user.model";
// get user by id :
export const getUserById = async (id: string, res: Response) => {
  // use this in case we dont have redis  const user = await userModel.findById(id);
  // here cuz we have redis get info from redis not usermodel
  const userJson = await redis.get(id);

  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

// get all users:

export const getAllUsers = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    users,
  });
};
