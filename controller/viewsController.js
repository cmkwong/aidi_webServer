const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Project = require("../models/projectModel");
const tools = require("../utils/tools");

exports.viewLogin = catchAsync(async (req, res, next) => {
  res.status(200).set("Content-Security-Policy").render("login", {
    title: "Log into your account",
  });
});

exports.viewProjectStatus = catchAsync(async (req, res, next) => {
  const projects = await Project.find({});
  const project_datas = projects.map((prj) => {
    let project_data = {
      project_id: tools.getProjectId(prj.link),
      locale: prj.location,
      name: prj.name,
      link: prj.link,
    };
    return project_data;
  });
  let graders = [];
  JSON.parse(process.env.GRADERS).forEach((user) => {
    if (user.role === "grader" && user.locale === "hk") {
      let grader;
      grader = {
        name: user.name,
      };
      graders.push(grader);
    }
  });
  res.status(200).set("Content-Security-Policy").render("projectStatus", {
    title: "Project Status",
    project_datas: project_datas,
    graders: graders,
    user: res.locals.user,
  });
});
