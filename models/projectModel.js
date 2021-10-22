const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "project name is required"],
    }, // String instead of Number
    location: {
      type: String,
      required: [true, "project locale is required"],
    },
    link: {
      type: String,
      required: [true, "project link is required"],
    },
  },
  { collection: "projects" }
);

const Projects = mongoose.model("Projects", projectSchema);
module.exports = Projects;
