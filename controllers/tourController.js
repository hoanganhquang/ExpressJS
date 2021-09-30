const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.aliasTopTour = (req, res, next) => {
  req.query.limit = "1";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAvarage,summary,difficulty";
  next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  // let data = JSON.stringify(req.query);
  // data = data.replace(/\b(gt|lt)\b/g, (match) => `$${match}`);
  // data = JSON.parse(data);
  // let allTour = Tour.find(data);

  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(",").join(" ");
  //   allTour = allTour.sort(sortBy);
  // } else {
  //   allTour = allTour.sort("-createdAt");
  // }

  // if (req.query.fields) {
  //   const fields = req.query.fields.split(",").join(" ");
  //   allTour = allTour.select(fields);
  // }else {
  //   allTour = allTour.select('-__v');
  // }

  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 100;
  // const skip = (page - 1) * limit;

  // allTour = allTour.skip(skip).limit(limit);

  // if(req.query.page){
  //   const numTours = await Tour.countDocuments();
  //   if (skip >= numTours) throw new Error('This page is not exist');
  // }

  const API = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagtinate();
  const q = await API.query;

  res.status(200).json({
    status: "Success",
    data: {
      q,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    return next(new AppError("Not a tour ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(200).json({
    status: "Success",
    data: {
      tour: newTour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError("Not a tour ID"), 404);
  }
  res.status(200).json({
    status: "Success",
  });
});

exports.getTourStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: "$difficulty",
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
  const year = req.params.year * 1;

  const plan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numToursStarts: { $sum: 1 },
        tours: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: {
        numToursStarts: -1,
      },
    },
    {
      $limit: 1,
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      plan,
    },
  });
});
