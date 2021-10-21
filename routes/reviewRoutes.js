const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

router.post(
  "/new-review",
  authController.protect,
  authController.restrictTo("user"),
  reviewController.newReview
);

router.get("/", reviewController.getAllReviews);

module.exports = router;
