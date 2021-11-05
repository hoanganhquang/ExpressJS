import express from "express";
import * as authController from "../controllers/authController.js";
import * as bookingController from "../controllers/bookingController.js";

const router = express.Router();

router.use(authController.protect);

router.get(
  "/checkout-session/:tourID",
  authController.protect,
  bookingController.getCheckoutSession
);

router.use(authController.restrictTo("admin"));

router.post("/new-booking", bookingController.createBooking);

router.patch("/edit-booking/:id", bookingController.updateBooking);

router.delete("/:bookingId", bookingController.deleleBooking);

router.get("/", authController.protect, bookingController.getAllBookings);

export default router;
