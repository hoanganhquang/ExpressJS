const userRoutes = require("express").Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

userRoutes.post("/signup", authController.signup);

userRoutes.post("/login", authController.login);

userRoutes.post("/forgotPassword", authController.forgotPassword);

userRoutes.patch("/resetPassword/:token", authController.resetPassword);

// authentication
userRoutes.use(authController.protect);

userRoutes.patch("/updatePassword", authController.updatePassword);

userRoutes.get("/me", userController.getMe, userController.getUser);

userRoutes.delete("/deleteMe", userController.deleteMe);

userRoutes.post("/updateMe", userController.updateMe);

// authorization
userRoutes.use(authController.restrictTo("admin"));

userRoutes.delete("/:id", userController.deleteUser);

userRoutes.patch("/:id", userController.updateUser);

userRoutes.get("/:id", userController.getUser);

userRoutes.route("/").get(userController.getAllUsers);

module.exports = userRoutes;
