const { promisify } = require("util");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check info login
  if (!email || !password) {
    return next(new AppError("Invalid email or password"), 400);
  }

  const user = await User.findOne({ email }).select("+password");

  // check password
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid information", 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // check token in header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Not logged in", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);

  // check user exist
  if (!freshUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }

  // check password changed
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please login again"),
      401
    );
  }

  req.user = freshUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    const user = req.user;

    if (roles.indexOf(user.role) === -1) {
      return next(new AppError("Your role is invalid", 403));
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("Not find email", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot pass, submit a PATCH: ${resetURL}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (10 mins)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "token sent to email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("There was error sending email", 500));
  }
  // res.status(200).json({
  //   data: {
  //     token: tokenRandom,
  //     user,
  //   },
  // });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({ passwordResetToken: hashedToken });

  // if token has not expired, and there is user, set the new password
  if (Date.now() > user.passwordResetExpires) {
    return next(new AppError("Token expired", 400));
  }
  user.password = req.body.password;

  // Update changedPasswordAt property for the user
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "Success",
    message: "Changed the password, login again",
  });
  // log the user in, send JWT
});
