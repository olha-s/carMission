const ServicePackage = require("../models/ServicePackage");

exports.addServicePackage = (req, res, next) => {

  const newServicePackage = new ServicePackage(req.body);

  newServicePackage
    .save()
    .then(data => res.json(data))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}"`
      })
    );
};

exports.getServicePackages = (req, res, next) => {
  ServicePackage.find()
    .then(data => res.send(data))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};