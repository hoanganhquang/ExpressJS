const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Tour = require("../models/tourModel");
const User = require("../models/userModel");

exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();

  res.status(200).render("overview", {
    title: "All tours",
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });

  res.status(200).render("tour", {
    tour,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render("login");
});
