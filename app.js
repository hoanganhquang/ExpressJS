const express = require("express");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSantitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");

const tourRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const viewRouters = require("./routes/viewRouters");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errController");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "err",
});

app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use(mongoSantitize());

app.use(xss());

app.use(hpp());

// app.use((req, res, next) => {
//   req.requestTime = new Date().toString();
//   next();
// });

app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/", viewRouters);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
