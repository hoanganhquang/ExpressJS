import express from "express";
const userRoutes = express.Router();
import {
  getMe,
  getUser,
  deleteMe,
  updateMe,
  deleteUser,
  updateUser,
  getAllUsers,
} from "../controllers/userController.js";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
  logout,
} from "../controllers/authController.js";

userRoutes.post("/signup", signup);

userRoutes.post("/login", login);

userRoutes.get("/logout", logout);

userRoutes.post("/forgotPassword", forgotPassword);

userRoutes.patch("/resetPassword/:token", resetPassword);

// authentication
userRoutes.use(protect);

userRoutes.patch("/updatePassword", updatePassword);

userRoutes.get("/me", getMe, getUser);

userRoutes.delete("/deleteMe", deleteMe);

userRoutes.post("/updateMe", updateMe);

// authorization
userRoutes.use(restrictTo("admin"));

userRoutes.delete("/:id", deleteUser);

userRoutes.patch("/:id", updateUser);

userRoutes.get("/:id", getUser);

userRoutes.route("/").get(getAllUsers);

export default userRoutes;
