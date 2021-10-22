const tourRoutes = require("express").Router();
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTour,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/tourController");

const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

tourRoutes.use("/:tourId/reviews", reviewRouter);

tourRoutes.route("/tour-stats").get(getTourStats);
tourRoutes.route("/monthly-plan/:year").get(getMonthlyPlan);
tourRoutes.route("/top-5-cheap").get(aliasTopTour, getAllTours);
tourRoutes
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    deleteTour
  );

tourRoutes.post("/new-tour", createTour);
tourRoutes.route("/").get(authController.protect, getAllTours);

module.exports = tourRoutes;
