const medicalfilemodel = require("../../db/models/medicalfile");

const addfilemodel = (req, res) => {
    const { pharmaceutical,patientscondition,img, desc ,user} = req.body;
    try {
      const newmedicalfilemodel = new medicalfilemodel({
        pharmaceutical,
        patientscondition,
        img,
        desc,
        time: Date(),
        user,
      });
      newmedicalfilemodel
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


 

  const updatefilemodel = (req, res) => {
    const { _id } = req.params;
    const { raysimg,patientscondition,pharmaceutical } = req.body;
    try {
        medicalfilemodel.findOne({ _id: _id }).then((item) => {
        if (item.user == req.token._id) {
            medicalfilemodel
            .findOneAndUpdate(
              { _id: _id },
              { $set: { raysimg: raysimg,patientscondition: patientscondition,pharmaceutical: pharmaceutical, time: Date() } },
              { new: true }
            )
            .then((result) => {
              res.status(200).json(result);
            });
        } else if (req.token.role == "61a734cd947e8eba47efbc68") {
            medicalfilemodel
            .findOneAndUpdate(
              { _id: _id },
              { $set: { desc: desc,pharmaceutical: pharmaceutical,patientscondition: patientscondition, time: Date()  } },
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


  const geAllfilemodel = (req, res) => {
    try {
        medicalfilemodel.find({ isDel: false }).then((result) => {
        res.status(200).json(result);
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };
  
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
  