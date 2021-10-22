const catchAsync = require("../utils/catchAsync");

exports.findQuery = async (Query, project_id, locale, query_text) => {
  const filter = {
    project_id,
    locale,
    query_text,
  };
  let query = await Query.findOne(filter);
  return query; // always return Promise
};

exports.findAnswer = async (Answer, grader, query_id) => {
  const filter = {
    grader,
    query_id,
  };
  let answer = await Answer.findOne(filter);
  return answer; // always return Promise
};
