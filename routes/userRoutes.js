const userRoutes = require("express").Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

userRoutes.post("/signup", authController.signup);

userRoutes.post("/login", authController.login);

userRoutes.post("/forgotPassword", authController.forgotPassword);

userRoutes.patch("/resetPassword/:token", authController.resetPassword);

userRoutes.route("/").get(userController.getAllUsers);

module.exports = userRoutes;
