const mongoose = require("mongoose");

const user = new mongoose.Schema({
  Fallname: { type: String, required: true },
  email: { type: String,  unique: true },
  password: { type: String, require: true },
  phone: { type: String, required: true, unique: true },
  DoctorId: { type: String, required: true, unique: true },
  patientId: { type: String, required: true, unique: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  file: { type: mongoose.Schema.Types.ObjectId, ref: "Medicalfile" },
});

module.exports = mongoose.model("User", user);
