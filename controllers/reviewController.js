import Review from "../models/reviewModel.js";
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from "./handlerFactory.js";

export const getAllReviews = getAll(Review);

export function setTourUserId(req, res, next) {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user;

  next();
}

export const getReview = getOne(Review);

export const newReview = createOne(Review);

export const deleteReview = deleteOne(Review);

export const updateReview = updateOne(Review);
