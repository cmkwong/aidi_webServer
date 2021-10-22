const mongoose = require("mongoose");

const answerSchema = mongoose.Schema(
  {
    grader: String, // String instead of Number
    grader_ans: String,
    query_id: mongoose.Schema.ObjectId,
    time: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "answers" }
);

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
