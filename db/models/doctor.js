const mongoose = require("mongoose");

const doctor = new mongoose.Schema({
  patientscondition: { type: String, required: true },
  pharmaceutical: { type: String, required: true },
  img: { type: String },
  desc: { type: String, require: true },
  time: { type: Date },
  isDel: { type: Boolean, default: false },

});

module.exports = mongoose.model("Doctor", doctor);
