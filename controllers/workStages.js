const WorkStage = require("../models/WorkStage");

exports.addWorkStage = (req, res, next) => {
  const newWorkStages = new WorkStage(req.body);

  newWorkStages
    .save()
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.getWorkStages = (req, res, next) => {
  WorkStage.find()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.deleteWorkStages = (req, res, next) => {
  WorkStage.deleteMany({}).then(() => {
    res
      .status(200)
      .json({
        message: "you just delete all data from collection",
      })
      .catch((err) => {
        res.status(400).json({
          message: `Error happened on server: "${err}" `,
        });
      });
  });
};
