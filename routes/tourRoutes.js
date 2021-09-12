const tourRoutes = require("express").Router();
const {
  getAllTours,
  getTour,
  checkID,
  checkBody,
  createTour,
} = require("../controllers/tourController");

tourRoutes.param("id", checkID);

tourRoutes.route("/").get(getAllTours).post(checkBody, createTour);
tourRoutes.route("/:id").get(getTour);

module.exports = tourRoutes;
