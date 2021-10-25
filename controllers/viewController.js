const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Tour = require("../models/tourModel");

exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();

  res.status(200).render("overview", {
    title: "All tours",
    tours,
  });
});
