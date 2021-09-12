const userRoutes = require("express").Router();
const {getAllUsers} = require("../controllers/userController");

userRoutes.route("/").get(getAllUsers);

module.exports = userRoutes;
