const mongoose = require("mongoose");

const user = new mongoose.Schema({
  fullName: { type: String, required: true }, // user + doc + hospital + admin
  email: { type: String,  unique: true },  // user + doc + hospital + admin
  password: { type: String},  // user + doc + hospital + admin
  phone: { type: String, unique: true },  // user + doc + hospital + admin
  DoctorId: { type: String,  unique: true, },   //  doc
  patientId: { type: String ,  unique: true,},  // user 
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },  
  status1: { type: mongoose.Schema.Types.ObjectId, ref: "Status", default: "61c82191e027be8294db69c8"},  
  file: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medicalfile" }],  // user + doc + hospital
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  //  doc + hospital
  doctors:[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  // user + hospital 
  workAt:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },  //  doc 
  licenseNumber: { type: String, },  //  hospital 
  location: { type: String},  // user + doc + hospital 
  documents:[{ type: String}]  //  hospital


});

module.exports = mongoose.model("User", user);