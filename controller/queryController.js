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
  let queries = await factory.findQueries(
    // always return list
    Query,
    req.body.project_id,
    req.body.locale,
    req.body.query_text
  );
  if (queries.length === 0) {
    queries = new Query(); // define the empty dictionary here https://mongoosejs.com/docs/schematypes.html#maps
    queries.searchDateLocation = req.body.searchDateLocation;
    queries.query_text = req.body.query_text;
    queries.query_link = req.body.query_link;
    queries.project_id = req.body.project_id;
    queries.locale = req.body.locale;
    queries.results = req.body.results;
    await queries.save(); // if has validation error, it will occur and return to next(err)
  }
  res.locals.query = queries[0]; // for later maybe use this query._id
  next();
});

exports.updateAnswer = catchAsync(async (req, res, next) => {
  // if not existed, create new document and update
  let answer = await factory.findGraderAnswer(
    Answer,
    res.locals.query._id,
    req.body.grader
  );
  console.log(req.body.grader);
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
exports.getOneQueryId = catchAsync(async (req, res, next) => {
  // expected only one query is found based on this three conditions
  if (!req.query.project_id || !req.query.locale || !req.query.query_text) {
    return next(new AppError("project_id/locale/query_text missed"));
  }
  // find the query
  let queries = await factory.findQueries(
    Query,
    req.query.project_id,
    req.query.locale,
    req.query.query_text
  );
  if (queries.length === 0) {
    return next(new AppError("No such query found", 404));
  }
  res.locals.query = queries[0];
  next();
});

exports.getManyAnswerByOneQueryId = catchAsync(async (req, res, next) => {
  // base on the query ID, find all of the answer
  let query_id = res.locals.query._id;
  let answers = await factory.findManyAnswerByOneQueryId(
    Answer,
    query_id,
    req.query.many
  ); // answer is [object], cannot found return []
  if (answers.length === 0) {
    return next(new AppError("No such answer found", 404));
  }
  // if successfully found the answers
  res.status(200).json({
    status: "answers found successfully",
    data: answers,
  });
});

exports.getOneAnswerByOneQueryId = catchAsync(async (req, res, next) => {
  // base on the query ID, find all of the answer
  let query_id = res.locals.query._id;
  let answer = await factory.findOneAnswerByOneQueryId(
    Answer,
    query_id,
    req.query.many
  ); // answer is object
  if (answer.length === 0) {
    return next(new AppError("No such answer found", 404));
  }
  // if successfully found the answers
  res.status(200).json({
    status: "answer found successfully",
    data: answer,
  });
});

exports.getManyAnswerByManyQueryId = catchAsync(async (req, res, next) => {
  let answers = await factory.findManyAnswerByManyQueryId(
    Answer,
    req.body.query_ids
  );
  // if successfully found the answers
  res.status(200).json({
    status: "answers found successfully",
    data: answers,
  });
});

exports.getQuries = catchAsync(async (req, res, next) => {
  let queries = await factory.findQueries(
    Query,
    req.query.project_id,
    req.query.locale,
    req.query.query_text,
    Number(req.query.max ? req.query.max : 50) // default maximum head 50 documents
  );
  if (queries.length === 0) {
    return next(new AppError("No such query found", 404));
  }
  res.status(200).json({
    status: "queries found successfully",
    data: queries,
  });
});
