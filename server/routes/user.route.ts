import express from "express";
import {
  registrationUser,
  activateUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateMyAccount,
  updatePassword,
} from "../controllers/user.controller";
import { isAuthenticated, authorizeRoles } from "../middleware/auth";

const useRouter = express.Router();
//Auth
useRouter.post("/registration", registrationUser);
useRouter.post("/activate-user", activateUser);
useRouter.post("/login", loginUser);
useRouter.get("/logout", isAuthenticated, logoutUser);
useRouter.get("/refreshtoken", updateAccessToken);
useRouter.get("/me", isAuthenticated, getUserInfo);
useRouter.post("/socialauth", socialAuth);
useRouter.post("/update-my-account", isAuthenticated, updateMyAccount);
useRouter.put("/update-password", isAuthenticated, updatePassword);

//Course

export default useRouter;
