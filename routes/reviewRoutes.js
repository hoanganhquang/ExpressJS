const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

router.use(authController.protect);

router.post(
  "/",
  authController.restrictTo("user"),
  reviewController.setTourUserId,
  reviewController.newReview
);

router.patch("/:id", reviewController.updateReview);

router.delete("/:id", reviewController.deleteReview);

router.get("/:id", reviewController.getReview);

router.get("/", reviewController.getAllReviews);

module.exports = router;
