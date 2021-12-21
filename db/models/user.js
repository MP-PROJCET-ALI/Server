const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  phone: { type: String, required: true, unique: true },
  role:{ type: String, default: "user" },
});

module.exports = mongoose.model("User", user);
