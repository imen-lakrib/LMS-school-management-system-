import express from "express";
import {
  registrationUser,
  activateUser,
  loginUser,
} from "../controllers/user.controller";

const useRouter = express.Router();

useRouter.post("/registration", registrationUser);
useRouter.post("/activate-user", activateUser);
useRouter.post("/login", loginUser);

export default useRouter;
