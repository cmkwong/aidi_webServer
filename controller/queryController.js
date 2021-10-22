const Query = require("../models/queryModel");
const Answer = require("../models/answerModel");
const factory = require("./handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// check if query with answer that input manually or automatically
exports.answerInsertAllowed = (req, res, next) => {
  if (req.query.insertAns === "true") {
    next();
  } else {
    next(new AppError("No allowed to update answer", 404));
  }
};
exports.findQuery = catchAsync(async (req, res, next) => {
  const filter = {
    project_id: req.body.project_id,
    locale: req.body.locale,
    query_text: req.body.query_text,
  };
  // count the document based on fitler
  // res.locals.count = await Query.countDocuments(filter);

  // find the query
  res.locals.query = await Query.findOne(filter);
  // console.log(res.locals.query._id);
  next();
});

exports.updateQuery = catchAsync(async (req, res, next) => {
  // if not existed, create new document and update
  let query = await factory.findQuery(
    Query,
    req.body.project_id,
    req.body.locale,
    req.body.query_text
  );
  if (!query) {
    query = new Query(); // define the empty dictionary here https://mongoosejs.com/docs/schematypes.html#maps
    query.searchDateLocation = req.body.searchDateLocation;
    query.query_text = req.body.query_text;
    query.query_link = req.body.query_link;
    query.project_id = req.body.project_id;
    query.locale = req.body.locale;
    query.results = req.body.results;
    await query.save();
    // otherwise, find the required document and update
  }
  res.locals.query = query;
  // query.id return String; query._id return ObjectId
  // need to await as it return promise
  // res.locals.query_id = await query._id;
  next();
});

exports.findAnswer = catchAsync(async (req, res, next) => {
  const filter = {
    grader: req.body.grader,
    query_id: res.locals.query._id,
  };
  console.log(filter);
  // count the document based on fitler
  // const count = await Answer.countDocuments(filter);

  // find the answer
  res.locals.answer = await Answer.findOne(filter); // Type is Schema object that can be used to updated
  next();
});

exports.updateAnswer = catchAsync(async (req, res, next) => {
  // if not existed, create new document and update
  let answer = await factory.findAnswer(
    Answer,
    req.body.grader,
    res.locals.query._id
  );
  if (!answer) {
    answer = new Answer();
    answer.grader = req.body.grader;
    answer.grader_ans = req.body.grader_ans;
    answer.query_id = res.locals.query._id;
    answer.time = Date.now();
    // otherwise, find the required document and update
  } else {
    // answer = await Answer.findOne(filter);
    // answer.grader_ans = req.body.grader_ans;
    // answer.time = Date.now();

    answer.grader_ans = req.body.grader_ans;
    answer.time = Date.now();
  }
  await answer.save();

  // send successful message
  res.status(200).json({
    status: "answer updated successfully",
    data: answer,
  });
});

exports.getAnswer = catchAsync(async (req, res, next) => {});
