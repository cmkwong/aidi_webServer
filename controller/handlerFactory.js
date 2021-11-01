const catchAsync = require("../utils/catchAsync");

exports.findOneQuery = async (QueryModel, project_id, locale, query_code) => {
  const filter = {
    project_id,
    locale,
    query_code,
  };

  let query = await QueryModel.findOne(filter);
  return query; // always return Promise
};

exports.findQueries = async (
  QueryModel,
  project_id,
  locale,
  query_code,
  query_text,
  max = 50
) => {
  const filter = {
    project_id,
    locale,
    query_code,
    query_text,
  };
  // delete the undefined fields
  Object.keys(filter).forEach((key) =>
    filter[key] === undefined ? delete filter[key] : {}
  );
  let query = await QueryModel.find(filter).limit(max);
  return query; // always return Promise
};

exports.findGraderAnswer = async (AnswerModel, query_id, grader) => {
  let filter = {
    grader,
    query_id,
  };
  let answer = await AnswerModel.findOne(filter); // return object
  return answer; // always return Promise
};

exports.findManyAnswerByOneQueryId = async (AnswerModel, query_id) => {
  let filter = {
    query_id,
  };
  let answers;
  answers = await AnswerModel.find(filter); // return [object]
  return answers; // always return Promise
};

exports.findOneAnswerByOneQueryId = async (AnswerModel, query_id) => {
  let filter = {
    query_id,
  };
  let answer;
  answer = await AnswerModel.findOne(filter); // return object
  return answer; // always return Promise
};

exports.findManyAnswerByManyQueryId = async (AnswerModel, query_ids) => {
  let filter_arr = query_ids.map((id) => {
    return { query_id: id };
  });
  let answers;
  answers = await AnswerModel.find({ $or: filter_arr }); // return [object]
  return answers; // always return Promise
};

exports.findUsers = async (UserModel, locale, role) => {
  // either locale or role
  let filter = {
    locale,
    role,
  };
  // delete the undefined fields
  Object.keys(filter).forEach((key) =>
    filter[key] === undefined ? delete filter[key] : {}
  );
  let user = await UserModel.find(filter);
  return user;
};
