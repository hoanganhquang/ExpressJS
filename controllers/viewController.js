import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Tour from "../models/tourModel.js";
import User from "../models/userModel.js";
import Booking from "../models/bookingModel.js";

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

  if (!tour) {
    return next(new AppError("Tour valid", 404));
  }

  res.status(200).render("tour", {
    tour,
  });
});

export const login = catchAsync(async (req, res, next) => {
  res.status(200).render("login");
});

export const getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Account",
  });
};

export const getMyTours = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });

  const tourIDs = bookings.map((el) => el.tour);

  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render("overview", {
    title: "My Tours",
    tours,
  });
});

export const updateUserDate = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render("account", {
    title: "Your account",
    user,
  });
});
