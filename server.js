const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT REJECTION, SHUTTING DOWN ...");
  process.exit(1);
});

// setting env
dotenv.config({
  path: "./config.env",
});
const app = require("./app");

// setting mongoose
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
// that return 'promise' so we can use 'then'
mongoose
  .connect(DB, {
    useNewUrlParser: true, // some option to deal with some depreacation warnings:
    useCreateIndex: true, // https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065060?start=473#notes
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error))
  .then(() => console.log("DB connected successfully"));

// start the server
const port = process.env.PORT; // listen port 3000, random assigned in heroku
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
