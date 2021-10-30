const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    grader_id: {
      type: Number,
      required: [true, "User require id"],
    },
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
    webPassword: {
      type: String,
      select: false,
    },
  },
  { collection: "graders" }
);

// instance method
userSchema.methods.correctPassword = function (
  candidatePassword,
  userPassword
) {
  return candidatePassword === userPassword; // no bcript here
};

const User = mongoose.model("User", userSchema);

module.exports = User;
