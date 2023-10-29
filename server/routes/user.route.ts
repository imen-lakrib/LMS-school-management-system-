import express from "express";
import { registrationUser, activateUser } from "../controllers/user.controller";

const useRouter = express.Router();

useRouter.post("/registration", registrationUser);
useRouter.post("/activate-user", activateUser);

export default useRouter;
