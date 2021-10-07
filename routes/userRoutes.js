const userRoutes = require("express").Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

userRoutes.post("/signup", authController.signup);

userRoutes.post("/login", authController.login);

userRoutes.post("/forgotPassword", authController.forgotPassword);

userRoutes.patch("/resetPassword/:token", authController.resetPassword);

userRoutes.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

userRoutes.post("/updateMe", authController.protect, userController.updateMe);

userRoutes.delete("/deleteMe", authController.protect, userController.deleteMe);

userRoutes.route("/").get(userController.getAllUsers);

module.exports = userRoutes;
