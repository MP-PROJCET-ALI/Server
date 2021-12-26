const mongoose = require("mongoose");

const status = new mongoose.Schema({
  status1: { type: String, required: true },
  
});

module.exports = mongoose.model("Status", status);
