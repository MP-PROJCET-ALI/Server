const mongoose = require("mongoose");

const medicalfile = new mongoose.Schema({
  medicalcondition: { type: String, required: true },
  FileNo: { type: String, required: true },
  raysimg: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
});

module.exports = mongoose.model("Medicalfile", medicalfile);
