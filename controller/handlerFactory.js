const catchAsync = require("../utils/catchAsync");

exports.findQuery = async (QueryModel, project_id, locale, query_text) => {
  const filter = {
    project_id,
    locale,
    query_text,
  };
  let query = await QueryModel.findOne(filter);
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

exports.findAnswer = async (AnswerModel, query_id) => {
  let filter = {
    query_id,
  };
  let answer = await AnswerModel.find(filter); // return [object]
  return answer; // always return Promise
};

exports.findUsers = async (UserModel, locale, role) => {
  // either locale or role
  let filter = {
    locale,
    role,
  };
  Object.keys(filter).forEach((key) =>
    filter[key] === undefined ? delete filter[key] : {}
  );
  let user = await UserModel.find(filter);
  return user;
};
