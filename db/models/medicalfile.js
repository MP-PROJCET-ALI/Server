const mongoose = require("mongoose");

const medicalfile = new mongoose.Schema({
  medicalcondition: { type: String, required: true },
  pharmaceutical: { type: String, required: true },
  desc: { type: String },
  raysimg: [{ type: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  time: { type: Date },
  isDel: { type: Boolean, default: false },
});

module.exports = mongoose.model("Medicalfile", medicalfile);
