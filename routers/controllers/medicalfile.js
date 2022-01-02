const medicalfilemodel = require("../../db/models/medicalfile");
const userModel = require("../../db/models/user");

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
const addfilemodel = (req, res) => {
  const { pharmaceutical, patientscondition, img, desc, user, DoctorId } =
    req.body;
  try {
    const newmedicalfilemodel = new medicalfilemodel({
      pharmaceutical,
      patientscondition,
      img,
      desc,
      time: Date(),
      user,
      DoctorId,
    });
    newmedicalfilemodel
      .save()
      .then((result) => {
        userModel
          .findOneAndUpdate(
            { _id: result.user },
            {
              $push: {
                file: result._id,
              },
            },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          });
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(200).send(err);
      });
  } catch (error) {
    res.status(200).send(error);
  }
};

const updatemedicl = (req, res) => {
  const { _id } = req.params;
  const { pharmaceutical, patientscondition, img, desc, } = req.body;
  
  try {
    medicalfilemodel.findOne({ _id: _id }).then((item) => {
      console.log(item);
      if (item) {
        medicalfilemodel
          .findOneAndUpdate(
            { _id: _id },
            { $set: { desc: desc,pharmaceutical: pharmaceutical,patientscondition: patientscondition,img: img, time: Date()} },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          });
      } else if (req.token) {
        medicalfilemodel
          .findOneAndUpdate(
            { _id: id },
            { $set: { desc: desc,pharmaceutical: pharmaceutical,patientscondition: patientscondition,img: img, time: Date() } },
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
const softDel = (req, res) => {
  const { _id } = req.params;
  try {
    medicalfilemodel.findOne({ _id: _id }).then((item) => {
      
      if (item) {
        medicalfilemodel.findById({ _id: _id }).then((item) => {
          if (item.isDel == false) {
            medicalfilemodel
              .findByIdAndUpdate(
                { _id: _id },
                { $set: { isDel: true } },
                { new: true }
              )
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          } else {
            medicalfilemodel
              .findByIdAndUpdate(
                { _id: _id },
                { $set: { isDel: false } },
                { new: true }
              )
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          }
        });
      } else if (req.token.role == "61a734cd947e8eba47efbc68") {
        medicalfilemodel.findById({ _id: _id }).then((item) => {
          if (item.isDel == false) {
            medicalfilemodel
              .findByIdAndUpdate(
                { _id: _id },
                { $set: { isDel: true } },
                { new: true }
              )
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          } else {
            medicalfilemodel
              .findByIdAndUpdate(
                { _id: _id },
                { $set: { isDel: false } },
                { new: true }
              )
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          }
        });
      } else {
        res.status(403).send("Forbidden");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
// const updatefilemodel = (req, res) => {
//   const { _id } = req.params;
//   const { DoctorId } = req.body;
//   try {
//         medicalfilemodel
//           .findOneAndUpdate(
//             { _id: DoctorId },
//             {
//               $set: {
//                 isDel: true,
//               },
//             },
//             { new: true }
//           )
//           .then((result) => {
//             res.status(200).json(result);
//           });
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
const geAllfilemodel = (req, res) => {
  try {
    medicalfilemodel.find({ isDel: false }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
const getfilemodel = (req, res) => {
  const { id } = req.params;
  try {
    medicalfilemodel.find({ user: id, isDel:false }).populate("user").populate({path : 'DoctorId', populate : {path: 'workAt'}})
  

    .then((result) => {
     
        res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  addfilemodel,
  updatemedicl,
  geAllfilemodel,
  getfilemodel,
  softDel,
  // getAliDoctorsInHospetal,
};
