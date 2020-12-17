const WorkStage = require("../models/WorkStage");
const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");

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

exports.updateWorkStage = (req, res, next) => {
  WorkStage.findOne({ _id: req.params.id })
    .then((stage) => {
      if (!stage) {
        return res.status(400).json({
          message: `Feature with _id "${req.params.id}" is not found.`,
        });
      } else {
        const stageData = _.cloneDeep(req.body);
        const updatedStage = queryCreator(stageData);

        WorkStage.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedStage },
          { new: true }
        )
          .then((stage) => res.json(stage))
          .catch((err) =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            })
          );
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.deleteWorkStage = (req, res, next) => {
  WorkStage.findOne({ _id: req.params.id }).then(async (stage) => {
    if (!stage) {
      return res.status(400).json({
        message: `Feature with id "${req.params.id}" is not found.`,
      });
    } else {
      const stageToDelete = await WorkStage.findOne({
        _id: req.params.id,
      });

      WorkStage.deleteOne({ _id: req.params.id })
        .then((deletedCount) =>
          res.status(200).json({
            message: `Feature with id "${stageToDelete._id}" is successfully deletes from DB.`,
            deletedFeatureInfo: stageToDelete,
          })
        )
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          })
        );
    }
  });
};
