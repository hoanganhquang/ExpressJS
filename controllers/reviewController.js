const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

exports.newReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user;

  const review = await Review.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.deleteReview = factory.deleteOne(Review);
