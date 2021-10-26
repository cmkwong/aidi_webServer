const Project = require("../models/projectModel");
const GhostProjects = require("../models/ghostProjectModel");
const PrjStatus = require("../models/prjStatusModel");
const catchAsync = require("../utils/catchAsync");

exports.updateProjectStatus = catchAsync(async (req, res, next) => {
  filter = {
    project_id: req.body.project_id,
    locale: req.body.locale,
  };

  // count the document to check if project status exist
  const count = await PrjStatus.countDocuments(filter);

  // if not existed, create new document and update
  let prjStatus;
  if (count === 0) {
    prjStatus = new PrjStatus({ status: {} }); // define the empty dictionary here https://mongoosejs.com/docs/schematypes.html#maps
    prjStatus.project_id = req.body.project_id;
    prjStatus.locale = req.body.locale;
    // otherwise, find the required document and update
  } else {
    prjStatus = await PrjStatus.findOne(filter);
  }

  // update the document
  prjStatus.status.set(req.body.grader, Date.now()); // https://mongoosejs.com/docs/schematypes.html#maps

  // update mongoDB
  await prjStatus.save();

  // send successful message
  res.status(200).json({
    status: "success",
    data: prjStatus,
  });
});

exports.getProjectList = catchAsync(async (req, res, next) => {
  let projects = await Project.find({});
  res.status(200).json({
    data: projects,
  });
});

exports.getProjectGhostList = catchAsync(async (req, res, next) => {
  let projects = await GhostProjects.find({});
  res.status(200).json({
    data: projects,
  });
});
