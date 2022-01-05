const express = require("express");
const statusRouter = express.Router();
const authentication = require("./../middleware/authentication");
const {
  addstatus,
  updatestatus,
  geAllstatuspending,
  geAllstatus,
  getstatus,
} = require("../controllers/status");

statusRouter.get("/status/:_id", getstatus);
statusRouter.get("/allstatuspending", geAllstatuspending);
statusRouter.get("/allstatus", authentication, geAllstatus);
statusRouter.put("/updatestatus", updatestatus);
statusRouter.post("/status/create", authentication, addstatus);

module.exports = statusRouter;
