import express from "express";
import {
  userLogin,
  registerUser,
  getMyProfile,
  logoutUser,
} from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", userLogin);

userRouter.get("/logout", logoutUser);

userRouter.get("/details", isAuthenticated, getMyProfile);

export default userRouter;

/**Keep dynamic routes at the end of all the routes */
