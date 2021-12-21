const mongoose = require("mongoose");

const doctor = new mongoose.Schema(
  {
    patientscondition: { type: String, required: true },
    pharmaceutical: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  timestamp(Date)
);

module.exports = mongoose.model("doctor", doctor);
