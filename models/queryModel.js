const mongoose = require("mongoose");

// const resultSchema = mongoose.Schema({
//   text: String,
//   category: String,
//   link: String,
// });

const querySchema = mongoose.Schema(
  {
    searchDateLocation: String,
    query_text: String,
    query_link: String,
    project_id: String,
    locale: String,
    results: Array,
  },
  { collection: "querys" }
);

const Query = mongoose.model("Query", querySchema);
module.exports = Query;

// assign value into nested Schema()
// https://mongoosejs.com/docs/subdocs.html
