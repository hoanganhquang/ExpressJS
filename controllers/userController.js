import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import * as factory from "./handlerFactory.js";

const filterObj = (obj, ...rest) => {
  const newOjb = {};
  Object.keys(obj).forEach((el) => {
    if (rest.includes(el)) {
      newOjb[el] = obj[el];
    }
  });

  return newOjb;
};

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: users,
  });
});

export function getMe(req, res, next) {
  req.params.id = req.user.id;
  next();
}

export const updateMe = catchAsync(async (req, res, next) => {
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

export const deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    data: null,
  });
});

export const getUser = factory.getOne(User);

export const deleteUser = factory.deleteOne(User);

export const updateUser = factory.updateOne(User);
