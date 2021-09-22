const express = require("express");
const morgan = require("morgan");
const tourRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errController");

app.use(express.json());
app.use(morgan("dev"));
// app.use(express.static(`${__dirname}/`))

app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
