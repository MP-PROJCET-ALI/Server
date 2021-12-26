const statusmodel = require("../../db/models/status");

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
    statusmodel.find({ pending: false }).then((result) => {
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
  const { _id } = req.params;
  const { status1 } = req.body;
  try {
    statusmodel.findOne({ _id: _id }).then((item) => {
      if (item.user == req.token._id) {
        statusmodel
          .findOneAndUpdate(
            { _id: _id },
            {
              $set: {
                rejected: rejected,
                apprared: apprared,
                pending: pending,
                notative: notative,
                time: Date(),
              },
            },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          });
      } else if (req.token.role == "61a734cd947e8eba47efbc68") {
        statusmodel
          .findOneAndUpdate(
            { _id: _id },
            {
              $set: {
                rejected: rejected,
                apprared: apprared,
                pending: pending,
                notative: notative,
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
