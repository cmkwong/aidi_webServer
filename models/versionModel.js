const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema(
  {
    checker: {
      type: String,
      required: [true, "Need check version"],
    },
    clients: {
      type: String,
      required: [true, "Need clients version"],
    },
  },
  { collection: "versions_control" }
);

const Version = mongoose.model("Version", versionSchema);

module.exports = Version;
