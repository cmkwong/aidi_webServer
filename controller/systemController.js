const catchAsync = require("../utils/catchAsync");
const Version = require("../models/versionModel");
const Payment = require("../models/paymentModel");
const AppError = require("../utils/appError");

exports.getVersion = catchAsync(async (req, res, next) => {
  const version = await Version.findOne({});
  res.status(200).json({
    data: version,
  });
});

exports.getClientsHealthStatus = catchAsync(async (req, res, next) => {
  // checking version
  const cur_version = await Version.findOne({});

  if (cur_version.clients !== req.body.user_version) {
    return next(new AppError("Version is not updated", 409));
  }

  // checking payment
  let hr_left = -1;
  let payment = await Payment.findOne({ name: req.body.grader });
  if (payment) {
    hr_left =
      (Date.parse(payment.expired) -
        8 * 60 * 60 * 1000 - // substract 8 hours because it is hongkong time
        new Date().getTime()) / // always return UTC time
      60 /
      60 /
      1000;
  }
  res.status(200).json({
    data: hr_left,
  });
});

exports.getCheckersHealthStatus = catchAsync(async (req, res, next) => {
  // checking version
  const cur_version = await Version.findOne({});

  if (cur_version.checker !== req.body.user_version) {
    return next(new AppError("Version is not updated", 409));
  }

  res.status(200).json({
    message: "Good",
  });
});
