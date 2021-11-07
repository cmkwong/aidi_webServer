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
  console.log(req.body.grader);
  // if not existed, create new document and update
  let query = await factory.findOneQuery(
    // always return list
    Query,
    req.body.project_id,
    req.body.locale,
    req.body.query_code
  );
  if (!query) {
    query = new Query(); // define the empty dictionary here https://mongoosejs.com/docs/schematypes.html#maps
    query.searchDateLocation = req.body.searchDateLocation;
    query.query_text = req.body.query_text;
    query.query_link = req.body.query_link;
    query.project_id = req.body.project_id;
    query.locale = req.body.locale;
    query.query_code = req.body.query_code;
    query.results = req.body.results;
    await query.save(); // if has validation error, it will occur and return to next(err)
  }
  res.locals.query = query; // for later maybe use this query._id
  next();
});

exports.updateAnswer = catchAsync(async (req, res, next) => {
  const query_id = res.locals.query._id;
  const grader = req.body.grader.replace(/ /g, "");
  // if not existed, create new document and update
  let answer = await factory.findGraderAnswer(Answer, query_id, grader);
  if (!answer) {
    answer = new Answer();
    answer.grader = grader;
    answer.grader_ans = req.body.grader_ans;
    answer.query_id = query_id;
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
  if (req.query.query_id) {
    res.locals.query_id = req.query.query_id;
    return next();
  }
  // expected only one query is found based on this three conditions
  const { project_id, locale, query_code } = req.query;
  if (!project_id || !locale || !query_code) {
    return next(
      new AppError(
        `project_id=${!!project_id}, locale=${!!req.query
          .locale}, query_code=${!!query_code}`
      )
    );
  }
  // find the query
  let query = await factory.findOneQuery(Query, project_id, locale, query_code);
  if (!query) {
    return next(new AppError("No such query found", 404));
  }
  res.locals.query_id = query._id;
  next();
});

exports.getManyAnswerByOneQueryId = catchAsync(async (req, res, next) => {
  // base on the query ID, find all of the answer
  let { query_id } = res.locals;
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
  let { query_id } = res.locals;
  let answer = await factory.findOneAnswerByOneQueryId(
    Answer,
    query_id,
    req.query.many
  ); // answer is object
  if (!answer) {
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
    req.query.query_code,
    req.query.query_text,
    req.query.query_id,
    Number(req.query.max ? req.query.max : 50) // default maximum head 50 documents
  );
  if (queries.length === 0) {
    return next(new AppError("No such query found", 404));
  }
  res.status(200).json({
    status: "queries found successfully",
    doc_count: queries.length,
    data: queries,
  });
});
