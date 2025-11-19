const mongoose = require("mongoose");

const ExcelSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  state: String,
  city: String,
});

module.exports = mongoose.model("ExcelBatch", ExcelSchema);
