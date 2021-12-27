const mongoose = require("mongoose");


const medicalfile = new mongoose.Schema({
  medicalcondition: { type: String, },
  pharmaceutical: { type: String,  },
  desc: { type: String },
  img: [{ type: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  DoctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  time: { type: Date },
  isDel: { type: Boolean, default: false },
});
module.exports = mongoose.model("Medicalfile", medicalfile);