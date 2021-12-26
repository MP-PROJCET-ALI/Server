const userModel = require("../../db/models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");
const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_RESET_KEY = process.env.SECRET_RESET_KEY;
// const SALT = process.env.SALT;
const CLIENT_URL = "http://localhost:3000";


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
const login = (req, res) => {
  const { fullName, email, password } = req.body;
  const SECRET_KEY = process.env.SECRET_KEY;
  if (!(email && password)) {
    res.status(200).json({ msg: "Kindly fill all inputs" });
  } else {
    userModel
      .findOne({ $or: [{ fullName }, { email }] })
      .then(async (result) => {
        if (result) {
          if (email === result.email || fullName === result.fullName) {
            const payload = {
              id: result._id,
              role: result.role,
            };
            const options = {
              expiresIn: "30m",
            };
            const token = jwt.sign(payload, SECRET_KEY, options);
            const unhashPassword = await bcrypt.compare(
              password,
              result.password
            );
            if (unhashPassword) {
              res.status(200).json({ result, token });
            } else {
              res.status(200).json("invalid fullName/email or password");
            }
          } else {
            res.status(200).json("invalid fullName/email or password");
          }
        } else {
          res.status(200).json("fullName or email does not exist");
        }
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  }
};

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
const resgister = (req, res) => {
  const { fullName, email, password, password2, phone, role } = req.body;
  let errors = [];

  if (!fullName || !email || !password || !password2 || !phone || !role) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 8) {
    errors.push({ msg: "Password must be at least 8 characters" });
  }

  if (errors.length > 0) {
    res.status(200).json({
      errors,
      fullName,
      email,
      password,
      password2,
    });
  } else {
    userModel.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email ID already registered" });
        res.status(200).json({
          errors,
          fullName,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new userModel({
          fullName,
          email,
          password,
          password2,
          role,
          phone,
          status1,
          DoctorId,


        })
        newUser.save().then((result)=>{
          res.status(200).json(result)
        }).catch((err)=>{
          console.log(err);
        })
        const oauth2Client = new OAuth2(
          "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
          "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
          "https://developers.google.com/oauthplayground" // Redirect URL
        );

        oauth2Client.setCredentials({
          refresh_token:
            "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
        });
        const accessToken = oauth2Client.getAccessToken();

        const token = jwt.sign(
          { fullName, email, password, phone, role },
          SECRET_KEY,
          {
            expiresIn: "30m",
          }
        );

        const output = `
                  <h2>Please click on below link to activate your account</h2>
                  <p>${CLIENT_URL}/activate/${token}</p>
                  <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
                  `;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "nodejsa@gmail.com",
            clientId:
              "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
            clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
            refreshToken:
              "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
            accessToken: accessToken,
          },
        });

        const mailOptions = {
          from: '"Auth Admin" <nodejsa@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Account Verification: NodeJS Auth ✔", // Subject line
          generateTextFromHTML: true,
          html: output, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            res.status(200).json({
              err: "Something went wrong on our end. Please register again.",
            });
          } else {
            console.log("Mail sent : %s", info.response);
            res.status(200).json({
              message:
                "Activation link sent to email ID. Please activate to log in.",
            });
          }
        });
      }
    });
  }
};
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
const activate = (req, res) => {
  const token = req.params.token;
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.json({ err: "Incorrect or expired link! Please register again." });
      } else {
        const { fullName, email, password, phone } = decodedToken;
        userModel.findOne({ email: email }).then((user) => {
          if (user) {
            res.json({ err: "Email ID already registered! Please log in." });
          } else {
            const newUser = new userModel({
              fullName,
              email,
              password,
              phone,
              role: "61c46c8e02f5af6c49d02a17",
            });

            bcrypt.hash(newUser.password, 10, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  res.json({ success: user });
                })
                .catch((err) => console.log(err));
            });
          }
        });
      }
    });
  } else {
    console.log("Account activation error!");
  }
};
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
const resetPassword = (req, res) => {
  const { password, password2 } = req.body;
  const id = req.params.id;

  if (!password || !password2) {
    res.json({ error: "Please enter all fields." });
  } else if (password.length < 8) {
    res.json({ error: "Password must be at least 8 characters." });
  } else if (password != password2) {
    res.json({ error: "Passwords do not match." });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        password = hash;

        userModel.findByIdAndUpdate(
          { _id: id },
          { password },
          function (err, result) {
            if (err) {
              res.json({ error: "Error resetting password!" });
            } else {
              res.json({ error: "Password reset successfully!" });
            }
          }
        );
      });
    });
  }
};

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

const forgotPassword = (req, res) => {
  const { email } = req.body;

  let errors = [];

  if (!email) {
    errors.push({ msg: "Please enter an email ID" });
  }

  if (errors.length > 0) {
    res.json({ errors });
  } else {
    userModel.findOne({ email: email }).then((user) => {
      if (!user) {
        errors.push({ msg: "User with Email ID does not exist!" });
        res.json({ errors });
      } else {
        const oauth2Client = new OAuth2(
          "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
          "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
          "https://developers.google.com/oauthplayground" // Redirect URL
        );

        oauth2Client.setCredentials({
          refresh_token:
            "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
        });
        const accessToken = oauth2Client.getAccessToken();

        const token = jwt.sign({ _id: user._id }, SECRET_RESET_KEY, {
          expiresIn: "30m",
        });
        const output = `
                <h2>Please click on below link to reset your account password</h2>
                <p>${CLIENT_URL}/forgot/${token}</p>
                <p><b>NOTE: </b> The activation link expires in 30 minutes.</p>
                `;

        userModel.updateOne({ resetLink: token }, (err, success) => {
          if (err) {
            errors.push({ msg: "Error resetting password!" });
            res.json({ errors });
          } else {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                type: "OAuth2",
                user: "nodejsa@gmail.com",
                clientId:
                  "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
                clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
                refreshToken:
                  "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
                accessToken: accessToken,
              },
            });

            const mailOptions = {
              from: '"Auth Admin" <nodejsa@gmail.com>', // sender address
              to: email, // list of receivers
              subject: "Account Password Reset: NodeJS Auth ✔", // Subject line
              html: output, // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                errors.push({
                  msg: "Something went wrong on our end. Please try again later.",
                });
                res.json({ errors });
              } else {
                console.log("Mail sent : %s", info.response);
                res.json({
                  success:
                    "Password reset link sent to email ID. Please follow the instructions.",
                });
              }
            });
          }
        });
      }
    });
  }
};
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
const gotoReset = (req, res) => {
  const { token } = req.params;

  if (token) {
    jwt.verify(token, SECRET_RESET_KEY, (err, decodedToken) => {
      if (err) {
        res.json({ error: "Incorrect or expired link! Please try again." });
      } else {
        const { _id } = decodedToken;
        userModel.findById(_id, (err, user) => {
          if (err) {
            res.json({
              error: "User with email ID does not exist! Please try again.",
            });
          } else {
            res.json({ success: _id });
          }
        });
      }
    });
  } else {
    console.log("Password reset error!");
  }
};



////////////////////////////////////////////
/////////////////profile///////////////////////////
////////////////////////////////////////////
const findUserByEmail = (req, res) => {
  const { email } = req.params;
  userModel
    .find({ email: `${email}` })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const editFullName = (req, res) => {
  const { email } = req.params;
  const { fullName } = req.body;
  userModel
    .findOneAndUpdate(
      { email: `${email}` },
      { $set: { fullName } },
      { new: true }
    )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
const deleteUser = (req, res) => {
  const { id } = req.params;

  userModel
    .findOneAndRemove({ _id: id }, { new: true })
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};



const updateemailpassword = (req, res) => {
  const { _id } = req.params;
  const { password, fullName, email,status1 } = req.body;
  try {
    userModel.findOne({ _id: _id }).then((item) => {
      if (item.user == req.token._id) {
        userModel
          .findOneAndUpdate(
            { _id: _id },
            {
              $set: {
                password: password,
                fullName: fullName,
                email: email,
                status1:status1,
                time: Date(),
              },
            },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          });
      } else if (req.token.role == "61c4660902f5af6c49d02a15") {
        userModel
          .findOneAndUpdate(
            { _id: _id },
            {
              $set: {
                password: password,
                fullName: fullName,
                email: email,
                status1:status1,
                time: Date(),
              },
            },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          });
      } else {
        res.status(403).send("forbbiden");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
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
};
