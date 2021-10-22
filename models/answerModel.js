const mongoose = require("mongoose");

const answerSchema = mongoose.Schema(
  {
    grader: {
      type: String,
      required: [true, "grader name is required"],
    }, // String instead of Number
    grader_ans: {
      type: String,
      required: [true, "answer is required"],
    },
    query_id: {
      type: mongoose.Schema.ObjectId,
      required: [true, "No query ID found"],
    },
    time: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "answers" }
);

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
