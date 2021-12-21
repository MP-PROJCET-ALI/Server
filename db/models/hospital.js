const mongoose = require("mongoose");

const hospital = new mongoose.Schema({
  name: { type: String, required: true, unique: true  },
  rejon: { type: String, required: true, unique: true },
  licensenumber: { type: String, require: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
 
});

module.exports = mongoose.model("hospital", hospital);
