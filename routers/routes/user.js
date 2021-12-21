const express = require("express");
const userRoute = express.Router();


const {
  resgister,
 
} = require("./../controllers/user");
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");



userRoute.post("/resgister", resgister);

module.exports = userRoute;
