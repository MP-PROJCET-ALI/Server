const mongoose = require("mongoose");

const user = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String,  unique: true },
  password: { type: String, require: true },
  phone: { type: String, unique: true },
  DoctorId: { type: String },
  patientId: { type: String },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  file: { type: mongoose.Schema.Types.ObjectId, ref: "Medicalfile" },
});

module.exports = mongoose.model("User", user);



