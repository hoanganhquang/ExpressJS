import { Router } from "express";
import * as bookingController from "../controllers/bookingController.js";
import {
  login,
  getTour,
  getOverview,
  getAccount,
  updateUserDate,
  getMyTours,
} from "../controllers/viewController.js";
import { isLoggedIn, protect } from "../controllers/authController.js";

const router = Router();

router.get("/login", isLoggedIn, login);

router.get("/tour/:slug", isLoggedIn, getTour);

router.get("/me", protect, getAccount);

router.post("/submit-user-data", protect, updateUserDate);

router.get("/my-tours", protect, getMyTours);

router.get(
  "/",
  bookingController.createBookingCheckout,
  isLoggedIn,
  getOverview
);

export default router;
