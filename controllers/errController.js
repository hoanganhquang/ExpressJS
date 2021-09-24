const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      error: err,
      message: err.message,
    });
  } else {
    console.log("Errorr", err);
    res.status(500).json({
      status: "err",
      message: "sth went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, send);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
};
