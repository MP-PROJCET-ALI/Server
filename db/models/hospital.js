const mongoose = require("mongoose");

const hospital = new mongoose.Schema({
  name: { type: String, required: true, unique: true  },
  rejon: { type: String, required: true, unique: true },
  licensenumber: { type: String, require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  workout: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
 
});

module.exports = mongoose.model("Hospital", hospital);
