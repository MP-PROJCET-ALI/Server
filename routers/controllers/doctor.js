const doctormodel = require("../../db/models/doctor");

const addmedicl = (req, res) => {
  const { pharmaceutical, patientscondition, img, desc, user } = req.body;
  try {
    const newmedicl = new doctormodel({
      pharmaceutical,
      patientscondition,
      img,
      desc,
      time: Date(),
      user,
    });
    newmedicl
      .save()
      .then((result) => {
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
  const { desc, pharmaceutical, patientscondition } = req.body;
  try {
    doctormodel.findOne({ _id: _id }).then((item) => {
      if (item.user == req.token._id) {
        doctormodel
          .findOneAndUpdate(
            { _id: _id },
            {
              $set: {
                desc: desc,
                pharmaceutical: pharmaceutical,
                patientscondition: patientscondition,
                time: Date(),
              },
            },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          });
      } else if (req.token.role == "61a734cd947e8eba47efbc68") {
        doctormodel
          .findOneAndUpdate(
            { _id: _id },
            {
              $set: {
                desc: desc,
                pharmaceutical: pharmaceutical,
                patientscondition: patientscondition,
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

const geAllmedicl = (req, res) => {
  try {
    doctormodel.find({ isDel: false }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getmedicl = (req, res) => {
  const { _id } = req.params;
  try {
    doctormodel.findOne({ _id: _id }).then((result) => {
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
  addmedicl,
  updatemedicl,
  geAllmedicl,
  getmedicl,
};
