const express = require("express");

const roleRouter = express.Router();

const { newrolr, getrole } = require("../controllers/role");
// تصريح لليوزر
const authentication = require("./../middleware/authentication");
//يعطي صلاحيات للادمن 
const authorization = require("./../middleware/authorization");
// انشاء صلاحيات جديدة
roleRouter.post("/role", newrolr);
// اظهار جيمع الصلاحيات
roleRouter.get("/read", getrole);

module.exports = roleRouter;
