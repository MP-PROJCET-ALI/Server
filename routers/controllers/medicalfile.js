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

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
const updatefilemodel = (req, res) => {
  const { _id } = req.params;
  const { DoctorId } = req.body;
  try {
        medicalfilemodel
          .findOneAndUpdate(
            { _id: DoctorId },
            {
              $set: {
                isDel: true,
              },
            },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          });
  } catch (error) {
    res.status(400).json(error);
  }
};

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
  const { _id } = req.params;
  try {
    medicalfilemodel.findOne({ _id: _id }).then((result) => {
      if (result.isDel == false) {
        res.status(200).json(result);
      } else {
        res.status(404).send("medicl deleted");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  addfilemodel,
  updatefilemodel,
  geAllfilemodel,
  getfilemodel,
};
