const User = require("../models/userModel");
const Payment = require("../models/paymentModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");

exports.getUser = catchAsync(async (req, res, next) => {
  // find the user based on locale and role
  let user = await factory.findUsers(User, req.query.locale, req.query.role);
  if (user.length === 0) {
    return next(new AppError("No users found.", 404));
  }
  res.status(200).json({
    data: user,
  });
});

exports.getExpiredDate = catchAsync(async (req, res, next) => {
  let filter = {
    name: req.query.grader,
  };
  let payment = await Payment.findOne(filter);
  if (!payment) {
    return next(new AppError("No such payment found.", 404));
  }
  res.status(200).json({
    data: payment.expired,
  });
});
