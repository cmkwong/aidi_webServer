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
    await query.save(); // if has validation error, it will occur and return to next(err)
  }
  res.locals.query = query; // for later maybe use this query._id
  next();
});

exports.updateAnswer = catchAsync(async (req, res, next) => {
  // if not existed, create new document and update
  let answer = await factory.findGraderAnswer(
    Answer,
    res.locals.query._id,
    req.body.grader
  );
  if (!answer) {
    answer = new Answer();
    answer.grader = req.body.grader;
    answer.grader_ans = req.body.grader_ans;
    answer.query_id = res.locals.query._id;
    answer.time = Date.now();
  } else {
    // if answer existed, modified the answer and update the date
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

exports.getAnswer = catchAsync(async (req, res, next) => {
  // find the query
  let query = await factory.findQuery(
    Query,
    req.query.project_id,
    req.query.locale,
    req.query.query_text
  );
  if (!query) {
    return next(new AppError("No such query found", 404));
  }

  // base on the query ID, find all of the answer
  let answer = await factory.findAnswer(Answer, query._id); // answer is [object], cannot found return []
  if (answer.length === 0) {
    return next(new AppError("No such answer found", 404));
  }
  // console.log(global.payment);

  // if successfully found the answers
  res.status(200).json({
    status: "answers found successfully",
    data: answer,
  });
});
