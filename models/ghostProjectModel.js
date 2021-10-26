const mongoose = require("mongoose");

const gprojectSchema = mongoose.Schema(
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
  { collection: "ghost_projects" }
);

const GhostProjects = mongoose.model("GhostProjects", gprojectSchema);
module.exports = GhostProjects;
