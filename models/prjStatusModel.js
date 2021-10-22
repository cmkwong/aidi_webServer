const mongoose = require("mongoose");

// const statusSchema = mongoose.Schema({
//   name: String, // https://mongoosejs.com/docs/schematypes.html#arrays
//   time: Number, // timestamp, normally Date.now()
// });
const prjStatusSchema = mongoose.Schema(
  {
    project_id: {
      type: String,
      require: true,
    },
    locale: {
      type: String,
      require: true,
    },
    status: {
      type: Map,
      of: Number,
    },
  },
  { collection: "project_status" }
);

const PrjStatus = mongoose.model("PrjStatus", prjStatusSchema);
module.exports = PrjStatus;
