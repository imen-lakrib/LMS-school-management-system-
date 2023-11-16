import express from "express";
import {
  registrationUser,
  activateUser,
  loginUser,
  logoutUser,
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
// useRouter.get("/refreshtoken", updateAccessToken);
useRouter.post("/login", loginUser);
useRouter.post("/socialauth", socialAuth);

useRouter.get("/me", isAuthenticated, getUserInfo);
useRouter.post("/update-my-account", isAuthenticated, updateMyAccount);
useRouter.put("/update-password", isAuthenticated, updatePassword);
useRouter.put("/update-picture", isAuthenticated, updateMyPicture);
useRouter.get("/logout", isAuthenticated, logoutUser);

useRouter.get(
  "/all-users-admin",
  isAuthenticated,
  authorizeRoles("admin"),
  getUsers
);

useRouter.put(
  "/update-user-role",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);

useRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default useRouter;
