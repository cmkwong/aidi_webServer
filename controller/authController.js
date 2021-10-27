const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const signToken = (name, level) => {
  return jwt.sign(
    {
      name: name, // playload
      level: Number(level),
    },
    // private key
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN, // expired_in
    }
  );
};

exports.getToken = (req, res, next) => {
  const token = signToken(req.body.grader, req.body.level);
  res.status(200).json({
    status: "success",
    token: token,
  });
};
