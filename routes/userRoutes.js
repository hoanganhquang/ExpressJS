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

userRoutes.delete(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  userController.deleteUser
);

userRoutes.patch(
  "/:id",
  authController.protect,
  authController.restrictTo("admin"),
  userController.updateUser
);

userRoutes.delete("/deleteMe", authController.protect, userController.deleteMe);

userRoutes.post("/updateMe", authController.protect, userController.updateMe);

userRoutes.route("/").get(userController.getAllUsers);

module.exports = userRoutes;
