import express from "express";
const tourRoutes = express.Router();
import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTour,
  getTourStats,
  getMonthlyPlan,
  // getToursWithin,
} from "../controllers/tourController.js";

import { protect, restrictTo } from "../controllers/authController.js";
import reviewRouter from "./reviewRoutes.js";
// import router from "./reviewRoutes";

tourRoutes.use("/:tourId/reviews", reviewRouter);

tourRoutes.route("/tour-stats").get(getTourStats);

tourRoutes
  .route("/monthly-plan/:year")
  .get(protect, restrictTo("admin"), getMonthlyPlan);

tourRoutes.route("/top-5-cheap").get(aliasTopTour, getAllTours);

tourRoutes
  .route("/:id")
  .get(getTour)
  .patch(protect, restrictTo("admin", "lead-guide"), updateTour)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);

tourRoutes.post("/new-tour", protect, restrictTo("admin"), createTour);

tourRoutes.route("/").get(getAllTours);

export default tourRoutes;
