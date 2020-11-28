const Loader = require("../models/Loader");
const _ = require("lodash");


exports.addLoaderData = (req, res, next) => {

    const newLoader = new Loader(req.body);

    newLoader
        .save()
        .then(data => res.json(data))
        .catch(err =>
            res.status(400).json({
            message: `Error happened on server: "${err}" `
        })
        );

};

exports.getLoaderData = (req, res, next) => {
    Loader.find()
        .then(data => res.send(data))
        .catch(err =>
            res.status(400).json({
            message: `Error happened on server: "${err}" `
        })
    );
};


exports.deleteAllLoaderData = (req, res, next) => {
    Loader.deleteMany({}).then(() => {
      res
        .status(200)
        .json({
          message: "you've just deleted all data from collection",
        })
        .catch((err) => {
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          });
        });
    });
  };