const mongoose = require("mongoose");

const satus = new mongoose.Schema({
  pending: { type: String, required: true },
  apprared: { type: String, required: true },
  rejected: { type: String, require: true },
  notative: { type: String, require: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

module.exports = mongoose.model("Satus", satus);
