const catchAsync = require("../utils/catchAsync");
const Version = require("../models/versionModel");

exports.getVersion = catchAsync(async (req, res, next) => {
  let version = await Version.find({});
  console.log(version);
  res.status(200).json({
    data: version,
  });
});
