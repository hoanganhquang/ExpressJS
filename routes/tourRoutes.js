const tourRoutes = require("express").Router();
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");

tourRoutes.route("/").get(getAllTours).post(createTour);
tourRoutes.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = tourRoutes;
