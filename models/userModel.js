const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User require name"],
    },
    role: {
      type: String,
      enum: ["grader", "checker", "admin"],
      default: "user",
    },
    token: {
      type: String,
    },
    reliability: {
      type: Number,
      enum: [...Array(10).keys()], // 0 - 9
      default: 5,
    },
    level: {
      type: Number,
      enum: [...Array(4).keys()], // 0 - 3
      default: 0,
    },
    locale: {
      type: String,
      enum: ["hk", "jp"],
      default: "hk",
    },
  },
  { collection: "graders" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
