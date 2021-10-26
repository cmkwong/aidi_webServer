const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getUser = catchAsync(async (req, res, err) => {
  //
  let user = await factory.findUsers(User, req.query.locale, req.query.role);
  res.status(200).json({
    data: user,
  });
});
