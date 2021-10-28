import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Tour from "../models/tourModel.js";
import User from "../models/userModel.js";

export const getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();

  res.status(200).render("overview", {
    title: "All tours",
    tours,
  });
});

export const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });

  res.status(200).render("tour", {
    tour,
  });
});

export const login = catchAsync(async (req, res, next) => {
  res.status(200).render("login");
});
