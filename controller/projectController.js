const Project = require("../models/projectModel");
const GhostProjects = require("../models/ghostProjectModel");
const PrjStatus = require("../models/prjStatusModel");
const PrjList = require("../models/prjListModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.updateProjectStatus = catchAsync(async (req, res, next) => {
  const { project_id, locale, grader } = req.body;
  if (!project_id || !locale || !grader) {
    return next(
      new AppError(
        `project_id=${!!project_id}, locale=${!!req.query
          .locale}, grader=${!!grader}`
      )
    );
  }
  filter = {
    project_id: project_id,
    locale: locale,
  };

  // count the document to check if project status exist
  const count = await PrjStatus.countDocuments(filter);

  // if not existed, create new document and update
  let prjStatus;
  if (count === 0) {
    prjStatus = new PrjStatus({ status: {} }); // define the empty dictionary here https://mongoosejs.com/docs/schematypes.html#maps
    prjStatus.project_id = project_id;
    prjStatus.locale = locale;
    // otherwise, find the required document and update
  } else {
    prjStatus = await PrjStatus.findOne(filter);
  }

  // update the document
  prjStatus._update = grader;

  // update mongoDB
  await prjStatus.save();

  // send successful message
  res.status(200).json({
    status: "success",
    data: prjStatus,
  });
});

exports.getProjectStatus = catchAsync(async (req, res, next) => {
  const { project_id, locale } = req.query;
  if (!project_id || !locale) {
    return next(new AppError("Please submit locale and project id", 404));
  }
  const prjStatus = await PrjStatus.findOne({
    project_id: project_id,
    locale: locale,
  });
  if (!prjStatus) {
    return next(new AppError(`No ${project_id}(${locale}) found`, 404));
  }
  let prjStatus_data = [];
  const projStatusJSON = prjStatus.status.toJSON(); // transfer MAP into JSON Object
  for (const grader in projStatusJSON) {
    let graderInfo = {
      name: grader,
      mins: (Date.now() - projStatusJSON[grader]["time"]) / 1000 / 60,
      count: projStatusJSON[grader]["count"],
    };
    prjStatus_data.push(graderInfo);
  }
  res.status(200).json({
    prjStatus_data: prjStatus_data,
  });
});

exports.getProjectList = catchAsync(async (req, res, next) => {
  let projects = await Project.find({});
  res.status(200).json({
    data: projects,
  });
});

exports.updateProjectList = catchAsync(async (req, res, next) => {
  await PrjList.deleteMany({});
  await PrjList.insertMany(req.body.projects);
  res.status(200).json({
    status: "success",
  });
});

exports.getProjectGhostList = catchAsync(async (req, res, next) => {
  let projects = await GhostProjects.find({});
  res.status(200).json({
    data: projects,
  });
});
