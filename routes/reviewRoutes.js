const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

router.post(
  "/",
  authController.protect,
  authController.restrictTo("user"),
  reviewController.newReview
);

router.delete("/:id", authController.protect, reviewController.deleteReview);

router.get("/", reviewController.getAllReviews);

module.exports = router;
