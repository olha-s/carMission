const Feature = require("../models/Feature");

exports.addFeature = (req, res, next) => {
  const newFeature = new Feature(req.body);

  newFeature
    .save()
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.getFeatures = (req, res, next) => {
  Feature.find()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};
