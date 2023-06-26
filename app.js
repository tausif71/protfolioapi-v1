const express = require("express");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controller/error");
const userRoute = require("./routes/user");

const app = express();
app.use(express.json());

app.use("/api/user", userRoute);
app.all("*", (req, res, next) => {
  next(new AppError(`'Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
