const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: String, // String instead of Number
    location: String,
    link: String,
  },
  { collection: "projects" }
);

const Projects = mongoose.model("Projects", projectSchema);
module.exports = Projects;
