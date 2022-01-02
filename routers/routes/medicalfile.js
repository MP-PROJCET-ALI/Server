const express = require("express");
const filemodelRouter = express.Router();
const authentication = require("./../middleware/authentication");
const {
  addfilemodel,
  updatemedicl,
  geAllfilemodel,
  getfilemodel,
  softDel,
  // getAliDoctorsInHospetal,
} = require("../controllers/medicalfile");
// الملفات الطبية 
filemodelRouter.get("/filemodel/:id", getfilemodel);
// filemodelRouter.get("/getAliDoctors/:id", getAliDoctorsInHospetal);
filemodelRouter.get("/allfilemodel", geAllfilemodel);
// التعديل والحذف
filemodelRouter.put("/updatefilemodel/:_id", updatemedicl);
filemodelRouter.put("/softDelete/:_id", softDel);

filemodelRouter.post("/newfilemodel", addfilemodel);

module.exports = filemodelRouter;
