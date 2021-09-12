const tourRoutes = require("express").Router();
const {
  getAllTours,
  getTour,
  checkID,
} = require("../controllers/tourController");

tourRoutes.param("id", checkID);

tourRoutes.route("/").get(getAllTours);
tourRoutes.route("/:id").get(getTour);

module.exports = tourRoutes;
