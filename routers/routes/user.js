const express = require("express");
const userRoute = express.Router();


const {
  resgister,
  activate,
  login,
  gotoReset,
  forgotPassword,
  resetPassword,
  findUserByEmail, 
  editFullName,
  deleteUser,
  updateemailpassword,
} = require("./../controllers/user");
const authentication = require("./../middleware/authentication");



userRoute.post("/resgister", resgister);
userRoute.get('/activate/:token', activate);
userRoute.post("/login", login);
userRoute.post('/forgott', forgotPassword);
userRoute.get('/forgot/:token', gotoReset);
userRoute.post('/reset/:id', resetPassword);
// profiel
userRoute.get("/email/:email", findUserByEmail);
userRoute.put("/edit/:email", editFullName);
userRoute.delete("/delete/:id", deleteUser);
userRoute.put("/updateemailpassword/:_id", authentication, updateemailpassword);
module.exports = userRoute;

