import express from "express";
const router = express.Router({ mergeParams: true });

import {
  setTourUserId,
  newReview,
  updateReview,
  deleteReview,
  getReview,
  getAllReviews,
} from "../controllers/reviewController.js";
import * as authController from "../controllers/authController.js";

router.use(authController.protect);

router.post("/", authController.restrictTo("user"), setTourUserId, newReview);

router.patch("/:id", updateReview);

router.delete("/:id", deleteReview);

router.get("/:id", getReview);

router.get("/", getAllReviews);

export default router;
