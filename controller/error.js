const AppError = require("../utils/AppError");

const handleCastError = (err) => {
  let message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldErrorDB = (err) => {
  let message = `Duplicate tausif`;
  return new AppError(JSON.stringify(err), 400);
};

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
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 200;
  err.status = err.status || "error";

  if (process.env.NODE_ENVIRONMENT === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENVIRONMENT === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFieldErrorDB(error);

    sendErrorProd(error, res);
  }
};
