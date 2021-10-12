const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const filterObj = (obj, ...rest) => {
  const newOjb = {};
  Object.keys(obj).forEach((el) => {
    if (rest.includes(el)) {
      newOjb[el] = obj[el];
    }
  });

  return newOjb;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const filter = filterObj(req.body, "name", "email");
  const user = await User.findByIdAndUpdate(req.user.id, filter, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    data: null,
  });
});
