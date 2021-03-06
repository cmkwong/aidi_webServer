const mongoose = require("mongoose");

const querySchema = mongoose.Schema(
  {
    searchDateLocation: String,
    query_text: String,
    query_link: {
      type: String,
      required: [true, "query link is required"],
    },
    project_id: {
      type: String,
      required: [true, "project id link is required"],
    },
    locale: {
      type: String,
      required: [true, "project locale is required"],
    },
    query_code: {
      type: String,
      required: [true, "query code is required"],
    },
    results: Array,
  },
  { collection: "querys" }
);

const Query = mongoose.model("Query", querySchema);
module.exports = Query;

// assign value into nested Schema()
// https://mongoosejs.com/docs/subdocs.html
