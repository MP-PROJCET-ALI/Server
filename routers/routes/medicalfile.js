const express = require("express");
const filemodelRouter = express.Router();
const authentication = require("./../middleware/authentication");
const {
  addfilemodel,
  updatefilemodel,
  geAllfilemodel,
  getfilemodel,
} = require("../controllers/medicalfile");

filemodelRouter.get("/filemodel/:_id", getfilemodel);
filemodelRouter.get("/allfilemodel", authentication, geAllfilemodel);
filemodelRouter.put("/updatefilemodel/:_id", authentication, updatefilemodel);
filemodelRouter.post("/newfilemodel", authentication, addfilemodel);

module.exports = filemodelRouter;
