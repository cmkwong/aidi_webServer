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

exports.getHealthStatus = catchAsync(async (req, res, next) => {
  // checking version
  let admin_version;
  const versionData = await Version.findOne({});
  if (req.body.type === "clients") {
    admin_version = versionData.clients;
  } else {
    admin_version = versionData.checker;
  }
  if (admin_version !== req.body.user_version) {
    return next(new AppError("Version is not updated"), 500);
  }

  // checking payment
  let hr_left = -1;
  if (req.body.grader) {
    let payment = await Payment.findOne({ name: req.body.grader });
    if (payment) {
      console.log(payment.expired);
      hr_left =
        (Date.parse(payment.expired) - new Date().getTime()) / 60 / 60 / 1000;
    }
  }
  res.status(200).json({
    data: hr_left,
  });
});
