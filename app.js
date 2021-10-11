const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSantitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const mongoose = require("mongoose");

const rateLimit = require("express-rate-limit");
const tourRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errController");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = express();

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => console.log("DB connection successful"))
  .catch((err) => console.log(err));

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
// app.use(express.static(`${__dirname}/`))

app.use((req, res, next) => {
  req.requestTime = new Date().toString();
  next();
});

app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
