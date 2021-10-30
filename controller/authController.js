const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
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

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.name, user.level);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.get("x-forwarded-proto") === "https", // https, #223 0330
  });

  // remove the password from the output
  user.password = undefined;

  res.status(statusCode).json({
    message: "jwt token is on the cookie",
    status: "success",
    token: token,
    data: {
      user: user,
    },
  });
};

// exports.signup = catchAsync(async (req, res, next) => {
//   const newUser = await User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     passwordConfirm: req.body.passwordConfirm,
//     passwordChangedAt: req.body.passwordChangedAt,
//     role: req.body.role,
//   });
//   const url = `${req.protocol}://${req.get("host")}/me`;
//   console.log(url);
//   await new Email(newUser, url).sendWelcome();
//   createSendToken(newUser, 201, req, res);
// });

exports.login = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;

  // 1) check if email and password exist
  if (!name || !password) {
    return next(new AppError("Please provide user and password!", 400));
  }

  // 2) check if user exists && password is correct
  const user = await User.findOne({ name: name }).select("+webPassword");

  if (!user || !user.correctPassword(password, user.webPassword)) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

// exports.logout = (req, res) => {
//   res.cookie("jwt", "loggedout", {
//     // dumming text
//     expires: new Date(Date.now() + 10 * 1000), // very short time to expire
//     httpOnly: true,
//   });
//   res.status(200).json({ status: "success" });
// };

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1) Getting token and check of its there
  // this is for Postman
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    // this is for browser
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // compare the token valid

  // 3) Check if user still exists
  const currentUser = await User.findOne({
    name: decoded.name,
    level: decoded.level,
  });
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // // 4) Check if user changed password after the token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError("User recently changed password! Please log in again", 401)
  //   );
  // }

  //GRANT ACCESS to PROTECTED ROUTE
  res.locals.user = currentUser; // what is that for? That is for pug usage # 193 1155
  next();
});

// exports.restrictTo = (...roles) => {
//   // cannot pass the parameter into middleware directly
//   return (req, res, next) => {
//     //roles ['admin', 'lead-guide']. role='user'
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError("You do not have permission to perform this action", 403)
//       );
//     }
//     next();
//   };
// };
