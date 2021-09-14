const tourRoutes = require("express").Router();
const {
  getAllTours,
  getTour,
  createTour,
} = require("../controllers/tourController");

tourRoutes.route("/").get(getAllTours).post(createTour);
tourRoutes.route("/:id").get(getTour);

module.exports = tourRoutes;
