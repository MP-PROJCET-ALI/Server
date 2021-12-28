const express = require("express");
const filemodelRouter = express.Router();
const authentication = require("./../middleware/authentication");
const {
  addfilemodel,
  // updatefilemodel,
  geAllfilemodel,
  getfilemodel,
} = require("../controllers/medicalfile");

filemodelRouter.get("/filemodel/:_id", getfilemodel);
filemodelRouter.get("/allfilemodel", authentication, geAllfilemodel);
// filemodelRouter.put("/updatefilemodel/:_id", updatefilemodel);
filemodelRouter.post("/newfilemodel", addfilemodel);

module.exports = filemodelRouter;
