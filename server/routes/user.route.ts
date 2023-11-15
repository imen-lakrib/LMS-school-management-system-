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
  updateMyPicture,
  getUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/user.controller";
import { isAuthenticated, authorizeRoles } from "../middleware/auth";

const useRouter = express.Router();
//Auth
useRouter.post("/registration", registrationUser);
useRouter.post("/activate-user", activateUser);
useRouter.get("/refreshtoken", updateAccessToken);
useRouter.post("/login", loginUser);
useRouter.post("/socialauth", socialAuth);

useRouter.get("/me", updateAccessToken, isAuthenticated, getUserInfo);
useRouter.post(
  "/update-my-account",
  updateAccessToken,
  isAuthenticated,
  updateMyAccount
);
useRouter.put(
  "/update-password",
  updateAccessToken,
  isAuthenticated,
  updatePassword
);
useRouter.put(
  "/update-picture",
  updateAccessToken,
  isAuthenticated,
  updateMyPicture
);
useRouter.get("/logout", updateAccessToken, isAuthenticated, logoutUser);

useRouter.get(
  "/all-users-admin",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getUsers
);

useRouter.put(
  "/update-user-role",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);

useRouter.delete(
  "/delete-user/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default useRouter;
