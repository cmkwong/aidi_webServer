const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser"); // getting the cookie from request
const bodyParser = require("body-parser");

// require routes
const viewRouter = require("./routes/viewRoutes");
const projectRouter = require("./routes/projectRoutes");

const app = express();
app.enable("trust proxy"); // Heroku acts as a proxy, #223 0451

// app.set("view engine", "pug"); // set the pug for filling the template
app.set("views", path.join(__dirname, "views")); // C:\Users\Chris\projects\Udemy_Learning\200922_NodeJS-Express-MongoDB-Bootcamp-2020\4-natours

//--------- Middleware stack ---------//
// Access-Control-Allow-Origin *, #225
app.use(cors());
app.options("*", cors()); // #225

// 	Serve static files from a folder and not from a route.
app.use(express.static(path.join(__dirname, "public")));

// Set Security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" })); // getting the user data from a form so updateUserData() (in viewsController) can be used, #194 0930
app.use(cookieParser());

app.use(compression());

// ***************** ROUTES *****************//
app.use("/", viewRouter); // middleware: root
app.use("/api/v1/project", projectRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on this server`);
  err.status = "fail";
  err.statusCode = 404;

  next(err); // skip all other middleware except the error handle middleware
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
