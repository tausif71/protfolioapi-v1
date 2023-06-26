const User = require("../model/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.CreateNewUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    createdAt: Date.now,
    result: newUser,
  });
});

exports.GetAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (users.length == 0) {
    return next(new AppError(`no users found yet`, 404));
  }
  res.status(200).json({
    status: "success",
    createdAt: Date.now,
    result: users,
  });
});

exports.GetUsersByID = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError(`user not found with ID = ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: "success",
    createdAt: Date.now,
    result: user,
  });
});

exports.UpdateUserByID = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!user) {
    return next(new AppError(`user not found with ID = ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: "success",
    createdAt: Date.now,
    result: user,
  });
});
