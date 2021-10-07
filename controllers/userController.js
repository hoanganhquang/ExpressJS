const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
});
