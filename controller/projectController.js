const Project = require("../models/projectModel");
const PrjStatus = require("../models/prjStatusModel");
const Query = require("../models/queryModel");
const Answer = require("../models/answerModel");
const catchAsync = require("../utils/catchAsync");

exports.updateProjectStatus = async (req, res, next) => {
  try {
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
  } catch {
    (err) => {
      res.status(err.statusCode).json({
        status: err.status,
        error: err,
      });
    };
  }
  next();
};

exports.updateQuery = async (req, res, next) => {
  try {
    const filter = {
      project_id: req.body.project_id,
      locale: req.body.locale,
      query_text: req.body.query_text,
    };
    // count the document based on fitler
    const count = await Query.countDocuments(filter);

    // if not existed, create new document and update
    let query;
    if (count === 0) {
      query = new Query(); // define the empty dictionary here https://mongoosejs.com/docs/schematypes.html#maps
      query.searchDateLocation = req.body.searchDateLocation;
      query.query_text = req.body.query_text;
      query.query_link = req.body.query_link;
      query.project_id = req.body.project_id;
      query.locale = req.body.locale;
      query.results = req.body.results;
      await query.save();
      // otherwise, find the required document and update
    } else {
      // console.log("1---------------------------------\n", res);
      query = await Query.findOne(filter);
    }
    // query.id return String; query._id return ObjectId
    // need to await as it return promise
    res.locals.query_id = await query._id;
  } catch {
    (err) => {
      res.status(err.statusCode).json({
        status: err.status,
        error: err,
      });
    };
  }
  next();
};

exports.updateAnswer = async (req, res, next) => {
  try {
    const filter = {
      grader: req.body.grader,
      query_id: res.locals.query_id,
    };
    console.log(filter);
    // count the document based on fitler
    const count = await Answer.countDocuments(filter);

    // if not existed, create new document and update
    let answer;
    if (count === 0) {
      answer = new Answer();
      answer.grader = req.body.grader;
      answer.grader_ans = req.body.grader_ans;
      answer.query_id = res.locals.query_id;
      answer.time = Date.now();
      // otherwise, find the required document and update
    } else {
      answer = await Answer.findOne(filter);
      answer.grader_ans = req.body.grader_ans;
      answer.time = Date.now();
    }
    await answer.save();

    // send successful message
    res.status(200).json({
      status: "answer updated successfully",
      data: answer,
    });
  } catch {
    (err) => {
      res.status(err.statusCode).json({
        status: err.status,
        error: err,
      });
    };
  }
  next();
};

exports.getProjectList = async (req, res, next) => {
  let projects = await Project.find({});
  res.status(200).json({
    status: "get project list successfully",
    data: projects,
  });
  next();
};
