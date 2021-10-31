const mongoose = require("mongoose");

// const statusSchema = mongoose.Schema({
//   name: String, // https://mongoosejs.com/docs/schematypes.html#arrays
//   time: Number, // timestamp, normally Date.now()
// });
const prjStatusSchema = mongoose.Schema(
  {
    project_id: {
      type: String,
      required: [true, "project id is required"],
    },
    locale: {
      type: String,
      required: [true, "locale is required"],
    },
    status: {
      type: Map,
      of: {
        time: Number,
        count: Number,
      },
    },
    _update: String,
  },
  { collection: "project_status" }
);

prjStatusSchema.pre("save", function (next) {
  const grader = this._update;

  let cur_count = this.status.get(grader)?.count;
  let new_count = cur_count ? cur_count + 1 : 1;
  this.status.set(grader, { time: Date.now(), count: new_count }); // https://mongoosejs.com/docs/schematypes.html#maps
  this._update = undefined;
  next();
});

const PrjStatus = mongoose.model("PrjStatus", prjStatusSchema);
module.exports = PrjStatus;
