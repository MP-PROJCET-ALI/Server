const statusmodel = require("../../db/models/status");
const userModel = require("../../db/models/user");

///////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

const addstatus = (req, res) => {
  const { pending, apprared, rejected } = req.body;
  try {
    const newstatus = new statusmodel({
      pending,
      apprared,
      rejected,
      notative,
      time: Date(),
    });
    newstatus
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
/////////////////////////////////////////////////////
////////////////////////////////////////////////////
///////////////////////////////////////////////////
const geAllstatuspending = (req, res) => {
  try {
    userModel.find({ status1: '61c8217fe027be8294db69c6' }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
////////////////////////////////////////////////////
const geAllstatus = (req, res) => {
  try {
    statusmodel.find({ pending: true }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
//////////////////////////////////////////////////
/////////////////////////////////////////////////
////////////////////////////////////////////////
const getstatus = (req, res) => {
  const { _id } = req.params;
  try {
    statusmodel.findOne({ _id: _id }).then((result) => {
      if (result.pending == false) {
        res.status(200).json(result);
      } else {
        res.status(404).send("medicl deleted");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
const updatestatus = (req, res) => {
  const { _id, status } = req.body;
  try {
    userModel.findOneAndUpdate({ _id },{status1:status}).then((result) => {
      res.status(201).json(result);
    })
  } catch (error) {
    res.status(400).json(error);
  }
};
/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
module.exports = {
  addstatus,
  geAllstatuspending,
  updatestatus,
  geAllstatus,
  getstatus,
};
