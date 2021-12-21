const mongoose = require("mongoose");

const medicalfile = new mongoose.Schema(
  {
    patientscondition: { type: String, required: true },
    pharmaceutical: { type: String, required: true },
    raysimg: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   
  },
  timestamp(Date)
);

module.exports = mongoose.model("Medicalfile", medicalfile);
