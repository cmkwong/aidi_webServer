const catchAsync = require("../utils/catchAsync");
const Version = require("../models/versionModel");

exports.getVersion = catchAsync(async (req, res, next) => {
  let version = await Version.findOne({});
  res.status(200).json({
    data: version,
  });
});
