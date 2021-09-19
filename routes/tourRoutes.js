const tourRoutes = require("express").Router();
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTour,
  getTourStats,
} = require("../controllers/tourController");

tourRoutes.route("/tour-stats").get(getTourStats);
tourRoutes.route("/top-5-cheap").get(aliasTopTour, getAllTours);
tourRoutes.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
tourRoutes.route("/").get(getAllTours).post(createTour);

module.exports = tourRoutes;
