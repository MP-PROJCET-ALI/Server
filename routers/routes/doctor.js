const express = require("express");
const mediclRouter = express.Router();
const authentication = require("./../middleware/authentication");
const {
  addmedicl,
  updatemedicl,
  geAllmedicl,
  getmedicl,
} = require("../controllers/doctor");

mediclRouter.get("/medicl/:_id", getmedicl);
mediclRouter.get("/allmedicl", authentication, geAllmedicl);
mediclRouter.put("/updatemedicl/:_id", authentication, updatemedicl);
mediclRouter.post("/newmedicl", authentication, addmedicl);

module.exports = mediclRouter;
//
