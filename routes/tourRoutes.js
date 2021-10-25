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
  getToursWithin,
} = require("../controllers/tourController");

const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");
const router = require("./reviewRoutes");

tourRoutes.use("/:tourId/reviews", reviewRouter);

tourRoutes.route("/tour-stats").get(getTourStats);

tourRoutes
  .route("/monthly-plan/:year")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    getMonthlyPlan
  );

tourRoutes.route("/top-5-cheap").get(aliasTopTour, getAllTours);

tourRoutes
  .route("/:id")
  .get(getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    deleteTour
  );

tourRoutes.post(
  "/new-tour",
  authController.protect,
  authController.restrictTo("admin"),
  createTour
);

tourRoutes.route("/").get(getAllTours);

module.exports = tourRoutes;
