const User = require("../model/user");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  //1) check if username and password exist
  if (!username || !password) {
    return next(new AppError(`Please provvide username & password`, 400));
  }

  //2) Check if username exist & password is correct
  const user = await User.findOne({ username: username }).select("+password");

  if (!username || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(`Incorrect username & password`, 401));
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
