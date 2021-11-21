const mongoose = require("mongoose");

// const statusSchema = mongoose.Schema({
//   name: String, // https://mongoosejs.com/docs/schematypes.html#arrays
//   time: Number, // timestamp, normally Date.now()
// });
const prjListSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "project name is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    link: {
      type: String,
      required: [true, "link is required"],
    },
  },
  { collection: "projects" }
);

const PrjList = mongoose.model("PrjList", prjListSchema);
module.exports = PrjList;
